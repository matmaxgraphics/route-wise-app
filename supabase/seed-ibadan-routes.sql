-- ==========================================
-- ROUTEWISE IBADAN - CORE SEED DATA
-- Inserts key locations and popular routes
-- Status: 'pending' (Ready for user verification)
-- ==========================================

-- Inject Locations, Routes and Steps using a safe PL/pgSQL block
DO $$
DECLARE
  creator_id uuid;
  route_id_val uuid;
  loc_ui uuid;
  loc_sango uuid;
  loc_mokola uuid;
  loc_dugbe uuid;
  loc_challenge uuid;
  loc_iworoad uuid;
  loc_ojoo uuid;
  loc_moniya uuid;
  loc_bodija uuid;
  loc_gate uuid;
  loc_eleyele uuid;
  loc_apata uuid;
BEGIN
  -- Get the first user profile to attribute the routes to
  SELECT id INTO creator_id FROM public.profiles LIMIT 1;
  
  IF creator_id IS NULL THEN
    RAISE EXCEPTION 'No user profiles found in the database. Please sign up at least one user in the app before running this seed script.';
  END IF;

  -- 1. Safely insert locations if they do not exist
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'ui' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('UI (University of Ibadan)', 'ui', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'sango' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Sango', 'sango', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'mokola' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Mokola', 'mokola', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'dugbe' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Dugbe', 'dugbe', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'challenge' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Challenge', 'challenge', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'iwo-road' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Iwo Road', 'iwo-road', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'ojoo' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Ojoo', 'ojoo', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'moniya' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Moniya', 'moniya', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'bodija' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Bodija', 'bodija', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'gate' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Gate (Agodi Gate)', 'gate', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'eleyele' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Eleyele', 'eleyele', 'Ibadan');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'apata' AND city = 'Ibadan') THEN
    INSERT INTO public.locations (name, slug, city) VALUES ('Apata', 'apata', 'Ibadan');
  END IF;

  -- 2. Fetch location IDs
  SELECT id INTO loc_ui FROM public.locations WHERE slug = 'ui' AND city = 'Ibadan';
  SELECT id INTO loc_sango FROM public.locations WHERE slug = 'sango' AND city = 'Ibadan';
  SELECT id INTO loc_mokola FROM public.locations WHERE slug = 'mokola' AND city = 'Ibadan';
  SELECT id INTO loc_dugbe FROM public.locations WHERE slug = 'dugbe' AND city = 'Ibadan';
  SELECT id INTO loc_challenge FROM public.locations WHERE slug = 'challenge' AND city = 'Ibadan';
  SELECT id INTO loc_iworoad FROM public.locations WHERE slug = 'iwo-road' AND city = 'Ibadan';
  SELECT id INTO loc_ojoo FROM public.locations WHERE slug = 'ojoo' AND city = 'Ibadan';
  SELECT id INTO loc_moniya FROM public.locations WHERE slug = 'moniya' AND city = 'Ibadan';
  SELECT id INTO loc_bodija FROM public.locations WHERE slug = 'bodija' AND city = 'Ibadan';
  SELECT id INTO loc_gate FROM public.locations WHERE slug = 'gate' AND city = 'Ibadan';
  SELECT id INTO loc_eleyele FROM public.locations WHERE slug = 'eleyele' AND city = 'Ibadan';
  SELECT id INTO loc_apata FROM public.locations WHERE slug = 'apata' AND city = 'Ibadan';

  -- 3. Route 1: UI -> Ojoo
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_ui, loc_ojoo, 50, 15, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a direct keke (tricycle) or share-cab heading to Ojoo from UI Gate', 'tricycle', 200, 300),
  (route_id_val, 2, 'Drop at Ojoo Roundabout', 'other', 0, 0);

  -- Route 2: UI -> Sango
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_ui, loc_sango, 50, 10, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Take a direct cab or bus heading towards Sango from UI Gate', 'cab', 150, 250),
  (route_id_val, 2, 'Drop at Sango Junction / Underpass', 'other', 0, 0);

  -- Route 3: UI -> Mokola
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_ui, loc_mokola, 50, 20, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a cab or bus heading to Mokola from UI Gate', 'cab', 300, 450),
  (route_id_val, 2, 'Drop at Mokola Roundabout', 'other', 0, 0);

  -- Route 4: UI -> Bodija
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_ui, loc_bodija, 50, 15, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Take a keke (tricycle) from Agbowo UI Gate heading inside Bodija', 'tricycle', 200, 300),
  (route_id_val, 2, 'Drop at Bodija Market / Housing Estate', 'other', 0, 0);

  -- Route 5: UI -> Iwo Road
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_ui, loc_iworoad, 50, 30, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a bus heading towards Iwo Road from Agbowo UI Gate', 'bus', 400, 600),
  (route_id_val, 2, 'Drop at Iwo Road Interchange', 'other', 0, 0);

  -- Route 6: Sango -> Mokola
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_sango, loc_mokola, 50, 10, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a direct taxi or bus from Sango Junction to Mokola', 'bus', 200, 300);

  -- Route 7: Sango -> Dugbe
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_sango, loc_dugbe, 50, 20, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a cab from Sango going towards Dugbe', 'cab', 300, 500);

  -- Route 8: Mokola -> Dugbe
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_mokola, loc_dugbe, 50, 10, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a short distance cab or keke from Mokola Roundabout to Dugbe', 'cab', 150, 250);

  -- Route 9: Mokola -> Challenge
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_mokola, loc_challenge, 50, 25, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a direct bus or cab from Mokola to Challenge', 'bus', 400, 600);

  -- Route 10: Dugbe -> Challenge
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_dugbe, loc_challenge, 50, 20, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a direct cab or bus from Dugbe heading to Challenge', 'cab', 300, 500);

  -- Route 11: Challenge -> Iwo Road
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_challenge, loc_iworoad, 50, 30, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a bus heading to Iwo Road from Challenge Park / Under Bridge', 'bus', 400, 700);

  -- Route 12: Iwo Road -> Ojoo
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_iworoad, loc_ojoo, 50, 25, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a direct bus from Iwo Road Interchange to Ojoo via the Express', 'bus', 300, 500);

  -- Route 13: Iwo Road -> Gate
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_iworoad, loc_gate, 50, 15, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a direct cab or bus from Iwo Road to Agodi Gate', 'cab', 200, 300);

  -- Route 14: Gate -> Mokola
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_gate, loc_mokola, 50, 20, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Take a direct cab or bus from Agodi Gate to Mokola Roundabout', 'cab', 300, 450);

  -- Route 15: Eleyele -> Dugbe
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_eleyele, loc_dugbe, 50, 20, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a direct cab from Eleyele Junction to Dugbe', 'cab', 200, 350);

  -- Route 16: Apata -> Dugbe
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_apata, loc_dugbe, 50, 20, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Take a direct bus or cab from Apata to Dugbe', 'bus', 300, 500);

  -- Route 17: Ojoo -> Moniya
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_ojoo, loc_moniya, 50, 25, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a bus or keke from Ojoo heading to Moniya', 'bus', 250, 400);

  -- Route 18: Bodija -> Gate
  INSERT INTO public.routes (source_location_id, destination_location_id, confidence_score, average_duration, status, created_by)
  VALUES (loc_bodija, loc_gate, 50, 15, 'pending', creator_id) RETURNING id INTO route_id_val;
  INSERT INTO public.route_steps (route_id, step_order, instruction, transport_type, fare_min, fare_max) VALUES
  (route_id_val, 1, 'Board a keke or cab from Bodija to Agodi Gate', 'tricycle', 250, 400);

END $$;
