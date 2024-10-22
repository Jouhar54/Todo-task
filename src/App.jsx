import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddTask from './AddTask';
import Profile from './Profile';
import TodoList from './TodoList.jsx';
import SignUp from './signup.jsx';
import Login from './login.jsx';
import ProtectedRoute from './utils/protectRouter.jsx';
import Layout from './Layout'; // Import the Layout component

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
