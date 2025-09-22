import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  FileText, 
  Calendar,
  Plus,
  Download,
  Eye
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: string;
  value: number;
  startDate: string;
  endDate: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Torre Residencial Norte',
    status: 'En Progreso',
    value: 2500000,
    startDate: '2024-01-15',
    endDate: '2024-12-30'
  },
  {
    id: '2',
    name: 'Centro Comercial Plaza',
    status: 'Planificación',
    value: 4200000,
    startDate: '2024-03-01',
    endDate: '2025-08-15'
  }
];

const documents: Document[] = [
  {
    id: '1',
    name: 'Contrato Principal Torre Norte.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    category: 'Contratos'
  },
  {
    id: '2',
    name: 'Planos Arquitectónicos.dwg',
    type: 'DWG',
    size: '15.8 MB',
    uploadDate: '2024-01-16',
    category: 'Planos'
  },
  {
    id: '3',
    name: 'Especificaciones Técnicas.docx',
    type: 'DOCX',
    size: '1.2 MB',
    uploadDate: '2024-01-17',
    category: 'Especificaciones'
  }
];

export const ClientDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'projects' | 'documents'>('info');

  // Mock client data
  const client = {
    id: '1',
    name: 'Juan Carlos Mendoza',
    company: 'Inversiones Norte S.A.',
    email: 'jmendoza@inversionesnorte.com',
    phone: '+1 (809) 555-0123',
    address: 'Av. Winston Churchill #45, Santo Domingo',
    type: 'Empresa',
    status: 'Activo',
    registrationDate: '2023-06-15',
    taxId: '131-12345-6',
    website: 'www.inversionesnorte.com',
    notes: 'Cliente preferencial con múltiples proyectos. Excelente historial de pagos.',
    contactPerson: 'María Fernández',
    contactPhone: '+1 (809) 555-0124',
    totalProjects: 3,
    totalValue: 5200000,
    lastContact: '2024-01-20'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Planificación': return 'bg-yellow-100 text-yellow-800';
      case 'Finalizado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/clients')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            {client.company && (
              <p className="text-gray-600">{client.company}</p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Proyecto
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Subir Documento
          </button>
        </div>
      </div>

      {/* Client Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Proyectos</p>
              <p className="text-2xl font-bold text-gray-900">{client.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">${client.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documentos</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Último Contacto</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(client.lastContact).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Información
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Proyectos
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Documentos
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900">{client.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="text-gray-900">{client.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Dirección</p>
                      <p className="text-gray-900">{client.address}</p>
                    </div>
                  </div>

                  {client.website && (
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Sitio Web</p>
                        <p className="text-gray-900">{client.website}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información Adicional</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Cliente</p>
                    <p className="text-gray-900">{client.type}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <p className="text-gray-900">{client.status}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Registro</p>
                    <p className="text-gray-900">{new Date(client.registrationDate).toLocaleDateString()}</p>
                  </div>

                  {client.taxId && (
                    <div>
                      <p className="text-sm text-gray-600">RNC/Cédula</p>
                      <p className="text-gray-900">{client.taxId}</p>
                    </div>
                  )}

                  {client.contactPerson && (
                    <div>
                      <p className="text-sm text-gray-600">Persona de Contacto</p>
                      <p className="text-gray-900">{client.contactPerson}</p>
                      <p className="text-sm text-gray-500">{client.contactPhone}</p>
                    </div>
                  )}
                </div>
              </div>

              {client.notes && (
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notas</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{client.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Proyectos del Cliente</h3>
                <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Nuevo Proyecto
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{project.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Valor:</span>
                        <span className="text-sm font-medium text-gray-900">${project.value.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Inicio:</span>
                        <span className="text-sm text-gray-900">{new Date(project.startDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fin:</span>
                        <span className="text-sm text-gray-900">{new Date(project.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Documentos del Cliente</h3>
                <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Subir Documento
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tamaño
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((document) => (
                      <tr key={document.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{document.name}</div>
                              <div className="text-sm text-gray-500">{document.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {document.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {document.size}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};