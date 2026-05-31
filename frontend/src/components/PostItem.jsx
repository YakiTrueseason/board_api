//投稿１件表示

import React from 'react'

function PostItem({post,deletePost,startEdit}) {
return (
    <div className=' border bg-cyan-300 rounded p-4 mb-4 shadow'>
        {/* タイトルと内容表示  投稿一個　単体*/}
        <div key={post.id}>
        <h2 className='text-xl font-bold'>{post.title}</h2>
        <p className=' mt-2'>{post.content}</p>
        {/* 削除ボタン */}
        <button className='bg-blue-300 max fixed px-3 right-10 rounded' onClick={() => deletePost(post.id)}>
            削除
        </button>
        {/* 編集 */}
        <button className='bg-blue-300 auto flex px-3 justify-start rounded' onClick={()=> startEdit(post)}>
            編集
        </button>
        </div>
    </div>
)

}

export default PostItem