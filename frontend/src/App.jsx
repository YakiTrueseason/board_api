import './App.css';
import Home from './pages/Home';
import PostList from './components/PostList';
import EditModal from './components/EditModal';
import PostForm from './components/PostForm';
import { usePosts } from './hooks/UsePosts';


function App() {
  const{
    posts,
    title,
    content,
    editId,
    isModalOpen,

    setTitle,
    setContent,
    setIsModalOpen,

    sendPost,
    deletePost,
    startEdit,
    updatePost
  } =usePosts();
  
  return (
    <div className="App" id='main'>
      {/* UI コンポーネント */}
      <Home />
      {/* タイトル・投稿内容・編集出力*/}
    <PostForm 
        editId={editId}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        updatePost={updatePost}
        sendPost={sendPost}
    />

      {/* タイトルと内容表示 */}
      <PostList 
        posts={posts}
        deletePost={deletePost}
        startEdit={startEdit}
      />

      {/* モーダル */}
      <EditModal 
      isModalOpen={isModalOpen}
      title={title}
      setTitle={setTitle}
      setContent={setContent}
      content={content}
      updatePost={updatePost}
      setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default App;
