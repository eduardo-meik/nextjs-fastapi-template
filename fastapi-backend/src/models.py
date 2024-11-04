from sqlalchemy import Column, Integer, String
from .database import Base


class Album(Base):
    __tablename__ = "albums"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist = Column(String)
    year = Column(Integer)
    genre = Column(String)
    label = Column(String)
    description = Column(String)
