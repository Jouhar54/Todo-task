import { useState, useContext } from 'react';
import { FaTimes, FaBars, FaTasks, FaPlus, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Use FaSignOutAlt for logout
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirecting after logout
import { AuthContext } from './context/authContext';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logoutUser, authTokens } = useContext(AuthContext)

  const navigate = useNavigate()

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogoutUser =()=>{
    logoutUser()
    navigate('/login')
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Button to toggle sidebar in mobile view */}
      <button
        className="p-3 text-white bg-gray-800 fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 lg:translate-x-0 z-40`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 bg-gray-800">
          <h2 className="text-xl font-bold">Task Manager</h2>
          <button className="lg:hidden text-white" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-4 space-y-4">
          <li className="px-4">
            <Link
              to="/"
              className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors duration-200"
              onClick={closeSidebar}
            >
              <FaTasks className="mr-2" />
              List of Todos
            </Link>
          </li>
          <li className="px-4">
            <Link
              to="/add-task"
              className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors duration-200"
              onClick={closeSidebar}
            >
              <FaPlus className="mr-2" />
              Add New Task
            </Link>
          </li>
          <li className="px-4">
            <Link
              to="/profile"
              className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors duration-200"
              onClick={closeSidebar}
            >
              <FaUser className="mr-2" />
              Profile
            </Link>
          </li>
          <li className="px-4">
            {authTokens ? (
              <button
                className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors duration-200 w-full"
                onClick={handleLogoutUser}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors duration-200"
                onClick={closeSidebar}
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            )}
          </li>
        </ul>
      </aside>

      {/* Overlay when sidebar is open (for mobile view) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
