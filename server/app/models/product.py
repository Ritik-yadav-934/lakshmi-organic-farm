from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.sql import func

from app.database.session import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False, index=True)
    category = Column(String(60), nullable=False, index=True)  # leafy | root | seasonal | desi | organic
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    unit = Column(String(20), nullable=False)  # kg | bunch | pc | g | dozen
    image_url = Column(String(500), nullable=True)
    quantity = Column(Integer, nullable=False, default=0)
    available = Column(Boolean, nullable=False, default=True)
    fresh_today = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
