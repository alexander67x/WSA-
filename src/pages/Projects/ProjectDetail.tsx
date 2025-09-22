import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Calendar, 
  DollarSign, 
  Settings,
  FileText,
  Package,
  BarChart3,
  Plus
} from 'lucide-react';

const tabs = [
  { id: 'schedule', label: 'Cronograma', icon: Calendar },
  { id: 'team', label: 'Equipo', icon: Users },
  { id: 'materials', label: 'Materiales', icon: Package },
  { id: 'reports', label: 'Reportes', icon: FileText },
];

const teamMembers = [
  { id: '1', name: 'Carlos Pérez', role: 'Project Manager', avatar: null },
  { id: '2', name: 'Ana García', role: 'Arquitecto Senior', avatar: null },
  { id: '3', name: 'Miguel Torres', role: 'Ingeniero Civil', avatar: null },
  { id: '4', name: 'Laura Mendez', role: 'Supervisor de Obra', avatar: null },
];

const materials = [
  { id: '1', name: 'Cemento Portland', quantity: 500, unit: 'Sacos', status: 'Disponible' },
  { id: '2', name: 'Varillas de Acero #4', quantity: 1200, unit: 'Unidades', status: 'Bajo Stock' },
  { id: '3', name: 'Blocks de Concreto', quantity: 800, unit: 'Unidades', status: 'Disponible' },
  { id: '4', name: 'Arena de Río', quantity: 25, unit: 'Metros³', status: 'Agotado' },
];

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedule');

  // Mock project data
  const project = {
    id: '1',
    name: 'Torre Residencial Norte',
    status: 'En Progreso',
    location: 'Ciudad Norte, Zona A',
    manager: 'Carlos Pérez',
    progress: 67,
    startDate: '2024-01-15',
    endDate: '2024-12-30',
    team: 25,
    budget: 2500000,
    description: 'Proyecto de camaras de seguridad de torre residencial de 20 pisos con amenidades completas.',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Bajo Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Agotado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'schedule':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Cronograma del Proyecto</h3>
              <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" />
                Nueva Tarea
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Vista de Gantt se mostraría aquí</p>
              <p className="text-sm text-gray-400 mt-2">Cronograma interactivo con dependencias</p>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Equipo del Proyecto</h3>
              <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" />
                Agregar Miembro
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {member.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'materials':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Materiales del Proyecto</h3>
              <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" />
                Solicitar Material
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Material</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Cantidad</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material) => (
                    <tr key={material.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{material.name}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {material.quantity} {material.unit}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                          {material.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Reportes del Proyecto</h3>
              <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-1" />
                Ver Todos los Reportes
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Lista de reportes del proyecto</p>
              <p className="text-sm text-gray-400 mt-2">Reportes de avance, incidencias y calidad</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/projects')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {project.status}
        </span>
      </div>

      {/* Project Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Ubicación</p>
              <p className="font-medium">{project.location}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Equipo</p>
              <p className="font-medium">{project.team} personas</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Duración</p>
              <p className="font-medium">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Presupuesto</p>
              <p className="font-medium">${project.budget.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso General</span>
            <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};