//API通信

//API_URL定数化
const API_URL = "http://localhost:8000/posts";

  // 投稿取得専用共通関数
export const getPostsApi = async ()=>{
    const res = await fetch(API_URL); //API通信
    return await res.json();  //apiから帰ってきたデータをjson形式に変換
};

//投稿処理
export const createPostsApi = async (title,content) => { 
    const res = await fetch(API_URL, {
        method: "POST", //投稿作成
        headers: {
          "Content-Type": "application/json", //json形式で送ります
        },
        body: JSON.stringify({ //jsをJSON変換し、データを送る本体
        title: title,
        content: content,
        }),
    });
    return await res.json();
    }

    //削除
export const deletePostsApi = async(id)=>{
    await fetch(`${API_URL}/${id}`,{
    method:"DELETE",
    });
};

// 更新
export  const updatePostsApi = async(
    editId,
    title,
    content
)=>{
    const res = await fetch(`${API_URL}/${editId}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json", //jsをJSON変換し、データを送る本体
    },
      body:JSON.stringify({ //jsをJSON変換し、データを送る本体
        title,
        content,
    }),
});
    return await res.json()
    };