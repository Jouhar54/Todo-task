import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddTask from './TodoList/AddTask';
import Profile from './TodoList/profile.jsx';
import TodoList from './TodoList/TodoList.jsx';
import SignUp from './SignupAndLogin/signup.jsx';
import Login from './SignupAndLogin/login.jsx';
import ProtectedRoute from './utils/protectRouter.jsx';
import Layout from './TodoList/layout.jsx'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Layout><TodoList /></Layout>} />} />
        <Route path="/add-task" element={<ProtectedRoute element={<Layout><AddTask /></Layout>} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Layout><Profile /></Layout>} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ProtectedRoute element={<Navigate to="/" />} />} />
      </Routes>
    </Router>
  );
};

export default App;
