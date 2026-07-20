# 認証　パスワード　JWT関係

from passlib.context import CryptContext
from jose import jwt
from datetime import datetime,timedelta
from jose import JWTError,jwt

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# パスワードをハッシュ化
def hash_password(password):
    return pwd_context.hash(password)

# パスワードを検証　関数
def verify_password(
        plain_password,
        hashed_password
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )

# 秘密鍵
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#JWT　関数
def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({
        "exp":expire
    })
    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

# JWT 解析
def verify_token(token):
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )
    return payload

