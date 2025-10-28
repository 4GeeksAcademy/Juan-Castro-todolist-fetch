import React, { useState } from "react";



const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    const addTodo = (e) => {
        e.preventDefault();
        const value = text.trim();
        if (!value) return;
        setTodos(prev => [...prev, value]);
        setText("");
    };
    
    const removeTodo = (index) => {
        setTodos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="todo-listas ">
            <div>
                <h1 className="todo-title text-center mt-4">todos</h1>

                <div className="Hoja">
                    <form onSubmit={addTodo}>
                        <input
                            className="todo-input"
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Escribe la tarea y presiona Enter"
                        />
                    </form>
                    <ul>
                        {todos.map((t, i) => (
                            <li key={i}>
                                <span>{t}</span>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => removeTodo(i)}
                                    aria-label={`Eliminar ${t}`}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default TodoList;