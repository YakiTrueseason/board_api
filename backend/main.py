#fastAPI処理
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware #reactからアクセス許可する機能[]
from database import SessionLocal,Base,engine
from schemas import (UserCreate,PostCreate)
from models import User,DBPost
from fastapi.middleware.cors import CORSMiddleware
from hash.auth import (
    verify_password,
    hash_password,
    create_access_token,
    verify_token
    )
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from fastapi import HTTPException
from fastapi import UploadFile,File
from fastapi.staticfiles import StaticFiles
import shutil
import os
import uuid

#テーブル作成 定義したテーブルを実際のDBに作る　
Base.metadata.create_all(bind=engine) 

#appに機能追加していく
app = FastAPI() 

#Reactからアクセス許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    #ReactURLのURL ログイン情報・Cookie許可
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/hello")
def hello():
    return{"message":"Hello from FASTAPI"}

#仮DB
# posts = []#配列を投稿で保存　DBを使う
# current_id = 0 #ID管理用

#一覧取得
@app.get("/posts") #GET/posts(配列)　全投稿を返す
def get_posts():
    db = SessionLocal()
    posts = db.query(DBPost).all()
    db.close()
    return posts

#　ユーザー作成
@app.post("/signup")
def signup(user:UserCreate):
    db = SessionLocal()
    new_user = User(
        username=user.username,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.close()
    return{"message":"作成成功"}

#ログイン　認証
@app.post("/login")
def login(user:UserCreate):
    db=SessionLocal()
    db_user = db.query(User).filter(
        User.username == user.username
    ).first()
    if not db_user:
        return{"error":"存在しない"}
    if not verify_password(
        user.password,
        db_user.password
    ):
        return{"error":"パスワードが違う"}
    # JWT作成
    token = create_access_token(
            {
                "sub":db_user.username
            }
        )
    #JWTを返す
    return {
            "access_token":token,
            "token_type":"bearer"
        }

# JWT 取り出す
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

#投稿成功
@app.post("/posts")#JSONを受け取りPOST型に変換、配列に追加し返す
def create_post(
    post: PostCreate,
    token:str = Depends(oauth2_scheme)
    ):
    payload = verify_token(token)
    username = payload["sub"]
    print(username)

    db = SessionLocal()

    new_post = DBPost(
        title=post.title,
        content=post.content,
        username=username,
        image_path=post.image_path
    )

    db.add(new_post)#保存予約
    db.commit() #DBに保存
    db.refresh(new_post) #DB最新状態を取得
    db.close() #DB接続終了

    return new_post#削除してもズレない
    
# ログイン中のユーザー情報を取得
@app.get("/me")
def get_me(
    token:str = Depends(oauth2_scheme)
):
    payload = verify_token(token)
    return {
        "username":payload["sub"]
    }

#更新機能
@app.put("/posts/{id}") 
#どの投稿をどんな内容に変えるかを受け取る
def update_post(
    id: int,
    post: PostCreate,
    token:str = Depends(oauth2_scheme)
): 
    payload = verify_token(token)
    username = payload["sub"]

    db = SessionLocal() #SQLite接続開始
    #DB検索
    db_post = db.query(DBPost).filter(DBPost.id == id).first()
    #存在確認
    if not db_post:
        db.close()
        return{"error":"存在しない"}
    # 本人確認
    if db_post.username != username:
        db.close()
        raise HTTPException(
            status_code=403,
            detail="他人の投稿は編集できません"
        )
    # 新しい画像に変更されたら古い画像を削除
    if(
        post.image_path
        and
        db_post.image_path
        and
        post.image_path != db_post.image_path
    ):
        old_file = db_post.image_path.replace(
            "/uploads/","uploads/"
        )
        if os.path.exists(old_file):
            os.remove(old_file)
    #更新　pythonオブジェクト変更
    db_post.title = post.title
    db_post.content = post.content
    db_post.image_path = post.image_path
    #DB保存　更新確定
    db.commit()
    #最新状態取得
    db.refresh(db_post)
    #DB接続終了
    db.close()
    return db_post

#投稿削除
@app.delete("/posts/{id}")
def delete_post(id: int,token:str = Depends(oauth2_scheme)): 

    payload = verify_token(token)
    username = payload["sub"]

    db = SessionLocal() #SQLite接続開始
    
    #テーブル操作を開始しidを一致検索、最初の1件を取得する
    db_post = db.query(DBPost).filter(DBPost.id == id).first()
    # 画像があれば削除
    if db_post.image_path:
        image_file = db_post.image_path.replace("/uploads/","uploads/")

        if os.path.exists(image_file):
            os.remove(image_file)
    #該当データ無いか？
    if not db_post:
        db.close()
        return{"error":"存在しない"}
    # 本人確認
    if db_post.username != username:
        db.close()
        raise HTTPException(
            status_code=403,
            detail="他人の投稿は削除できません"
        )
    #削除予約
    db.delete(db_post)
    db.commit()
    db.close()

    return{"message" : "削除成功"}


# フォルダー自動作成
if not os.path.exists("uploads"):
    os.makedirs("uploads")

# 画像表示
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# 画像アップロード
@app.post("/upload")
def upload_image(
    file:UploadFile = File(...)
):
    # 拡張子取得
    ext = file.filename.split(".")[-1]
    # ファイル名を重複しないようにする
    filename = f"{uuid.uuid4()}.{ext}"
    # 保存先
    filepath = os.path.join(
        "uploads",
        filename
    )
    # 保存
    with open(filepath,"wb")as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )
    return{"image_path":f"/uploads/{filename}"}

# デバック　開発確認用API
@app.get("/debug")
def debug_db():
    db = SessionLocal()
    #全件取得
    posts = db.query(DBPost).all()
    db.close()
    return posts

# データベース ハッシュ化　確認
@app.get("/users")
def get_user():
    db = SessionLocal()
    users = db.query(User).all()
    db.close()
    return users