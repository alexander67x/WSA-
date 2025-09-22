import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter, Users, Clock } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  project: string;
  startDate: string;
  endDate: string;
  progress: number;
  assignee: string;
  dependencies: string[];
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'No Iniciado' | 'En Progreso' | 'Completado' | 'Retrasado';
}

const tasks: Task[] = [
  {
    id: '1',
    name: 'Excavación y Cimientos',
    project: 'Torre Residencial Norte',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    progress: 100,
    assignee: 'Miguel Torres',
    dependencies: [],
    priority: 'Alta',
    status: 'Completado'
  },
  {
    id: '2',
    name: 'Estructura Nivel -1',
    project: 'Torre Residencial Norte',
    startDate: '2024-02-10',
    endDate: '2024-03-10',
    progress: 75,
    assignee: 'Carlos Pérez',
    dependencies: ['1'],
    priority: 'Alta',
    status: 'En Progreso'
  },
  {
    id: '3',
    name: 'Estructura Piso 1-5',
    project: 'Torre Residencial Norte',
    startDate: '2024-03-01',
    endDate: '2024-05-15',
    progress: 30,
    assignee: 'Ana García',
    dependencies: ['2'],
    priority: 'Alta',
    status: 'En Progreso'
  },
  {
    id: '4',
    name: 'Instalaciones Eléctricas',
    project: 'Torre Residencial Norte',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 0,
    assignee: 'Roberto Silva',
    dependencies: ['3'],
    priority: 'Media',
    status: 'No Iniciado'
  },
  {
    id: '5',
    name: 'Acabados Interiores',
    project: 'Torre Residencial Norte',
    startDate: '2024-06-01',
    endDate: '2024-08-30',
    progress: 0,
    assignee: 'Laura Mendez',
    dependencies: ['4'],
    priority: 'Media',
    status: 'No Iniciado'
  }
];

export const ScheduleView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('all');
  const [viewMode, setViewMode] = useState<'gantt' | 'calendar'>('gantt');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-500';
      case 'En Progreso': return 'bg-blue-500';
      case 'Retrasado': return 'bg-red-500';
      case 'No Iniciado': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getTaskPosition = (task: Task) => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const taskStart = Math.max(startDate.getTime(), monthStart.getTime());
    const taskEnd = Math.min(endDate.getTime(), monthEnd.getTime());
    
    const startDay = Math.ceil((taskStart - monthStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const duration = Math.ceil((taskEnd - taskStart) / (1000 * 60 * 60 * 24)) + 1;
    
    return { startDay, duration };
  };

  const filteredTasks = tasks.filter(task => 
    selectedProject === 'all' || task.project === selectedProject
  );

  const projects = [...new Set(tasks.map(task => task.project))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Cronograma de Proyectos</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tarea
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los proyectos</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('gantt')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'gantt' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Gantt
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Calendario
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium text-gray-900">
              {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'gantt' ? (
        /* Gantt Chart View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="flex">
                  <div className="w-80 p-4 border-r border-gray-200">
                    <h3 className="font-medium text-gray-900">Tarea</h3>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-31 gap-1">
                      {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => (
                        <div key={i} className="text-center text-xs text-gray-600 font-medium">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="divide-y divide-gray-200">
                {filteredTasks.map((task) => {
                  const { startDay, duration } = getTaskPosition(task);
                  return (
                    <div key={task.id} className="flex hover:bg-gray-50">
                      <div className="w-80 p-4 border-r border-gray-200">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{task.name}</h4>
                          <div className="flex items-center mt-1 space-x-2">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{task.assignee}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="mt-1">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{task.progress}%</span>
                              <span>{new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className={`h-1.5 rounded-full ${getStatusColor(task.status)}`}
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4 relative">
                        <div className="grid grid-cols-31 gap-1 h-16 relative">
                          {startDay > 0 && duration > 0 && (
                            <div
                              className={`absolute h-6 rounded ${getStatusColor(task.status)} opacity-80 flex items-center justify-center`}
                              style={{
                                left: `${((startDay - 1) / 31) * 100}%`,
                                width: `${(duration / 31) * 100}%`,
                                top: '50%',
                                transform: 'translateY(-50%)'
                              }}
                            >
                              <span className="text-white text-xs font-medium truncate px-2">
                                {task.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Vista de Calendario</h3>
            <p className="text-gray-600 mt-2">
              Vista de calendario interactivo con tareas y eventos se implementaría aquí
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.slice(0, 6).map((task) => (
              <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{task.name}</h4>
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Users className="w-3 h-3 mr-1" />
                    {task.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Leyenda</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Completado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-700">En Progreso</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Retrasado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
            <span className="text-sm text-gray-700">No Iniciado</span>
          </div>
        </div>
      </div>
    </div>
  );
};