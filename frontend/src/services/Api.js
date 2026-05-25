//API通信

//API_URL定数化
const API_URL = "http://localhost:8000";

// 投稿取得専用共通関数
// export const getPostsApi = async ()=>{
//     const res = await fetch(API_URL); //API通信
//     return await res.json();  //apiから帰ってきたデータをjson形式に変換
// };
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
    // const res = await fetch(API_URL,{
    //     method:"POST",
    //     headers:{
    //         "Content-Type":"application/json"
    
        // body:JSON.stringify({

// return await res.json();

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
    // const res = await fetch(API_URL, {
    //     method: "POST", //投稿作成
    //     headers: {
    //       "Content-Type": "application/json", //json形式で送ります
    //     },
    //     body: JSON.stringify({ //jsをJSON変換し、データを送る本体
    //     title: title,
    //     content: content,
    //     }),
    // });
    // return await res.json();

    //削除
export const deletePostsApi = async(id)=>{
    return await request(
        `/posts/${id}`,
        "DELETE"
    );
};
    // await fetch(`${API_URL}/${id}`,{
    // method:"DELETE",
    // });

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
    // const res = await fetch(`${API_URL}/${editId}`,{
    // method:"PUT",
    // headers:{
    //     "Content-Type":"application/json", //jsをJSON変換し、データを送る本体
    // },
    //   body:JSON.stringify({ //jsをJSON変換し、データを送る本体
    {
        title,
        content,
    }
);
    // return await res.json()
    };