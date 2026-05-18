import React from 'react'
import PostItem from './PostItem'

function PostList({posts,deletePost,startEdit}) {
return (
    <div>
        {/* 投稿一覧管理  配列*/}
        {posts.map((post) => (
            <PostItem 
            key={post.id}
            post={post}
            deletePost={deletePost}
            startEdit={startEdit}
            />
        ))}
    </div>
    
)
}

export default PostList