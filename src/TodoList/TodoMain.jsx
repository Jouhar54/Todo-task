import TodoList from './components/todoList/TodoList';
import './App.css';

function TodoMain() {
    return (
        <div className="flex flex-col items-center font-sans mt-12">
        <div className="p-4 rounded-lg shadow-lg shadow-gray-300">
            <h1 className="text-2xl mb-5">Task Manager</h1>
            <TodoList />
        </div>
    </div>
    
    )
}

export default TodoMain