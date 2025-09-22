import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus, User, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'Alta' | 'Media' | 'Baja';
  dueDate: string;
  project: string;
  type: 'reporte' | 'tarea';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const initialData: Column[] = [
  {
    id: 'pendiente',
    title: 'Pendiente',
    color: 'bg-yellow-100 border-yellow-300',
    tasks: [
      {
        id: '1',
        title: 'Inspección de Cimientos',
        description: 'Revisar estado de cimientos en Torre Norte',
        assignee: 'Miguel Torres',
        priority: 'Alta',
        dueDate: '2024-01-25',
        project: 'Torre Residencial Norte',
        type: 'reporte'
      },
      {
        id: '2',
        title: 'Solicitud de Materiales',
        description: 'Cemento y varillas para piso 5',
        assignee: 'Ana García',
        priority: 'Media',
        dueDate: '2024-01-23',
        project: 'Torre Residencial Norte',
        type: 'tarea'
      }
    ]
  },
  {
    id: 'en-progreso',
    title: 'En Progreso',
    color: 'bg-blue-100 border-blue-300',
    tasks: [
      {
        id: '3',
        title: 'Control de Calidad Piso 3',
        description: 'Verificación de acabados',
        assignee: 'Carlos Pérez',
        priority: 'Alta',
        dueDate: '2024-01-24',
        project: 'Centro Comercial Plaza',
        type: 'reporte'
      }
    ]
  },
  {
    id: 'revision',
    title: 'En Revisión',
    color: 'bg-orange-100 border-orange-300',
    tasks: [
      {
        id: '4',
        title: 'Reporte Semanal Materiales',
        description: 'Consumo de materiales semana 3',
        assignee: 'Laura Mendez',
        priority: 'Baja',
        dueDate: '2024-01-22',
        project: 'Torre Residencial Norte',
        type: 'reporte'
      }
    ]
  },
  {
    id: 'completado',
    title: 'Completado',
    color: 'bg-green-100 border-green-300',
    tasks: [
      {
        id: '5',
        title: 'Instalación Eléctrica Piso 2',
        description: 'Cableado y puntos eléctricos',
        assignee: 'Roberto Silva',
        priority: 'Media',
        dueDate: '2024-01-20',
        project: 'Torre Residencial Norte',
        type: 'tarea'
      }
    ]
  }
];

export const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const sourceTask = sourceColumn.tasks.find(task => task.id === draggableId);
    if (!sourceTask) return;

    const newColumns = columns.map(column => {
      if (column.id === source.droppableId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== draggableId)
        };
      }
      if (column.id === destination.droppableId) {
        const newTasks = [...column.tasks];
        newTasks.splice(destination.index, 0, sourceTask);
        return {
          ...column,
          tasks: newTasks
        };
      }
      return column;
    });

    setColumns(newColumns);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'reporte' ? AlertTriangle : CheckCircle;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tablero Kanban</h1>
        <button
          onClick={() => setShowNewTaskModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </button>
      </div>

      

      {/* Modal para nueva tarea (placeholder) */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white roundFed-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Nueva Tarea</h3>
            <p className="text-gray-600 mb-4">Formulario para crear nueva tarea se implementaría aquí</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};