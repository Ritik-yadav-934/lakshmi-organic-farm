import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status

from app.core.config import get_settings
from app.middleware.auth_middleware import get_current_admin

router = APIRouter(tags=["upload"])
settings = get_settings()

cloudinary.config(
    cloud_name=settings.cloudinary_cloud_name,
    api_key=settings.cloudinary_api_key,
    api_secret=settings.cloudinary_api_secret,
    secure=True,
)

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_FILE_SIZE_MB = 5


@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    _admin=Depends(get_current_admin),
):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG, WEBP, or GIF images are allowed.",
        )

    contents = await file.read()
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Image must be under {MAX_FILE_SIZE_MB}MB.",
        )

    result = cloudinary.uploader.upload(
        contents,
        folder="lakshmi_organic_farm/products",
        resource_type="image",
    )

    return {"url": result["secure_url"], "public_id": result["public_id"]}
