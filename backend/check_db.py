from sqlalchemy.orm import Session
from main import engine,DBPost    
# DB接続開始
db = Session(bind=engine)
# 全件取得
posts = db.query(DBPost).all()
# DBデータを表示
for post in posts:
    print(post.title,post.content)

db.close()