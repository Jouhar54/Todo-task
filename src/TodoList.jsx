import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from './utils/interceptor';
import axios from 'axios';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [newText, setNewText] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('All'); // State for the filter
  const [selectedTodo, setSelectedTodo] = useState(null); // State for the selected Todo for the modal

  const api = useAxios();

  const fetchTodo = async () => {
    try {
      const response = await api.get(`/tasks/`);
       setTodoItems(response.data);
      // console.log(response,'response');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const putTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/tasks/${editingId}/`, {
        title: newText,
        description: newDescription,
        isCompleted: false,
      });
      setTodoItems((prev) => 
        prev.map(item => (item.id === editingId ? response.data : item))
      );
      toast.success("Edited Successfully");
      setEditingId('');
      setNewText('');
      setNewDescription('');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const markCompleted = async (id, isCompleted) => {
    try {
      const response = await api.put(`/tasks/${id}/`, { isCompleted: !isCompleted });
      setTodoItems((prev) => 
        prev.map(item => (item.id === id ? response.data : item))
      );
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      setTodoItems((prev) => prev.filter(item => item.id !== id)); // Remove deleted item
      toast.error("Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, title, description) => {
    setEditingId(id);
    setNewText(title);
    setNewDescription(description);
  };

  const filteredTodoItems = todoItems.filter(todo => {
    if (filter === 'All') return true;
    return filter === 'Completed' ? todo.isCompleted : !todo.isCompleted;
  });

  return (
    <div className="flex-grow max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Todo List</h1>

      {/* Dropdown for filtering */}
      <div className="flex justify-end mb-4">
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Check if filtered todoItems array is empty */}
      {filteredTodoItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You don't have any tasks</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTodoItems.map((todo) => (
            <div
              key={todo.id}
              className={`flex flex-col justify-between bg-white shadow-lg rounded-lg p-4 transition-all duration-200 ease-in-out ${todo.isCompleted ? 'bg-gray-200' : ''} h-56`}
            >
              <div>
                <div className="items-end">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => markCompleted(todo.id, todo.isCompleted)}
                    className="mr-3 h-5 w-5"
                  />
                  {editingId === todo.id ? (
                    <form onSubmit={putTodo} className="flex flex-col w-full">
                      <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                      />
                      <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Update description"
                        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                      />
                    </form>
                  ) : (
                    <div className="text-center">
                      <h2 className={`text-lg font-bold ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {todo.title}
                      </h2>
                      <p className={`text-gray-700 font-semibold ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {todo.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Center the buttons */}
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => setSelectedTodo(todo)}
                  className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-all duration-200 ease-in-out"
                >
                  View
                </button>
                {editingId === todo.id ? (
                  <>
                    <button
                      type="submit"
                      onClick={putTodo}
                      className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-all duration-200 ease-in-out">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId('')}
                      className="bg-gray-500 text-white rounded-md p-2 hover:bg-gray-600 transition-all duration-200 ease-in-out">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition-all duration-200 ease-in-out">
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(todo.id, todo.title, todo.description)}
                      className="bg-yellow-500 text-white rounded-md p-2 hover:bg-yellow-600 transition-all duration-200 ease-in-out">
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for displaying selected todo details */}
      {selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedTodo.title}</h2>
            <p className="text-gray-700 mb-4">{selectedTodo.description}</p>
            <p className="text-gray-700 mb-4">
              <strong>Status:</strong> {selectedTodo.isCompleted ? 'Completed' : 'Pending'}
            </p>
            <button
              onClick={() => setSelectedTodo(null)}
              className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition-all duration-200 ease-in-out">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
