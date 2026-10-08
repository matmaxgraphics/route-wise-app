-- ==========================================
-- ROUTEPADI IBADAN - ITF OFFICE ROUTES
-- Routes to the ITF office (logbook submission) from major entry points.
-- Status 'pending' with confidence 0 until the community verifies them.
-- Run in the Supabase SQL editor. Safe to re-run (skips routes that already exist).
-- Durations are left NULL (shows "TBD") until we add map-based estimates.
-- ==========================================

DO $$
DECLARE
  creator_id uuid;
  route_id_val uuid;
  loc_itf uuid;
  loc_iworoad uuid;
  loc_moniya uuid;
  loc_ui uuid;
  loc_mokola uuid;
BEGIN
  SELECT id INTO creator_id FROM public.profiles WHERE lower(username) = 'roadking' LIMIT 1;
  IF creator_id IS NULL THEN
    RAISE EXCEPTION 'No profile with username RoadKing found. Sign up / set that username first.';
  END IF;

  -- Locations (insert only if missing)
  INSERT INTO public.locations (name, slug, city)
  SELECT v.name, v.slug, 'Ibadan'
  FROM (VALUES
    ('ITF Office', 'itf-office'),
    ('Iwo Road', 'iwo-road'),
    ('Moniya', 'moniya'),
    ('UI (University of Ibadan)', 'ui'),
    ('Mokola', 'mokola')
  ) AS v(name, slug)
  WHERE NOT EXISTS (
    SELECT 1 FROM public.locations l WHERE l.slug = v.slug AND l.city = 'Ibadan'
  );

  SELECT id INTO loc_itf     FROM public.locations WHERE slug = 'itf-office' AND city = 'Ibadan';
  SELECT id INTO loc_iworoad FROM public.locations WHERE slug = 'iwo-road'   AND city = 'Ibadan';
  SELECT id INTO loc_moniya  FROM public.locations WHERE slug = 'moniya'     AND city = 'Ibadan';
  SELECT id INTO loc_ui      FROM public.locations WHERE slug = 'ui'         AND city = 'Ibadan';
  SELECT id INTO loc_mokola  FROM public.locations WHERE slug = 'mokola'     AND city = 'Ibadan';

  -- 1. Iwo Road -> ITF Office
  IF NOT EXISTS (SELECT 1 FROM public.routes WHERE source_location_id = loc_iworoad AND destination_location_id = loc_itf AND created_by = creator_id) THEN
    INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
    VALUES (loc_iworoad, loc_itf, 0, NULL, 'pending', creator_id) RETURNING id INTO route_id_val;
    INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
      (route_id_val, 1, 'From Iwo Road, take a cab, bike or keke (tricycle) to Gate. Ask to be dropped at the bus-stop.', 'cab', 200, 300),
      (route_id_val, 2, 'From the bus-stop, take a cab, bike or keke going to the ITF office. It is on the left side of the road, just before Total Garden. Tell the driver you are going to ITF.', 'cab', 200, 300);
    INSERT INTO public.safety_tips (route_id, content, severity, created_by) VALUES
      (route_id_val, 'Fares are negotiable. Agree the price before you board; you can usually get it down by haggling.', 'normal', creator_id);
  END IF;

  -- 2. Moniya -> ITF Office
  IF NOT EXISTS (SELECT 1 FROM public.routes WHERE source_location_id = loc_moniya AND destination_location_id = loc_itf AND created_by = creator_id) THEN
    INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
    VALUES (loc_moniya, loc_itf, 0, NULL, 'pending', creator_id) RETURNING id INTO route_id_val;
    INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
      (route_id_val, 1, 'From Moniya, take a cab to Ojoo.', 'cab', 300, 500),
      (route_id_val, 2, 'From Ojoo, take a cab to Mokola.', 'cab', 400, 500),
      (route_id_val, 3, 'At Mokola, walk down from where you were dropped to the roundabout.', 'walk', 0, 0),
      (route_id_val, 4, 'At the roundabout, take a cab, bike or keke going to Gate and tell the driver you are stopping at the ITF office. ITF is before Gate, on the right side of the road. If unsure where to board, ask for where cabs going to Gate load.', 'cab', 400, 500);
    INSERT INTO public.safety_tips (route_id, content, severity, created_by) VALUES
      (route_id_val, 'Mokola has many drop-off points, so it is easy to board the wrong cab. Always ask for the cab going to where you are going.', 'normal', creator_id);
  END IF;

  -- 3. UI -> ITF Office
  IF NOT EXISTS (SELECT 1 FROM public.routes WHERE source_location_id = loc_ui AND destination_location_id = loc_itf AND created_by = creator_id) THEN
    INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
    VALUES (loc_ui, loc_itf, 0, NULL, 'pending', creator_id) RETURNING id INTO route_id_val;
    INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
      (route_id_val, 1, 'From the front of UI junction, cross to the opposite side of the road, then cross again to the right side to where cabs going to Gate are (about a 3 minute walk).', 'walk', 0, 0),
      (route_id_val, 2, 'Take a cab going to Gate.', 'cab', 500, 600),
      (route_id_val, 3, 'From where you are dropped, walk to the bus-stop (about 5 minutes).', 'walk', 0, 0),
      (route_id_val, 4, 'From the bus-stop, take a cab, bike or keke going to the ITF office. It is on the left side of the road, just before Total Garden.', 'cab', 200, 300);
    INSERT INTO public.safety_tips (route_id, content, severity, created_by) VALUES
      (route_id_val, 'Always ask for the cab going to where you are going before you board.', 'normal', creator_id);
  END IF;

  -- 4. Mokola -> ITF Office
  IF NOT EXISTS (SELECT 1 FROM public.routes WHERE source_location_id = loc_mokola AND destination_location_id = loc_itf AND created_by = creator_id) THEN
    INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
    VALUES (loc_mokola, loc_itf, 0, NULL, 'pending', creator_id) RETURNING id INTO route_id_val;
    INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
      (route_id_val, 1, 'At Mokola, walk down from where you were dropped to the roundabout.', 'walk', 0, 0),
      (route_id_val, 2, 'At the roundabout, take a cab, bike or keke going to Gate and tell the driver you are stopping at the ITF office. ITF is before Gate, on the right side of the road. If unsure where to board, ask for where cabs going to Gate load.', 'cab', 400, 500);
    INSERT INTO public.safety_tips (route_id, content, severity, created_by) VALUES
      (route_id_val, 'Mokola has many drop-off points, so it is easy to board the wrong cab. Always ask for the cab going to where you are going.', 'normal', creator_id);
  END IF;
END $$;
