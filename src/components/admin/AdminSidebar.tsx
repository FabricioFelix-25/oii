import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <aside className="bg-neutral-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center py-3 px-4 ${
                  isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800'
                } transition-colors duration-200`
              }
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/article/new"
              className={({ isActive }) =>
                `flex items-center py-3 px-4 ${
                  isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800'
                } transition-colors duration-200`
              }
            >
              <FileText className="h-5 w-5 mr-3" />
              New Article
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center py-3 px-4 ${
                  isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800'
                } transition-colors duration-200`
              }
            >
              <User className="h-5 w-5 mr-3" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center py-3 px-4 ${
                  isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800'
                } transition-colors duration-200`
              }
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-neutral-800">
        <button
          onClick={logout}
          className="flex items-center py-2 px-4 w-full text-left hover:bg-neutral-800 rounded-md transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;