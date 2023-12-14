WITH req_images AS (
  SELECT imageId, imagePath FROM images WHERE requestId = ?
)
SELECT * FROM request, * FROM req_images AS images
JOIN category ON category.id = request.category_id
JOIN location ON location.id = request.location_id
WHERE request.requestId = ?