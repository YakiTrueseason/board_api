//API通信

//API_URL定数化
const API_URL = "https://board-api-qji1.onrender.com";
//http://localhost:8000 開発環境
//https://board-api-qji1.onrender.com　本番　vercel

// 投稿取得専用共通関数
const request = async(
    endpoint,
    method = "GET",
    body = null
) =>{
// 毎回最新のトークンを取得
const token = localStorage.getItem("token");
const headers = {
    "Content-Type":"application/json",
};
if(token){
    headers["Authorization"] = `Bearer ${token}`;
}
const option = {
    method,
    headers
};
if(body){
    option.body = JSON.stringify(body);
}
const res = await fetch(
    `${API_URL}${endpoint}`,
    option
);
const data = await res.json();
// エラーならメッセージを投げる
if(!res.ok){
    throw new Error(data.detail || "エラーが発生しました");
}
return data;
};

//ログイン
export const loginApi = async(
    username,
    password
) => {
    return await request(
        "/login",
        "POST",
        {
        username,
        password
        }
    );
};
//サインアップ
export const signupApi = async(
    username,
    password
)=>{
    return await request(
        "/signup",
        "POST",
        {
            username,
            password
        }
    );
};

// ログイン中のユーザー情報取得
export const getMeApi = async()=>{
    return await request("/me");
}

//投稿取得
export const getPostsApi = async() =>{
    return await request("/posts");
};

//投稿処理
export const createPostsApi = async (
    title,content
) => { 
    return await request("/posts","POST",
    {
        title,content
    });
    };

//削除
export const deletePostsApi = async(id)=>{
    return await request(
        `/posts/${id}`,
        "DELETE"
    );
};

// 更新
export  const updatePostsApi = async(
    id,
    title,
    content
)=>{
    return await request(
        `/posts/${id}`,
        "PUT",
    {
        title,
        content,
    }
);
    };