from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    category: str = Field(..., min_length=1, max_length=60)
    description: Optional[str] = None
    price: float = Field(..., ge=0)
    unit: str
    image_url: Optional[str] = None
    quantity: int = Field(..., ge=0)
    available: bool = True
    fresh_today: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(None, ge=0)
    unit: Optional[str] = None
    image_url: Optional[str] = None
    quantity: Optional[int] = Field(None, ge=0)
    available: Optional[bool] = None
    fresh_today: Optional[bool] = None


class ProductOut(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
