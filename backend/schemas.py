#pydantic(入力チェック)
from pydantic import BaseModel

class PostCreate(BaseModel):
    title:str
    content:str

class UserCreate(BaseModel):
    username:str
    password:str