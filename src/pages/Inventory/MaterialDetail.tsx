import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, TrendingUp, TrendingDown, Plus, ArrowUpDown } from 'lucide-react';

interface Movement {
  id: string;
  type: 'entrada' | 'salida' | 'transferencia';
  quantity: number;
  date: string;
  user: string;
  warehouse: string;
  reference: string;
  notes?: string;
}

const movements: Movement[] = [
  {
    id: '1',
    type: 'entrada',
    quantity: 100,
    date: '2024-01-20',
    user: 'Carlos Pérez',
    warehouse: 'Almacén Central',
    reference: 'PO-2024-001',
    notes: 'Compra mensual de cemento'
  },
  {
    id: '2',
    type: 'transferencia',
    quantity: -50,
    date: '2024-01-19',
    user: 'Ana García',
    warehouse: 'Almacén Obra Norte',
    reference: 'TRF-001',
    notes: 'Transferencia para Torre Norte'
  },
  {
    id: '3',
    type: 'salida',
    quantity: -25,
    date: '2024-01-18',
    user: 'Miguel Torres',
    warehouse: 'Almacén Central',
    reference: 'REQ-2024-015',
    notes: 'Consumo piso 5'
  }
];

export const MaterialDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'movements'>('info');

  // Mock material data
  const material = {
    id: '1',
    name: 'Cemento Portland Tipo I',
    code: 'CEM-001',
    category: 'Cemento',
    description: 'Cemento Portland Tipo I para uso general en construcción',
    totalStock: 450,
    unit: 'Sacos',
    minStock: 100,
    maxStock: 1000,
    unitCost: 8.50,
    locations: [
      { warehouse: 'Almacén Central', stock: 300, location: 'Estante A-15' },
      { warehouse: 'Almacén Obra Norte', stock: 150, location: 'Zona B-3' }
    ],
    supplier: 'Cementos Nacionales S.A.',
    lastPurchase: '2024-01-15',
    avgConsumption: 75 // per week
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'entrada': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'salida': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'transferencia': return <ArrowUpDown className="w-4 h-4 text-blue-600" />;
      default: return null;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'entrada': return 'text-green-600';
      case 'salida': return 'text-red-600';
      case 'transferencia': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/inventory')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{material.name}</h1>
            <p className="text-gray-600">{material.code}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Entrada
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Transferir
          </button>
        </div>
      </div>

      {/* Material Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stock Total</p>
              <p className="text-2xl font-bold text-gray-900">{material.totalStock}</p>
              <p className="text-sm text-gray-500">{material.unit}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stock Mínimo</p>
              <p className="text-2xl font-bold text-gray-900">{material.minStock}</p>
              <p className="text-sm text-gray-500">{material.unit}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Consumo Semanal</p>
              <p className="text-2xl font-bold text-gray-900">{material.avgConsumption}</p>
              <p className="text-sm text-gray-500">{material.unit}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Costo Unitario</p>
              <p className="text-2xl font-bold text-gray-900">${material.unitCost}</p>
              <p className="text-sm text-gray-500">por {material.unit.toLowerCase()}</p>
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
              <Package className="w-4 h-4 mr-2" />
              Información
            </button>
            <button
              onClick={() => setActiveTab('movements')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'movements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Movimientos
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'info' ? (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información General</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Descripción</label>
                      <p className="text-gray-900">{material.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Categoría</label>
                      <p className="text-gray-900">{material.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Proveedor</label>
                      <p className="text-gray-900">{material.supplier}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Última Compra</label>
                      <p className="text-gray-900">{new Date(material.lastPurchase).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Control de Stock</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Stock Máximo</label>
                      <p className="text-gray-900">{material.maxStock} {material.unit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Punto de Reorden</label>
                      <p className="text-gray-900">{material.minStock} {material.unit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Días de Stock</label>
                      <p className="text-gray-900">{Math.round(material.totalStock / (material.avgConsumption / 7))} días</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicaciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {material.locations.map((location, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <h4 className="font-medium text-gray-900">{location.warehouse}</h4>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Stock: {location.stock} {material.unit}</p>
                        <p className="text-sm text-gray-600">Ubicación: {location.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Movements Tab */
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Historial de Movimientos</h3>
                <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Nuevo Movimiento
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Almacén
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referencia
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {movements.map((movement) => (
                      <tr key={movement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getMovementIcon(movement.type)}
                            <span className={`ml-2 text-sm font-medium capitalize ${getMovementColor(movement.type)}`}>
                              {movement.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {movement.quantity > 0 ? '+' : ''}{movement.quantity} {material.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(movement.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {movement.user}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {movement.warehouse}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm text-gray-900">{movement.reference}</div>
                            {movement.notes && (
                              <div className="text-sm text-gray-500">{movement.notes}</div>
                            )}
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