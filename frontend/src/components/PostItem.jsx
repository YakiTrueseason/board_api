//投稿１件表示

import React from 'react'
import { API_URL } from '../services/Api'

function PostItem({post,deletePost,startEdit,loginUser}) {
    // console.log(post.created_at);
return (
    <div className=' border bg-cyan-300 rounded p-4 mb-4 shadow'>
        {/* タイトルと内容表示  投稿一個　単体*/}
        <div key={post.id}>
        <h2 className='text-xl font-bold'>{post.title}</h2>
        <p className=' mt-2'>{post.content}</p>
        <img src={`${API_URL}${post.image_path}`} alt="投稿画像" className='mt-3 rounded-lg max-w-sm' />
        <small className='mt-2'>投稿者：{post.username}</small><br />
        <small className='mt-2'>投稿日：{new Date(post.created_at + "Z").toLocaleString("ja-JP")}</small><br />
        <small className='mt-2'>更新日：{new Date(post.updated_at + "Z").toLocaleString("ja-JP")}</small>
        {post.username === loginUser &&(
        <>
        <div className='flex justify-between mt-3'>
            {/* 削除ボタン */}
            <button className='bg-blue-300 px-3 py-1 rounded hover:scale-105 transition' onClick={() => deletePost(post.id)}>
                削除
            </button>
            {/* 編集 */}
            <button className='bg-blue-300 px-3 py-1 rounded hover:scale-105 transition' onClick={()=> startEdit(post)}>
                編集
            </button>
        </div>
        </>
        )}
        </div>
    </div>
)
}

export default PostItem