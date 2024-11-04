from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .models import Album
from .schemas import AlbumCreate, AlbumResponse
from typing import List
from .utils import simple_generate_unique_route_id

# Create the database tables
Base.metadata.create_all(bind=engine)

# app = FastAPI()
app = FastAPI(generate_unique_id_function=simple_generate_unique_route_id)


@app.post("/albums/", response_model=AlbumResponse, tags=["albums"])
def create_album(album: AlbumCreate, db: Session = Depends(get_db)):
    db_album = Album(
        title=album.title, artist=album.artist, description=album.description
    )
    db.add(db_album)
    db.commit()
    db.refresh(db_album)
    return db_album


@app.get("/albums/", response_model=List[AlbumResponse], tags=["albums"])
def read_albums(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    albums = db.query(Album).offset(skip).limit(limit).all()
    return albums
