-- ==========================================
-- Removes the GPT-generated routes from the old seed-ibadan-routes.sql.
-- Run STEP 1 first and check that only generated routes are listed.
-- Then run STEP 2. Routes that already have community votes are kept.
-- ==========================================

-- STEP 1: preview
SELECT r.id, s.slug AS from_slug, d.slug AS to_slug, r.confidence_score, r.status
FROM public.routes r
JOIN public.locations s ON s.id = r.source_location_id
JOIN public.locations d ON d.id = r.destination_location_id
WHERE r.status = 'pending'
  AND r.confidence_score = 50
  AND (s.slug, d.slug) IN (
    ('ui','ojoo'), ('ui','sango'), ('ui','mokola'), ('ui','bodija'), ('ui','iwo-road'),
    ('sango','mokola'), ('sango','dugbe'), ('mokola','dugbe'), ('mokola','challenge'),
    ('dugbe','challenge'), ('challenge','iwo-road'), ('iwo-road','ojoo'), ('iwo-road','gate'),
    ('gate','mokola'), ('eleyele','dugbe'), ('apata','dugbe'), ('ojoo','moniya'), ('bodija','gate')
  )
  AND NOT EXISTS (SELECT 1 FROM public.route_votes v WHERE v.route_id = r.id);

-- STEP 2: delete (route_steps and safety_tips are removed by cascade)
DELETE FROM public.routes r
USING public.locations s, public.locations d
WHERE s.id = r.source_location_id
  AND d.id = r.destination_location_id
  AND r.status = 'pending'
  AND r.confidence_score = 50
  AND (s.slug, d.slug) IN (
    ('ui','ojoo'), ('ui','sango'), ('ui','mokola'), ('ui','bodija'), ('ui','iwo-road'),
    ('sango','mokola'), ('sango','dugbe'), ('mokola','dugbe'), ('mokola','challenge'),
    ('dugbe','challenge'), ('challenge','iwo-road'), ('iwo-road','ojoo'), ('iwo-road','gate'),
    ('gate','mokola'), ('eleyele','dugbe'), ('apata','dugbe'), ('ojoo','moniya'), ('bodija','gate')
  )
  AND NOT EXISTS (SELECT 1 FROM public.route_votes v WHERE v.route_id = r.id);

-- STEP 3: remove the invented "Agodi Gate" location once nothing references it
DELETE FROM public.locations l
WHERE l.slug = 'gate' AND l.city = 'Ibadan'
  AND NOT EXISTS (SELECT 1 FROM public.routes r WHERE r.source_location_id = l.id OR r.destination_location_id = l.id);
