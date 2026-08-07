from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.middleware.auth_middleware import get_current_admin
from app.schemas.product_schema import ProductOut, ProductCreate, ProductUpdate
from app.services import product_service

router = APIRouter(tags=["products"])


# ---------- Public endpoints (no auth — the storefront reads these) ----------

@router.get("/products", response_model=list[ProductOut])
def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Public product listing. Supports optional ?category= and ?search=
    filters, matching the Products page's filter chips and search bar.
    """
    return product_service.list_products(db, category=category, search=search)


@router.get("/today", response_model=list[ProductOut])
def get_todays_harvest(db: Session = Depends(get_db)):
    """Products currently marked fresh_today AND available."""
    return product_service.list_todays_harvest(db)


@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = product_service.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


# ---------- Admin-only endpoints (JWT required) ----------

@router.post("/products", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return product_service.create_product(db, payload)


@router.put("/products/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    product = product_service.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product_service.update_product(db, product, payload)


@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    product = product_service.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    product_service.delete_product(db, product)
    return None
