from sqlalchemy.orm import Session
from main import engine,Post

db = Session(bind=engine)

posts = db.query(Post).all()
for post in posts:
    print(post.title,post.content)