import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/authContext';


const url_api = "http://82.180.145.66/api/v1";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const { setAuthTokens } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url_api}/login/`, credentials);
      console.log(response.data);
      const token = response.data;
      setAuthTokens(token)
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-14">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="username"
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button
          type="submit"
          className="me-9 bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-all duration-200 ease-in-out"
        >
          Login
        </button>
        <span>
          Not a User? <Link className="text-blue-600" to="/signUp">Create new Account</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;