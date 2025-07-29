import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/todos";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const doneTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    setTodos(todos.filter((t) => t._id !== id));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === id ? updated : t)));
    setEditId(null);
    setEditText("");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2>Todo App</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} style={{ background: '#4caf50', color: 'white', border: 'none' }}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, minWidth: 300 }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: "#f4f4f4", borderRadius: 4, padding: 8 }}>
            {editId === todo._id ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(todo._id)}
                  style={{ flex: 1 }}
                />
                <button onClick={() => saveEdit(todo._id)} style={{ background: '#2196f3', color: 'white', border: 'none' }}>Save</button>
                <button onClick={() => setEditId(null)} style={{ background: '#757575', color: 'white', border: 'none' }}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{todo.text}</span>
                <button onClick={() => startEdit(todo._id, todo.text)} style={{ background: '#2196f3', color: 'white', border: 'none' }}>Edit</button>
                <button onClick={() => deleteTodo(todo._id)} style={{ background: '#f44336', color: 'white', border: 'none' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;