import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle, 
  XCircle, 
  Image as ImageIcon,
  Download
} from 'lucide-react';

export const ReportDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock report data
  const report = {
    id: '1',
    title: 'Inspección de Cimientos - Torre Norte',
    project: 'Torre Residencial Norte',
    author: 'Miguel Torres',
    date: '2024-01-20',
    status: 'Pendiente',
    priority: 'Alta',
    location: 'Sector A - Nivel -2',
    description: 'Inspección detallada de los cimientos del edificio. Se encontraron algunas irregularidades menores en el vertido de concreto que requieren atención.',
    coordinates: { lat: 18.4861, lng: -69.9312 },
    photos: [
      { id: '1', url: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg', caption: 'Vista general de cimientos' },
      { id: '2', url: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg', caption: 'Detalle de irregularidad' },
    ],
    observations: [
      'Cimientos en general en buen estado',
      'Irregularidad menor en zona este',
      'Requiere refuerzo adicional',
    ],
  };

  const handleApprove = () => {
    alert('Reporte aprobado');
  };

  const handleReject = () => {
    alert('Reporte rechazado');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/reports')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
        </div>
        
        {report.status === 'Pendiente' && (
          <div className="flex space-x-3">
            <button
              onClick={handleReject}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Rechazar
            </button>
            <button
              onClick={handleApprove}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprobar
            </button>
          </div>
        )}
      </div>

      {/* Report Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Autor</p>
              <p className="font-medium">{report.author}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Fecha</p>
              <p className="font-medium">{new Date(report.date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Ubicación</p>
              <p className="font-medium">{report.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Descripción</h3>
        <p className="text-gray-700 leading-relaxed">{report.description}</p>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Fotografías</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2">
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">{photo.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación en Mapa</h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Mapa interactivo se mostraría aquí</p>
          <p className="text-sm text-gray-400 mt-2">
            Coordenadas: {report.coordinates.lat}, {report.coordinates.lng}
          </p>
        </div>
      </div>

      {/* Observations */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Observaciones</h3>
        <ul className="space-y-2">
          {report.observations.map((observation, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-gray-700">{observation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Export */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Exportar Reporte</h3>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Descargar PDF
        </button>
      </div>
    </div>
  );
};