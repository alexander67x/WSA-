import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the dashboard - Security Company
const projectData = [
  { name: 'SISTEMA DE VIDEO VIGILANCIA - ADUANA NACIONAL', awarded: 2.8, wsc: 2.2 },
  { name: 'CONTROL DE ACCESO - BANCO NACIONAL', awarded: 1.9, wsc: 1.5 },
  { name: 'ALARMAS DE SEGURIDAD - CENTRO COMERCIAL', awarded: 1.7, wsc: 1.3 },
  { name: 'SISTEMA DE DETECCIÓN DE INTRUSOS - EMPRESA MINERA', awarded: 3.2, wsc: 2.6 },
  { name: 'CÁMARAS IP - RED HOSPITALARIA', awarded: 1.5, wsc: 1.1 },
  { name: 'SISTEMA DE MONITOREO 24/7 - AEROPUERTO', awarded: 4.1, wsc: 3.2 },
];

const financialData = [
  { name: 'PRIVADA', value: 8.30, color: '#10B981' },
  { name: 'PUBLICA', value: 6.06, color: '#8B5CF6' },
];

const mapMarkers = [
  { 
    position: [-17.3895, -66.1568], 
    name: 'ADUANA NACIONAL', 
    color: 'red',
    cities: ['Cochabamba', 'Quillacollo', 'Sacaba'],
    projects: ['Video Vigilancia', 'Control de Acceso', 'Alarmas']
  },
  { 
    position: [-17.7833, -63.1667], 
    name: 'COMVERSA S.A.', 
    color: 'blue',
    cities: ['Santa Cruz de la Sierra', 'Portachuelo'],
    projects: ['Sistema de Monitoreo', 'Cámaras IP', 'Detección de Intrusos']
  },
  {
    position: [-16.5000, -68.1500],
    name: 'BANCO NACIONAL',
    color: 'green',
    cities: ['La Paz', 'El Alto'],
    projects: ['Control de Acceso', 'Video Vigilancia', 'Alarmas Bancarias']
  }
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
                <option>BANCO NACIONAL</option>
                <option>EMPRESA MINERA</option>
                <option>RED HOSPITALARIA</option>
                <option>AEROPUERTO</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-600">Proyectos Activos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$14.36M</div>
                <div className="text-xs text-gray-600">Ingresos Totales</div>
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
                  <span className="text-sm text-gray-600">PRIVADA: 8.30 mill.</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">PUBLICA: 6.06 mill.</span>
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
                      center={marker.position as [number, number]}
                      radius={15}
                      pathOptions={{ color: marker.color, fillColor: marker.color, fillOpacity: 0.6 }}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-semibold">{marker.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {marker.cities.join(', ')}
                          </p>
                          <div className="text-xs text-gray-500">
                            <p className="font-medium">Proyectos de Seguridad:</p>
                            <ul className="list-disc list-inside mt-1">
                              {marker.projects.map((project, idx) => (
                                <li key={idx}>{project}</li>
                              ))}
                            </ul>
                          </div>
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
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">BANCO NACIONAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="px-6 py-3">
          <div className="flex space-x-4">
            {['GENERAL', 'DESARROLLO CTTO.', 'GARANTIAS', 'CRONOGRAMA', 'MONITOREO', 'WSC S.A. -...', 'COSTO-PRECIO'].map((item, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  item === 'GENERAL'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};