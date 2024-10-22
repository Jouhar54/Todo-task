// Layout.jsx
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow ml-64 max-w-4xl mx-auto p-4"> {/* Adjust margin-left based on sidebar width */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
