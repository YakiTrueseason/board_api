import React from 'react'
import TodoList from "../components/Todolist"
import SignIn from "../components/SignIn"

const Home = () => {
    // const { todos } = useTodos();

    return (
        <div>
            <p>画面</p>
            <h1>2ch風掲示板API</h1>
            <TodoList />
            <SignIn />
        </div>
    )
}

export default Home
