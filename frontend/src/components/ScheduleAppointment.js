import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaUserMd, 
  FaHospital, 
  FaCalendarAlt, 
  FaClock,
  FaMapMarkerAlt,
  FaFileMedical,
  FaCheck,
  FaSearch,
  FaCreditCard,
  FaStar,
  FaStarHalfAlt,
  FaPhone
} from 'react-icons/fa';
import '../styles/ScheduleAppointment.css';
import { 
  fetchSpecialties, 
  fetchClinicsBySpecialty, 
  fetchDoctorsByClinicAndSpecialty,
  fetchExams,
  fetchInsurancePlans,
  fetchClinicsByExamAndInsurance,
  fetchAvailableTimeSlots
} from '../services/appointmentService';

const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [examsList, setExamsList] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    if (appointmentType === 'consulta') {
      fetchSpecialties().then(setSpecialties);
    } else if (appointmentType === 'exame') {
      fetchExams().then(setExamsList);
      fetchInsurancePlans().then(setInsurancePlans);
    }
  }, [appointmentType]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (appointmentType === 'consulta') {
      setFilteredSpecialties(
        specialties.filter(s => s.name.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    } else if (appointmentType === 'exame') {
      setFilteredExams(
        examsList.filter(e => e.name.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <h2>Escolha o Tipo de Agendamento</h2>
            <div className="appointment-type-options">
              <div 
                className={`type-option ${appointmentType === 'consulta' ? 'selected' : ''}`}
                onClick={() => setAppointmentType('consulta')}
              >
                <FaUserMd className="type-icon" />
                <span>Consulta</span>
                {appointmentType === 'consulta' && <FaCheck className="check-icon" />}
              </div>
              <div 
                className={`type-option ${appointmentType === 'exame' ? 'selected' : ''}`}
                onClick={() => setAppointmentType('exame')}
              >
                <FaFileMedical className="type-icon" />
                <span>Exame</span>
                {appointmentType === 'exame' && <FaCheck className="check-icon" />}
              </div>
            </div>
          </div>
        );
      case 2:
        if (appointmentType === 'consulta') {
          return (
            <div className="step-content">
              <h2>Buscar Especialidade</h2>
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Digite a especialidade desejada..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="specialty-list">
                {(searchTerm ? filteredSpecialties : specialties).map(specialty => (
                  <div 
                    key={specialty.id}
                    className="specialty-item"
                    onClick={() => {
                      setSelectedSpecialty(specialty.name);
                      fetchClinicsBySpecialty(specialty.name).then(setClinics);
                      setStep(3);
                    }}
                  >
                    {specialty.name}
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (appointmentType === 'exame') {
          return (
            <div className="step-content">
              <h2>Buscar Exame</h2>
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Digite o nome do exame..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="exam-list">
                {(searchTerm ? filteredExams : examsList).map(exam => (
                  <div 
                    key={exam.id}
                    className="exam-item"
                    onClick={() => {
                      setSelectedExam(exam.name);
                      setStep(3);
                    }}
                  >
                    {exam.name}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;
      case 3:
        if (appointmentType === 'consulta') {
          return (
            <div className="step-content">
              <h2>Clínicas Disponíveis</h2>
              <div className="clinic-list">
                {clinics.map(clinic => (
                  <div 
                    key={clinic.id}
                    className="clinic-item"
                    onClick={() => {
                      setSelectedClinic(clinic);
                      fetchDoctorsByClinicAndSpecialty(clinic.id, selectedSpecialty).then(setDoctors);
                      setStep(4);
                    }}
                  >
                    <h3>{clinic.name}</h3>
                    <p>{clinic.address}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (appointmentType === 'exame') {
          return (
            <div className="step-content">
              <h2>Plano de Saúde</h2>
              <p>Selecione seu plano de saúde para localizar clínicas que realizam o exame "{selectedExam}"</p>
              <div className="insurance-list">
                {insurancePlans.map(plan => (
                  <div 
                    key={plan.id}
                    className="insurance-item"
                    onClick={() => {
                      setSelectedInsurance(plan.name);
                      fetchClinicsByExamAndInsurance(selectedExam, plan.name).then(setClinics);
                      setStep(4);
                    }}
                  >
                    {plan.name}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;
      case 4:
        if (appointmentType === 'consulta') {
          return (
            <div className="step-content">
              <h2>Médicos Disponíveis</h2>
              <div className="doctor-list">
                {doctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    className="doctor-item"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setStep(5);
                    }}
                  >
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (appointmentType === 'exame') {
          return (
            <div className="step-content">
              <h2>Clínicas Disponíveis</h2>
              <p>Clínicas em Camaçari que realizam o exame "{selectedExam}" e aceitam o plano "{selectedInsurance}"</p>
              <div className="clinic-list">
                {clinics.map(clinic => (
                  <div 
                    key={clinic.id}
                    className="clinic-item"
                    onClick={() => {
                      setSelectedClinic(clinic);
                      setStep(5);
                    }}
                  >
                    <h3>{clinic.name}</h3>
                    <p><FaMapMarkerAlt /> {clinic.address}</p>
                    <p><FaPhone /> {clinic.phone}</p>
                    <p><FaClock /> {clinic.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;
      case 5:
        return (
          <div className="step-content">
            <h2>Escolha a Data</h2>
            <div className="date-list">
              {availableDates.map(date => (
                <div 
                  key={date}
                  className="date-item"
                  onClick={() => {
                    setSelectedDate(date);
                    fetchAvailableTimeSlots(date, selectedDoctor?.id, selectedClinic?.id).then(setAvailableTimes);
                    setStep(6);
                  }}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-content">
            <h2>Escolha o Horário</h2>
            <div className="time-list">
              {availableTimes.map(time => (
                <div 
                  key={time}
                  className="time-item"
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(7);
                  }}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="step-content">
            <h2>Confirmação</h2>
            <p>Tipo: {appointmentType === 'consulta' ? 'Consulta' : 'Exame'}</p>
            <p>Especialidade/Exame: {appointmentType === 'consulta' ? selectedSpecialty : selectedExam}</p>
            <p>Clínica: {selectedClinic?.name}</p>
            <p>Médico: {selectedDoctor?.name}</p>
            <p>Data: {selectedDate}</p>
            <p>Horário: {selectedTime}</p>
            <button onClick={() => navigate('/confirmation')}>Confirmar</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="schedule-appointment-container">
      <div className="schedule-header">
        <button onClick={() => setStep(step - 1)} disabled={step === 1}>
          <FaArrowLeft />
        </button>
        <h1>Agendar {appointmentType === 'consulta' ? 'Consulta' : 'Exame'}</h1>
      </div>
      <div className="schedule-content">{renderStepContent()}</div>
    </div>
  );
};

export default ScheduleAppointment;
