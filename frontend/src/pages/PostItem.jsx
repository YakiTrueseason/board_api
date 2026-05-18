import React from 'react'

function PostItem({post,deletePost,startEdit}) {
return (
    <div>
        {/* タイトルと内容表示  投稿一個　単体*/}
        <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {/* 削除ボタン */}
        <button onClick={() => deletePost(post.id)}>
            削除
        </button>
        <button onClick={()=> startEdit(post)}>
            編集
        </button>
        </div>
    </div>
)

}

export default PostItem