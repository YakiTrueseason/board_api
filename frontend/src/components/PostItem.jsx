//投稿１件表示

import React from 'react'

function PostItem({post,deletePost,startEdit}) {
return (
    <div className=' border bg-cyan-300 rounded p-4 mb-4 shadow'>
        {/* タイトルと内容表示  投稿一個　単体*/}
        <div key={post.id}>
        <h2 className='text-xl font-bold'>{post.title}</h2>
        <p className=' mt-2'>{post.content}</p>
        <small className='mt-2'>投稿者：{post.username}</small>
        {/* 削除ボタン */}
        <div className='flex justify-between mt-3'>
            <button className='bg-blue-300 px-3 py-1 rounded hover:scale-105 transition' onClick={() => deletePost(post.id)}>
                削除
            </button>
            {/* 編集 */}
            <button className='bg-blue-300 px-3 py-1 rounded hover:scale-105 transition' onClick={()=> startEdit(post)}>
                編集
            </button>
        </div>
        </div>
    </div>
)

}

export default PostItem