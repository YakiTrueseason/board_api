//API通信

//API_URL定数化
const API_URL = "https://board-api-qji1.onrender.com/docs";
//http://localhost:8000

// 投稿取得専用共通関数
const request = async(
    endpoint,
    method = "GET",
    body = null
) =>{
const option = {
    method,
    headers:{
        "Content-Type":"application/json"
    }
};
if(body){
    option.body = JSON.stringify(body);
}
const res = await fetch(
    `${API_URL}${endpoint}`,
    option
);
return await res.json();
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
    // editId,
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