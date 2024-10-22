import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from './utils/interceptor';


const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const api = useAxios();

    const postTodo = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/tasks/`, { title, description, });
            toast.success("Added Succesfuly")
            setTitle('');
            setDescription('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-14">
            <h1 className="text-2xl font-bold mb-4 text-center">Add New Task</h1>
            <form onSubmit={postTodo} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    required
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                />
                <button type="submit" className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-all duration-200 ease-in-out">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
