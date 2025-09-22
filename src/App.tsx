import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login/Login';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { ProjectsList } from './pages/Projects/ProjectsList';
import { ProjectDetail } from './pages/Projects/ProjectDetail';
import { ReportsList } from './pages/Reports/ReportsList';
import { ReportDetail } from './pages/Reports/ReportDetail';
import { KanbanBoard } from './pages/Kanban/KanbanBoard';
import { InventoryList } from './pages/Inventory/InventoryList';
import { MaterialDetail } from './pages/Inventory/MaterialDetail';
import { ClientsList } from './pages/Clients/ClientsList';
import { ClientDetail } from './pages/Clients/ClientDetail';
import { ScheduleView } from './pages/Schedule/ScheduleView';

// Placeholder components for other pages
const DocumentsPage = () => <div className="p-8 bg-white rounded-lg"><h1 className="text-2xl font-bold mb-4">Documentos</h1><p>Gestor documental se implementaría aquí</p></div>;
const DesarrolloCttoPage = () => <div className="p-8 bg-white rounded-lg"><h1 className="text-2xl font-bold mb-4">DESARROLLO CTTO</h1><p>Desarrollo de contratos se implementaría aquí</p></div>;
const AnalyticsPage = () => <div className="p-8 bg-white rounded-lg"><h1 className="text-2xl font-bold mb-4">Analítica</h1><p>Reportes y analítica avanzada se implementaría aquí</p></div>;
const SettingsPage = () => <div className="p-8 bg-white rounded-lg"><h1 className="text-2xl font-bold mb-4">Configuración</h1><p>Configuración del sistema se implementaría aquí</p></div>;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><ProjectsList /></ProtectedRoute>} />
      <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportsList /></ProtectedRoute>} />
      <Route path="/reports/:id" element={<ProtectedRoute><ReportDetail /></ProtectedRoute>} />
      <Route path="/desarrollo-ctto" element={<ProtectedRoute><DesarrolloCttoPage /></ProtectedRoute>} />
      <Route path="/kanban" element={<ProtectedRoute><KanbanBoard /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><InventoryList /></ProtectedRoute>} />
      <Route path="/inventory/materials/:id" element={<ProtectedRoute><MaterialDetail /></ProtectedRoute>} />
      <Route path="/clients" element={<ProtectedRoute><ClientsList /></ProtectedRoute>} />
      <Route path="/clients/:id" element={<ProtectedRoute><ClientDetail /></ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><ScheduleView /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;