import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Building2,
  FileText,
  Kanban,
  Package,
  Users,
  Settings,
  Calendar,
  FolderOpen,
  PieChart,
  ChevronLeft,
  Home,
  FileTextIcon,
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Building2, label: 'Proyectos', path: '/projects' },
  { icon: FileText, label: 'Reportes', path: '/reports' },
  { icon: FileTextIcon, label: 'DESARROLLO CTTO', path: '/desarrollo-ctto' },
  { icon: Kanban, label: 'Kanban', path: '/kanban' },
  { icon: Package, label: 'Inventario', path: '/inventory' },
  { icon: Users, label: 'Clientes', path: '/clients' },
  { icon: FolderOpen, label: 'Documentos', path: '/documents' },
  { icon: Calendar, label: 'Cronograma', path: '/schedule' },
  { icon: PieChart, label: 'Analítica', path: '/analytics' },
  { icon: Settings, label: 'Configuración', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-blue-400">WSC</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : ''
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};