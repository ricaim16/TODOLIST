import React, { useState, useEffect } from 'react';
import './Todolist.css';
import { BiCheckDouble, BiEdit, BiTrash, BiCheckCircle, BiReset, BiRefresh } from 'react-icons/bi';

function Todolist() {
  // Initialize todos state with stored todos or an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      if (editIndex !== -1) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { task: inputValue, completed: updatedTodos[editIndex].completed };
        setTodos(updatedTodos);
        setInputValue('');
        setEditIndex(-1);
      } else {
        setTodos([...todos, { task: inputValue, completed: false }]);
        setInputValue('');
      }
    }
  };

  const startEdit = (index) => {
    setInputValue(todos[index].task);
    setEditIndex(index);
  };

  const cancelEdit = () => {
    setInputValue('');
    setEditIndex(-1);
  };

  const updateTodo = () => {
    if (inputValue.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { ...updatedTodos[editIndex], task: inputValue };
      setTodos(updatedTodos);
      setInputValue('');
      setEditIndex(-1);
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    setTodos(updatedTodos);
  };

  useEffect(() => {
    // Save todos to local storage whenever todos change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <div className="input-section">
        <input
          type='text'
          className='input-field'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
          placeholder='Enter a new Task'
        />

        {editIndex !== -1 ? (
          <>
            <button className='update-btn' onClick={updateTodo}> <BiCheckDouble /></button>
            <button className='cancel-btn' onClick={cancelEdit}><BiRefresh /></button>
          </>
        ) : (
          <button className='add-btn' onClick={addTodo}>Add</button>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {todo.task}
            <div className='btn-group'>
              <button className='btn-edit' onClick={() => startEdit(index)}><BiEdit /></button>
              <button className='btn-remove' onClick={() => deleteTodo(index)}><BiTrash /></button>
              <button className="btn-done" onClick={() => toggleComplete(index)}>
                {todo.completed ? <BiReset /> : <BiCheckCircle />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
