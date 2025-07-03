import React from 'react';
import { FileText, Calendar, User, Stethoscope, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const MedicalRecordCard = ({ record, onViewDetails }) => {
  const formatDate = (dateString, forFilename = false) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (forFilename) {
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    }
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Título y logo (placeholder)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(40, 55, 71);
    doc.text('Urovital', 14, 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(127, 140, 141);
    doc.text('Informe de Consulta Médica', 14, 30);
    
    // Línea divisora
    doc.setDrawColor(22, 160, 133);
    doc.line(14, 35, 196, 35);

    // Información del paciente y consulta
    autoTable(doc, {
      startY: 40,
      body: [
        [{ content: 'Paciente:', styles: { fontStyle: 'bold' } }, record.patientName || 'N/A'],
        [{ content: 'DNI:', styles: { fontStyle: 'bold' } }, record.patientDocument || 'N/A'],
        [{ content: 'Fecha de Consulta:', styles: { fontStyle: 'bold' } }, formatDate(record.recordDate)],
        [{ content: 'Médico Tratante:', styles: { fontStyle: 'bold' } }, `${record.doctorName} (${record.doctorSpecialty})`],
      ],
      theme: 'plain',
    });

    const finalY = doc.lastAutoTable.finalY + 5;

    // Secciones del historial
    const sections = [
      { title: 'Evaluación Clínica', data: [
        { head: 'Motivo Principal', body: record.chiefComplaint },
        { head: 'Síntomas Reportados', body: record.symptoms },
        { head: 'Diagnóstico', body: record.diagnosis },
        { head: 'Plan de Tratamiento', body: record.treatmentPlan },
        { head: 'Notas Adicionales', body: record.notes },
      ]},
      { title: 'Signos Vitales', data: [
        { head: 'Presión Arterial', body: record.bloodPressure },
        { head: 'Temperatura', body: record.temperature ? `${record.temperature}°C` : null },
        { head: 'Ritmo Cardíaco', body: record.heartRate ? `${record.heartRate} bpm` : null },
        { head: 'Saturación O₂', body: record.oxygenSaturation ? `${record.oxygenSaturation}%` : null },
        { head: 'Peso / Altura', body: `${record.weightKg || 'N/A'} kg / ${record.heightCm || 'N/A'} cm`},
        { head: 'BMI', body: record.bmi ? record.bmi.toFixed(2) : null},
      ]},
      { title: 'Información Adicional', data: [
         { head: 'Alergias', body: record.allergies },
         { head: 'Requiere Seguimiento', body: record.followupRequired ? `Sí, para el ${formatDate(record.followupDate)}` : 'No' },
      ]}
    ];

    let currentY = finalY;
    sections.forEach(section => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(44, 62, 80);
      doc.text(section.title, 14, currentY);
      currentY += 7;

      const tableData = section.data.map(item => [item.head, item.body || 'No especificado']);
      autoTable(doc, {
        startY: currentY,
        head: [['Detalle', 'Información']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
        didDrawPage: (data) => {
            currentY = data.cursor.y;
        }
      });
      currentY = doc.lastAutoTable.finalY + 10;
    });

    const safeFilename = `Historial_Medico_${record.patientDocument}_${formatDate(record.recordDate, true)}.pdf`;
    doc.save(safeFilename);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{record.chiefComplaint || 'Consulta'}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Stethoscope className="w-4 h-4 mr-2" />
            <span>{record.doctorName || 'N/A'} &bull; {record.doctorSpecialty || 'N/A'}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(record.recordDate)}</span>
          </div>
          {record.severity && (
             <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                record.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                record.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                record.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
              {record.severityName}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Tratamiento</h4>
          <p className="text-gray-600 text-sm">{record.treatmentPlan || 'No especificado'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Notas</h4>
          <p className="text-gray-600 text-sm">{record.notes || 'Sin notas adicionales.'}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
        <button 
          onClick={onViewDetails}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          Ver Detalles
        </button>
        <button 
          onClick={handleExportPDF}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </button>
      </div>
    </div>
  );
};

export default MedicalRecordCard; 