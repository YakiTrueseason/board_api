//画面全体　UI

import React from 'react'
import TodoList from "../components/Todolist"
import SignIn from "../components/SignIn"

const Home = () => {
    // const { todos } = useTodos();

    return (
        <div>
            <h1>掲示板API</h1>
            <TodoList />
            <SignIn />
        </div>
    )
}

export default Home
