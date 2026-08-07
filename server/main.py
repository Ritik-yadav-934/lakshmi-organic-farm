from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.api import products, auth, upload

settings = get_settings()

app = FastAPI(
    title="Lakshmi Organic Farm API",
    description="Backend for the farm-to-home vegetable delivery platform.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(auth.router)
app.include_router(upload.router)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "lakshmi-organic-farm-api"}


@app.get("/")
def root():
    return {"message": "Lakshmi Organic Farm API — see /docs for the interactive API reference."}
