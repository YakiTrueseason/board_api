//投稿一覧表示

import React from 'react'
import PostItem from './PostItem'

function PostList({posts,deletePost,startEdit}) {
return (
    <div>
        {/* 投稿一覧管理  配列*/}
        {posts.map((post) => ( //1件ずつ配列を取り出す
            <PostItem 
            key={post.id} //どの要素か識別　React専用
            post={post} //親から子に一方的にデータを渡す
            deletePost={deletePost}
            startEdit={startEdit}
            />
        ))}
    </div>
    
)
}

export default PostList