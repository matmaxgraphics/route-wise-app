import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateRouteWithStepsInput,
  CreateRouteWithStepsResult,
  RouteToVerify,
  RouteSearchResult,
  UserProfile,
  LeaderboardEntry,
  SubmitRouteVerificationInput,
} from "@/lib/types";

type DatabaseId = string;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const parseFareRange = (fare: string) => {
  const cleaned = fare.replace(/[^0-9\-\u2013\u2014]/g, "").trim();
  const [minValue, maxValue] = cleaned
    .split(/[-\u2013\u2014]/)
    .map((part) => parseInt(part, 10));
  const min = Number.isFinite(minValue) ? minValue : 0;
  const max = Number.isFinite(maxValue) ? maxValue : min;

  return {
    min,
    max,
  };
};

const parseDurationMinutes = (duration: string) => {
  const match = duration.match(/(\d+)\s*(min|mins|minute|minutes)/i);
  if (!match) {
    const numeric = parseInt(duration.replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(numeric) ? numeric : 0;
  }

  return parseInt(match[1], 10);
};

const guessTransportType = (instruction: string) => {
  const value = instruction.toLowerCase();
  if (/walk|foot|stroll|hike/.test(value)) return "walk";
  if (/taxi|cab|ride|uber|bolt|grab/.test(value)) return "cab";
  if (/bus|danfo|korope|transit|coach/.test(value)) return "bus";
  if (/bike|bicycle|okada|tricycle|keke/.test(value)) return "motorbike";
  return "other";
};

async function getLocationId(
  supabase: SupabaseClient,
  name: string,
  city = "Ibadan",
): Promise<{ id?: DatabaseId; error?: PostgrestError }> {
  const slug = slugify(name);
  const { data: existingLocation, error: fetchError } = await supabase
    .from("locations")
    .select("id")
    .eq("slug", slug)
    .eq("city", city)
    .maybeSingle();

  if (fetchError) {
    return { error: fetchError };
  }

  if (existingLocation?.id) {
    return { id: existingLocation.id };
  }

  const { data: insertedLocation, error: insertError } = await supabase
    .from("locations")
    .insert([
      {
        name,
        slug,
        city,
        latitude: null,
        longitude: null,
      },
    ])
    .select("id")
    .maybeSingle();

  if (insertError) {
    return { error: insertError };
  }

  return { id: insertedLocation?.id };
}

export async function createRouteWithSteps(
  supabase: SupabaseClient,
  input: CreateRouteWithStepsInput,
): Promise<CreateRouteWithStepsResult> {
  const { createdBy, from, to, routeSteps, safetyTips, city = "Ibadan" } =
    input;

  if (!createdBy) {
    return {
      error: {
        message: "User ID required",
        details: null,
        hint: null,
        code: "auth_required",
        status: 401,
      },
    };
  }

  const fromLocation = await getLocationId(supabase, from, city);
  if (fromLocation.error || !fromLocation.id) {
    return {
      error: fromLocation.error ?? {
        message: "Unable to resolve source location",
        details: null,
        hint: null,
        code: "location_not_found",
        status: 500,
      },
    };
  }

  const toLocation = await getLocationId(supabase, to, city);
  if (toLocation.error || !toLocation.id) {
    return {
      error: toLocation.error ?? {
        message: "Unable to resolve destination location",
        details: null,
        hint: null,
        code: "location_not_found",
        status: 500,
      },
    };
  }

  const averageDuration = routeSteps.reduce(
    (total, step) => total + parseDurationMinutes(step.duration),
    0,
  );

  const { data: insertedRoute, error: routeError } = await supabase
    .from("routes")
    .insert([
      {
        source_location_id: fromLocation.id,
        destination_location_id: toLocation.id,
        confidence_score: 0,
        average_duration: averageDuration,
        status: "pending",
        created_by: createdBy,
      },
    ])
    .select("id")
    .single();

  if (routeError) {
    return { error: routeError };
  }

  if (!insertedRoute?.id) {
    return {
      error: {
        message: "Route was created without returning an id",
        details: null,
        hint: null,
        code: "route_id_missing",
        status: 500,
      },
    };
  }

  const routeId = insertedRoute.id as DatabaseId;
  const stepsToInsert = routeSteps.map((step, index) => {
    const fare = parseFareRange(step.fare);

    return {
      route_id: routeId,
      step_order: index + 1,
      instruction: step.title,
      transport_type: guessTransportType(step.title),
      fare_min: fare.min,
      fare_max: fare.max,
    };
  });

  const { error: stepError } = await supabase
    .from("route_steps")
    .insert(stepsToInsert);

  if (stepError) {
    return { error: stepError };
  }

  if (safetyTips?.trim()) {
    const { error: safetyError } = await supabase.from("safety_tips").insert([
      {
        route_id: routeId,
        content: safetyTips.trim(),
        severity: "normal",
        created_by: createdBy,
      },
    ]);

    if (safetyError) {
      return { error: safetyError };
    }
  }

  return { routeId: String(routeId) };
}

type PendingRouteRow = {
  id: string;
  source_location_id: string;
  destination_location_id: string;
  confidence_score: number | null;
  average_duration: number | null;
  created_by: string | null;
  created_at: string | null;
  creator: { username: string | null } | { username: string | null }[] | null;
  source_location: { name: string } | { name: string }[] | null;
  destination_location: { name: string } | { name: string }[] | null;
  route_steps:
    | { step_order: number; fare_min: number | null; fare_max: number | null }[]
    | null;
  route_votes: { id: string }[] | null;
};

const getLocationName = (
  location: PendingRouteRow["source_location"],
): string | undefined => {
  if (Array.isArray(location)) {
    return location[0]?.name;
  }

  return location?.name;
};

const getContributorName = (
  creator: PendingRouteRow["creator"],
): string | undefined => {
  if (Array.isArray(creator)) {
    return creator[0]?.username ?? undefined;
  }

  return creator?.username ?? undefined;
};

const formatFareRange = (steps: NonNullable<PendingRouteRow["route_steps"]>) => {
  const fares = steps.flatMap((step) =>
    [step.fare_min, step.fare_max].filter(
      (fare): fare is number => typeof fare === "number",
    ),
  );

  if (!fares.length) return "TBD";

  const min = Math.min(...fares);
  const max = Math.max(...fares);

  return min === max ? `N${min}` : `N${min}-${max}`;
};

export async function fetchPendingRoutes(
  supabase: SupabaseClient,
): Promise<{ data: RouteToVerify[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("routes")
    .select(
      "id, source_location_id, destination_location_id, confidence_score, average_duration, status, created_by, created_at, creator:created_by(username), source_location:source_location_id(name), destination_location:destination_location_id(name), route_steps(step_order, fare_min, fare_max), route_votes(id)",
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error };
  }

  const routes = ((data ?? []) as unknown as PendingRouteRow[]).map((route) => ({
    id: route.id,
    from: getLocationName(route.source_location) ?? route.source_location_id,
    to:
      getLocationName(route.destination_location) ??
      route.destination_location_id,
    contributor: getContributorName(route.creator) ?? "Unknown",
    contributorLevel: "Route Scout",
    estimatedFare: route.route_steps?.length
      ? formatFareRange(route.route_steps)
      : "TBD",
    estimatedTime: route.average_duration
      ? `${route.average_duration} mins`
      : "TBD",
    steps: route.route_steps?.length ?? 0,
    confidence: route.confidence_score ?? 0,
    verifications: route.route_votes?.length ?? 0,
    createdAt: route.created_at
      ? new Date(route.created_at).toLocaleDateString()
      : "Unknown",
  }));

  return { data: routes, error: null };
}

type LocationRow = { id: string; name: string };
type RouteRow = {
  id: string;
  status: string | null;
  confidence_score: number | null;
  average_duration: number | null;
  source_location: { name: string } | { name: string }[] | null;
  destination_location: { name: string } | { name: string }[] | null;
  route_steps: { id: string; step_order: number; instruction: string; transport_type: string; fare_min: number; fare_max: number }[] | null;
  safety_tips: { id: string; content: string; severity: string }[] | null;
};

export async function searchRoutes(
  supabase: SupabaseClient,
  from: string,
  to: string,
): Promise<{ data: RouteSearchResult | null; error: PostgrestError | null }> {
  const [fromResult, toResult] = await Promise.all([
    supabase.from("locations").select("id, name").ilike("name", `%${from.trim()}%`).limit(10),
    supabase.from("locations").select("id, name").ilike("name", `%${to.trim()}%`).limit(10),
  ]);

  if (fromResult.error) return { data: null, error: fromResult.error };
  if (toResult.error) return { data: null, error: toResult.error };

  const fromIds = (fromResult.data as LocationRow[] ?? []).map((l) => l.id);
  const toIds = (toResult.data as LocationRow[] ?? []).map((l) => l.id);

  if (!fromIds.length || !toIds.length) return { data: null, error: null };

  const { data: route, error: routeError } = await supabase
    .from("routes")
    .select(
      "id, status, confidence_score, average_duration, source_location:source_location_id(name), destination_location:destination_location_id(name), route_steps(id, step_order, instruction, transport_type, fare_min, fare_max), safety_tips(id, content, severity)",
    )
    .in("source_location_id", fromIds)
    .in("destination_location_id", toIds)
    .order("confidence_score", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (routeError) return { data: null, error: routeError };
  if (!route) return { data: null, error: null };

  const r = route as unknown as RouteRow;
  const steps = (r.route_steps ?? [])
    .sort((a, b) => a.step_order - b.step_order)
    .map((s) => ({
      id: s.id,
      stepOrder: s.step_order,
      instruction: s.instruction,
      transportType: s.transport_type,
      fareMin: s.fare_min,
      fareMax: s.fare_max,
    }));

  const allFares = steps.flatMap((s) => [s.fareMin, s.fareMax].filter((v) => v > 0));
  const totalFareMin = allFares.length ? Math.min(...allFares) : 0;
  const totalFareMax = allFares.length ? Math.max(...allFares) : 0;

  const fromName = Array.isArray(r.source_location) ? r.source_location[0]?.name : r.source_location?.name;
  const toName = Array.isArray(r.destination_location) ? r.destination_location[0]?.name : r.destination_location?.name;

  return {
    data: {
      id: r.id,
      from: fromName ?? from,
      to: toName ?? to,
      status: r.status ?? "pending",
      totalFareMin,
      totalFareMax,
      totalDuration: r.average_duration ?? 0,
      confidenceScore: r.confidence_score ?? 0,
      steps,
      safetyTips: (r.safety_tips ?? []).map((t) => ({ id: t.id, content: t.content, severity: t.severity })),
    },
    error: null,
  };
}

export async function getUserProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ data: UserProfile | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, xp, level, contribution_count, city")
    .eq("id", userId)
    .maybeSingle();

  if (error) return { data: null, error };

  if (!data) {
    const { data: authData } = await supabase.auth.getUser();
    const currentUser = authData?.user;

    let defaultUsername = "comutter_" + userId.slice(0, 5);
    let displayName = "";

    if (currentUser && currentUser.id === userId) {
      displayName = currentUser.user_metadata?.display_name || currentUser.user_metadata?.username || "";
    }

    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          username: displayName || defaultUsername,
          xp: 0,
          level: 1,
          contribution_count: 0,
          city: "Ibadan",
        },
      ])
      .select("id, username, xp, level, contribution_count, city")
      .maybeSingle();

    if (insertError) {
      return { data: null, error: insertError };
    }

    if (!newProfile) {
      return { data: null, error: null };
    }

    return {
      data: {
        id: newProfile.id,
        username: newProfile.username ?? "Unknown",
        xp: Number(newProfile.xp ?? 0),
        level: Number(newProfile.level ?? 1),
        contributionCount: Number(newProfile.contribution_count ?? 0),
        city: newProfile.city ?? "Ibadan",
      },
      error: null,
    };
  }

  return {
    data: {
      id: data.id,
      username: data.username ?? "Unknown",
      xp: data.xp ?? 0,
      level: data.level ?? 1,
      contributionCount: data.contribution_count ?? 0,
      city: data.city ?? "Ibadan",
    },
    error: null,
  };
}

export async function getLeaderboard(
  supabase: SupabaseClient,
  currentUserId?: string,
  limit = 10,
  offset = 0,
): Promise<{ data: LeaderboardEntry[] | null; userRank: number | null; hasMore: boolean; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, xp, contribution_count")
    .order("xp", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return { data: null, userRank: null, hasMore: false, error };

  const entries: LeaderboardEntry[] = (data ?? []).map((row, idx) => ({
    rank: offset + idx + 1,
    id: row.id,
    username: row.username ?? "Unknown",
    xp: row.xp ?? 0,
    contributionCount: row.contribution_count ?? 0,
  }));

  const hasMore = (data?.length ?? 0) === limit;

  let userRank: number | null = null;
  if (currentUserId) {
    const inTop = entries.find((e) => e.id === currentUserId);
    if (inTop) {
      userRank = inTop.rank;
    } else {
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp")
        .eq("id", currentUserId)
        .maybeSingle();
      if (profile) {
        const { count } = await supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .gt("xp", profile.xp ?? 0);
        userRank = (count ?? 0) + 1;
      }
    }
  }

  return { data: entries, userRank, hasMore, error: null };
}

export async function awardXP(
  supabase: SupabaseClient,
  userId: string,
  amount: number,
  incrementContribution = false,
): Promise<{ error: PostgrestError | null }> {
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("xp, contribution_count")
    .eq("id", userId)
    .maybeSingle();

  if (fetchError) return { error: fetchError };
  if (!profile) return { error: null };

  const newXP = (profile.xp ?? 0) + amount;
  const newLevel = newXP < 1000 ? 1 : newXP < 2500 ? 2 : newXP < 5000 ? 3 : 4;
  const updates: Record<string, number> = { xp: newXP, level: newLevel };
  if (incrementContribution) {
    updates.contribution_count = (profile.contribution_count ?? 0) + 1;
  }

  const { error } = await supabase.from("profiles").update(updates).eq("id", userId);
  return { error: error ?? null };
}

export async function submitRouteVerification(
  supabase: SupabaseClient,
  input: SubmitRouteVerificationInput,
): Promise<{ error: PostgrestError | null }> {
  const { routeId, userId, voteType, safetyTips } = input;

  const { error: voteError } = await supabase.from("route_votes").upsert(
    [
      {
        route_id: routeId,
        user_id: userId,
        vote_type: voteType,
      },
    ],
    { onConflict: "route_id,user_id" }
  );

  if (voteError) {
    return { error: voteError };
  }

  if (safetyTips?.trim()) {
    const { error: safetyError } = await supabase.from("safety_tips").insert([
      {
        route_id: routeId,
        content: safetyTips.trim(),
        severity: voteType === "unsafe" ? "warning" : "normal",
        created_by: userId,
      },
    ]);

    if (safetyError) {
      return { error: safetyError };
    }
  }

  // Recompute confidence score and promote route if threshold is met
  const { data: votes } = await supabase
    .from("route_votes")
    .select("vote_type")
    .eq("route_id", routeId);

  if (votes && votes.length > 0) {
    const total = votes.length;
    const accurate = votes.filter((v) => v.vote_type === "accurate").length;
    const unsafe = votes.filter((v) => v.vote_type === "unsafe").length;
    const confidence = Math.round((accurate / total) * 100);

    const routeUpdate: Record<string, number | string> = { confidence_score: confidence };
    if (accurate >= 3 && accurate > unsafe) {
      routeUpdate.status = "active";
    } else if (unsafe >= 2) {
      routeUpdate.status = "flagged";
    }

    await supabase.from("routes").update(routeUpdate).eq("id", routeId);
  }

  return { error: null };
}

export async function updateProfile(
  supabase: SupabaseClient,
  userId: string,
  updates: { username?: string; city?: string },
): Promise<{ error: PostgrestError | null }> {
  const { error } = await supabase.from("profiles").update(updates).eq("id", userId);
  return { error: error ?? null };
}
