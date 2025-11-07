import { useState, useEffect } from "react";

const username = 'juan-cas';
const urlBase = `https://playground.4geeks.com/todo/users/${username}`;

const ToDoListConFetch = () => {

    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await fetch(urlBase);
            if (response.ok) {
                const data = await response.json();
                console.log('tareas desde API:', data.todos);

                const initial = Array.isArray(data.todos)
                    ? data.todos.map(t => (typeof t === 'string' ? t : t.label ?? ''))
                    : [];
                setTodos(initial);
            } else {
                console.log('No se encontraron tareas');
            }
        } catch (error) {
            console.error('Error obteniendo tareas', error);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            console.log('ingrese a handlerKeyDown');

            const textoLimpio = nuevaTarea.trim();
            if (textoLimpio) {
                try {
                    const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            label: textoLimpio,
                            is_done: false
                        })
                    });

                    if (response.ok) {
                        console.log('Tarea agregada correctamente');

                        setNuevaTarea('');
                        getTasks();
                    } else {
                        console.log('No se pudo agregar la tarea');
                    }
                } catch (error) {
                    console.error('Error agregando tarea', error);
                }
            }
        }
    };

    const removeTodo = (index) => {
        setTodos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="todo-listas">
            <div>
                <h1 className="todo-title text-center mt-4">To-dos</h1>

                <div className="Hoja">
                    <form onSubmit={handleKeyDown}>
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

export default ToDoListConFetch;


