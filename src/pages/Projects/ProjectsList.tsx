import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, MapPin, Users, Calendar } from 'lucide-react';

const projects = [
  {
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
  },
  {
    id: '2',
    name: 'Centro Comercial Plaza',
    status: 'Planificación',
    location: 'Centro Histórico',
    manager: 'Ana García',
    progress: 15,
    startDate: '2024-03-01',
    endDate: '2025-08-15',
    team: 35,
    budget: 4200000,
  },
  {
    id: '3',
    name: 'Puente Vehicular Sur',
    status: 'Finalizado',
    location: 'Acceso Sur',
    manager: 'Miguel Torres',
    progress: 100,
    startDate: '2023-06-01',
    endDate: '2024-01-30',
    team: 18,
    budget: 1800000,
  },
];

export const ProjectsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Planificación': return 'bg-yellow-100 text-yellow-800';
      case 'Finalizado': return 'bg-green-100 text-green-800';
      case 'Pausado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Planificación">Planificación</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Pausado">Pausado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {project.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {project.manager} • {project.team} personas
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Progreso</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  Presupuesto: ${project.budget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};