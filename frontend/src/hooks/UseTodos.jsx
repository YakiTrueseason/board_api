import { useEffect, useState } from 'react'
import { fetchTodos } from "../services/Api"

function UseTodos() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetchTodos().then(setTodos);
    }, []);
    return { todos }(
        <div>
            <p>ロジック状態管理</p>
            <p>再利用可能</p>
        </div>
    )
}

export default UseTodos
