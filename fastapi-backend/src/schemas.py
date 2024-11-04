from pydantic import BaseModel
from typing import Optional


class AlbumCreate(BaseModel):
    title: str
    artist: str
    description: Optional[str]


class AlbumResponse(AlbumCreate):
    id: int

    class Config:
        from_attributes = True
