#pydantic(入力チェック) API用の型
from pydantic import BaseModel
# 返却用スキーマ
class PostCreate(BaseModel):
    title:str
    content:str
    image_path: str | None = None

class UserCreate(BaseModel):
    username:str
    password:str

#自動でJSON変換 IDはサーバー側で作る
class PostResponse(BaseModel):
    id: int
    title: str
    content: str