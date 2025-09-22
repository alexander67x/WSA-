import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the dashboard
const projectData = [
  { name: 'SISTEMA DE VIDEO VIGILANCIA', awarded: 0.8, wsc: 0.6 },
  { name: 'SDI - ED. GREEN TOWER, SCZ', awarded: 0.9, wsc: 0.7 },
  { name: 'CONTROL DE ACCESO - ED. GREE', awarded: 0.7, wsc: 0.5 },
  { name: 'SEÑALES DEBILES - ED. GREEN TO', awarded: 0.6, wsc: 0.4 },
  { name: 'PARKING - ED. GREEN TOWER, SCZ', awarded: 0.5, wsc: 0.3 },
  { name: 'CITOFONIA - ED. GREEN TOWER, S', awarded: 0.4, wsc: 0.3 },
];

const financialData = [
  { name: 'PRIVADA', value: 1.30, color: '#10B981' },
  { name: 'PUBLICA', value: 1.06, color: '#8B5CF6' },
];

const mapMarkers = [
  { 
    position: [-17.3895, -66.1568], 
    name: 'ADUANA NACIONAL', 
    color: 'red',
    cities: ['Cochabamba', 'Quillacollo', 'Sacaba']
  },
  { 
    position: [-17.7833, -63.1667], 
    name: 'COMVERSA S.A.', 
    color: 'blue',
    cities: ['Santa Cruz de la Sierra', 'Portachuelo']
  },
];

export const Dashboard: React.FC = () => {
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('ENTREGA DEF.');

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      {/* WSC Header Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-800 flex items-center justify-center rounded">
              <span className="text-white font-bold text-lg">WSC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DASHBOART</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">CLIENTE:</label>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option>Todas</option>
                <option>ADUANA NACIONAL</option>
                <option>COMVERSA S.A.</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-xs text-gray-600">Cantidad Proyecto</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">0</div>
                <div className="text-xs text-gray-600">Cantidad Venta</div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Project Status and Financial Chart */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Project Status Navigation */}
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PROYECTO</h3>
              <div className="space-y-2">
                {['EJECUCIÓN', 'ENTREGA DEF.', 'FINALIZADO'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedProjectStatus(status)}
                    className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${
                      selectedProjectStatus === status
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Chart */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financiero</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 20]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value} mill.`, '']} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">PRIVADA: 1.30 mill.</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">PUBLICA: 1.06 mill.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Projects List */}
        <div className="col-span-6">
          <div className="bg-white rounded-lg shadow-sm h-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Proyectos</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Presupuesto Adjudicado</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Monto WSC</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {projectData.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Presupuesto Adjudicado</span>
                        <span className="font-medium">${project.awarded}M</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(project.awarded / 1) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Monto WSC</span>
                        <span className="font-medium">${project.wsc}M</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(project.wsc / 1) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Map */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm h-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Bolivia</h3>
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer
                  center={[-16.2902, -63.5887]}
                  zoom={6}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {mapMarkers.map((marker, index) => (
                    <CircleMarker
                      key={index}
                      center={marker.position}
                      radius={15}
                      pathOptions={{ color: marker.color, fillColor: marker.color, fillOpacity: 0.6 }}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-semibold">{marker.name}</h3>
                          <p className="text-sm text-gray-600">
                            {marker.cities.join(', ')}
                          </p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">ADUANA NACIONAL</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">COMVERSA S.A.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};