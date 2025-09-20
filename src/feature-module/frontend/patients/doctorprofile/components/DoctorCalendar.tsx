import React, { useState } from 'react';
import { Calendar, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import './DoctorCalendar.css';

interface DoctorCalendarProps {
  doctorId?: string;
  doctorName?: string;
  doctorData?: any;
}

const DoctorCalendar: React.FC<DoctorCalendarProps> = ({ doctorId, doctorName, doctorData }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const onDateSelect = (value: any) => {
    console.log('Date selected:', value.format('YYYY-MM-DD'));
    setSelectedDate(value.format('YYYY-MM-DD'));
  };


  const handleBookAppointment = () => {
    if (selectedDate) {
      // Use doctorData if available, otherwise fallback to individual props
      const bookingDoctorData = doctorData ? {
        ...doctorData,
        selectedDate
      } : {
        id: doctorId || '1',
        name: doctorName || 'Loading...',
        specialty: 'Dentist',
        department: 'BDS, MDS - Oral & Maxillofacial Surgery',
        rating: 4.0,
        totalReviews: 35,
        image: 'assets/img/doctor-grid/doc3.png',
        location: 'Lake Chapala',
        servicesOffered: [],
        selectedDate
      };
      
      // Navigate to booking page with selected doctor and date info
      navigate('/booking', {
        state: {
          selectedDoctor: bookingDoctorData
        }
      });
    }
  };

  return (
    <div className="doc-info-right">
      <div className="calendar-section">
        {/* Calendar Section */}
        <div className="calendar-container mb-3">
          <h5 className="section-title">
            <i className="fas fa-calendar-alt me-2"></i>
            Book Appointment
          </h5>
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onSelect={onDateSelect} />
          </div>
        </div>

        {/* Selected Info Display */}
        {selectedDate && (
          <div className="selected-info mb-3">
            <div className="selected-display">
              <i className="fas fa-check-circle me-2"></i>
              <div className="selected-details">
                <small className="selected-label">Selected Date</small>
                <div className="selected-text">{selectedDate}</div>
              </div>
            </div>
          </div>
        )}

        {/* Book Appointment Button */}
        <div className="booking-action">
          <button
            onClick={handleBookAppointment}
            disabled={!selectedDate}
            className="btn btn-primary w-100 booking-btn"
          >
            <i className="fas fa-calendar-check me-2"></i>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCalendar;
