from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.product import Product
from app.schemas.product_schema import ProductCreate, ProductUpdate


def list_products(
    db: Session,
    category: Optional[str] = None,
    search: Optional[str] = None,
    available_only: bool = False,
) -> list[Product]:
    query = db.query(Product)

    if category:
        query = query.filter(Product.category == category)

    if search:
        like = f"%{search}%"
        query = query.filter(or_(Product.name.ilike(like), Product.description.ilike(like)))

    if available_only:
        query = query.filter(Product.available.is_(True))

    return query.order_by(Product.fresh_today.desc(), Product.name.asc()).all()


def list_todays_harvest(db: Session) -> list[Product]:
    return (
        db.query(Product)
        .filter(Product.fresh_today.is_(True), Product.available.is_(True))
        .order_by(Product.name.asc())
        .all()
    )


def get_product(db: Session, product_id: int) -> Optional[Product]:
    return db.query(Product).filter(Product.id == product_id).first()


def create_product(db: Session, payload: ProductCreate) -> Product:
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(db: Session, product: Product, payload: ProductUpdate) -> Product:
    updates = payload.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product: Product) -> None:
    db.delete(product)
    db.commit()
