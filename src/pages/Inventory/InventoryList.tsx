import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Package, MapPin, AlertTriangle, Plus, ArrowUpDown } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  code: string;
  category: string;
  totalStock: number;
  unit: string;
  minStock: number;
  locations: {
    warehouse: string;
    stock: number;
  }[];
  lastMovement: string;
  status: 'Disponible' | 'Bajo Stock' | 'Agotado';
}

const materials: Material[] = [
  {
    id: '1',
    name: 'Camaras de Seguridad',
    code: 'CAM-001',
    category: 'Digital',
    totalStock: 450,
    unit: 'Sacos',
    minStock: 100,
    locations: [
      { warehouse: 'Almacén Central', stock: 300 },
      { warehouse: 'Almacén Obra Norte', stock: 150 }
    ],
    lastMovement: '2024-01-20',
    status: 'Disponible'
  },
  {
    id: '2',
    name: 'Cables #4',
    code: 'VAR-004',
    category: 'Cable',
    totalStock: 85,
    unit: 'Unidades',
    minStock: 100,
    locations: [
      { warehouse: 'Almacén Central', stock: 50 },
      { warehouse: 'Almacén Obra Norte', stock: 35 }
    ],
    lastMovement: '2024-01-19',
    status: 'Bajo Stock'
  },
  {
    id: '3',
    name: 'Sensores movimiento',
    code: 'BLK-001',
    category: 'Sensores',
    totalStock: 0,
    unit: 'Unidades',
    minStock: 200,
    locations: [
      { warehouse: 'Almacén Central', stock: 0 },
      { warehouse: 'Almacén Obra Norte', stock: 0 }
    ],
    lastMovement: '2024-01-18',
    status: 'Agotado'
  },
  
];

const warehouses = [
  { id: '1', name: 'Almacén Central', location: 'Zona Industrial Norte', materials: 156 },
  { id: '2', name: 'Almacén Obra Norte', location: 'Torre Residencial Norte', materials: 89 },
  { id: '3', name: 'Almacén Obra Plaza', location: 'Centro Comercial Plaza', materials: 67 }
];

export const InventoryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'materials' | 'warehouses'>('materials');
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Bajo Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Agotado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || material.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventario y Almacenes</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Transferir
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Material
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('materials')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'materials'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="w-4 h-4 mr-2" />
              Materiales
            </button>
            <button
              onClick={() => setActiveTab('warehouses')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'warehouses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Almacenes
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'materials' ? (
            <>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar materiales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="Cemento">Cemento</option>
                    <option value="Acero">Acero</option>
                    <option value="Blocks">Blocks</option>
                    <option value="Agregados">Agregados</option>
                  </select>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Bajo Stock">Bajo Stock</option>
                    <option value="Agotado">Agotado</option>
                  </select>
                </div>
              </div>

              {/* Materials Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ubicaciones
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Último Movimiento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMaterials.map((material) => (
                      <tr key={material.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{material.name}</div>
                            <div className="text-sm text-gray-500">{material.code} • {material.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {material.totalStock} {material.unit}
                          </div>
                          <div className="text-sm text-gray-500">
                            Mín: {material.minStock} {material.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {material.locations.map((location, index) => (
                              <div key={index} className="text-sm text-gray-600">
                                {location.warehouse}: {location.stock} {material.unit}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(material.status)}`}>
                            {material.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(material.lastMovement).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/inventory/materials/${material.id}`)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* Warehouses View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {warehouses.map((warehouse) => (
                <div
                  key={warehouse.id}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/inventory/warehouses/${warehouse.id}`)}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{warehouse.name}</h3>
                      <p className="text-sm text-gray-600">{warehouse.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Materiales</span>
                    <span className="text-2xl font-bold text-gray-900">{warehouse.materials}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};