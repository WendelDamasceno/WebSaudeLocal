/**
 * Mock service to simulate API calls for appointment scheduling
 * This can be replaced with actual API calls when the backend is ready
 */

// Fetch all available medical specialties
export const fetchSpecialties = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, name: 'Cardiologia', icon: 'heart' },
    { id: 2, name: 'Dermatologia', icon: 'user' },
    { id: 3, name: 'Clínico Geral', icon: 'stethoscope' },
    { id: 4, name: 'Pediatria', icon: 'baby' },
    { id: 5, name: 'Ortopedia', icon: 'bone' },
    { id: 6, name: 'Oftalmologia', icon: 'eye' },
    { id: 7, name: 'Ginecologia', icon: 'venus' },
    { id: 8, name: 'Urologia', icon: 'mars' },
    { id: 9, name: 'Neurologia', icon: 'brain' },
    { id: 10, name: 'Psiquiatria', icon: 'brain' },
    { id: 11, name: 'Endocrinologia', icon: 'weight' },
    { id: 12, name: 'Otorrinolaringologia', icon: 'ear' }
  ];
};

// Fetch clinics by specialty in Camaçari
export const fetchClinicsBySpecialty = async (specialtyName) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const allClinics = [
    {
      id: 1,
      name: 'Clínica Saúde Total',
      address: 'Av. Jorge Amado, 780 - Centro, Camaçari - BA',
      phone: '(71) 3333-1111',
      hours: 'Seg - Sex: 08:00 - 18:00, Sáb: 08:00 - 12:00',
      specialties: ['Cardiologia', 'Clínico Geral', 'Dermatologia', 'Oftalmologia'],
      acceptedInsurances: ['Bradesco Saúde', 'Sul América Saúde', 'Golden Cross', 'Particular'],
      rating: 4.7,
      reviewCount: 128,
      distance: '1.8 km',
      image: 'https://source.unsplash.com/random/300x200/?clinic,1'
    },
    {
      id: 2,
      name: 'Centro Médico Camaçari',
      address: 'Rua Duque de Caxias, 450 - Centro, Camaçari - BA',
      phone: '(71) 3333-2222',
      hours: 'Seg - Sex: 07:00 - 19:00, Sáb: 08:00 - 13:00',
      specialties: ['Cardiologia', 'Ginecologia', 'Pediatria', 'Ortopedia', 'Psiquiatria', 'Dermatologia'],
      acceptedInsurances: ['Bradesco Saúde', 'Hapvida', 'Amil', 'SUS', 'Particular'],
      rating: 4.5,
      reviewCount: 310,
      distance: '2.2 km',
      image: 'https://source.unsplash.com/random/300x200/?clinic,2'
    },
    {
      id: 3,
      name: 'Hospital Geral de Camaçari',
      address: 'Av. Radial A, s/n - PHOC, Camaçari - BA',
      phone: '(71) 3333-3333',
      hours: '24 horas',
      specialties: ['Cardiologia', 'Clínico Geral', 'Neurologia', 'Ortopedia', 'Urologia'],
      acceptedInsurances: ['SUS', 'Bradesco Saúde', 'Amil'],
      rating: 4.2,
      reviewCount: 520,
      distance: '3.5 km',
      image: 'https://source.unsplash.com/random/300x200/?hospital,1'
    },
    {
      id: 4,
      name: 'Policlínica Camaçari',
      address: 'R. do Contorno, 570 - Centro, Camaçari - BA',
      phone: '(71) 3333-4444',
      hours: 'Seg - Sex: 07:30 - 18:00',
      specialties: ['Endocrinologia', 'Otorrinolaringologia', 'Ginecologia', 'Dermatologia', 'Clínico Geral'],
      acceptedInsurances: ['Amil', 'Hapvida', 'Sul América Saúde', 'Particular'],
      rating: 4.4,
      reviewCount: 167,
      distance: '2.1 km',
      image: 'https://source.unsplash.com/random/300x200/?clinic,3'
    },
    {
      id: 5,
      name: 'Clínica da Família',
      address: 'Av. Comercial, 1230 - Centro, Camaçari - BA',
      phone: '(71) 3333-5555',
      hours: 'Seg - Sex: 08:00 - 17:00',
      specialties: ['Clínico Geral', 'Pediatria', 'Ginecologia', 'Cardiologia'],
      acceptedInsurances: ['SUS'],
      rating: 4.0,
      reviewCount: 412,
      distance: '1.5 km',
      image: 'https://source.unsplash.com/random/300x200/?clinic,4'
    }
  ];
  
  return allClinics.filter(clinic => 
    clinic.specialties.includes(specialtyName)
  );
};

// Fetch doctors by clinic and specialty
export const fetchDoctorsByClinicAndSpecialty = async (clinicId, specialtyName) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const allDoctors = [
    { 
      id: 1, 
      name: 'Dra. Maria Santos', 
      specialty: 'Cardiologia', 
      clinicId: 1, 
      photo: null,
      rating: 4.8,
      reviewCount: 47,
      education: 'Universidade Federal da Bahia',
      experience: '15 anos de experiência'
    },
    { 
      id: 2, 
      name: 'Dr. João Silva', 
      specialty: 'Clínico Geral', 
      clinicId: 1, 
      photo: null,
      rating: 4.5,
      reviewCount: 32,
      education: 'Universidade Estadual da Bahia',
      experience: '8 anos de experiência'
    },
    { 
      id: 3, 
      name: 'Dra. Ana Oliveira', 
      specialty: 'Dermatologia', 
      clinicId: 1, 
      photo: null,
      rating: 4.9,
      reviewCount: 56,
      education: 'Universidade de São Paulo',
      experience: '12 anos de experiência'
    },
    { 
      id: 4, 
      name: 'Dr. Pedro Almeida', 
      specialty: 'Cardiologia', 
      clinicId: 2, 
      photo: null,
      rating: 4.7,
      reviewCount: 39,
      education: 'Universidade Federal de Pernambuco',
      experience: '10 anos de experiência'
    },
    { 
      id: 5, 
      name: 'Dra. Camila Rocha', 
      specialty: 'Ginecologia', 
      clinicId: 2, 
      photo: null,
      rating: 4.9,
      reviewCount: 78,
      education: 'Universidade de Brasília',
      experience: '14 anos de experiência'
    },
    { 
      id: 6, 
      name: 'Dr. Roberto Mendes', 
      specialty: 'Cardiologia', 
      clinicId: 3, 
      photo: null,
      rating: 4.6,
      reviewCount: 43,
      education: 'Universidade Federal do Rio de Janeiro',
      experience: '18 anos de experiência'
    },
    { 
      id: 7, 
      name: 'Dra. Juliana Costa', 
      specialty: 'Oftalmologia', 
      clinicId: 1, 
      photo: null,
      rating: 4.8,
      reviewCount: 51,
      education: 'Universidade Federal da Bahia',
      experience: '9 anos de experiência'
    }
  ];
  
  return allDoctors.filter(
    doctor => doctor.clinicId === clinicId && doctor.specialty === specialtyName
  );
};

// Fetch all available exams
export const fetchExams = async (query = '') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allExams = [
    { id: 1, name: 'Hemograma completo', category: 'Sangue' },
    { id: 2, name: 'Glicemia', category: 'Sangue' },
    { id: 3, name: 'Colesterol total e frações', category: 'Sangue' },
    { id: 4, name: 'Ureia e creatinina', category: 'Sangue' },
    { id: 5, name: 'TSH e T4', category: 'Sangue' },
    { id: 6, name: 'Ácido úrico', category: 'Sangue' },
    { id: 7, name: 'Transaminases (TGO/AST e TGP/ALT)', category: 'Sangue' },
    { id: 8, name: 'Exame de urina (EAS)', category: 'Urina' },
    { id: 9, name: 'Exame de fezes', category: 'Fezes' },
    { id: 10, name: 'Radiografia (raio-X)', category: 'Imagem' },
    { id: 11, name: 'Ultrassonografia', category: 'Imagem' },
    { id: 12, name: 'Tomografia computadorizada (TC)', category: 'Imagem' },
    { id: 13, name: 'Ressonância magnética (RM)', category: 'Imagem' },
    { id: 14, name: 'Mamografia', category: 'Imagem' },
    { id: 15, name: 'Eletrocardiograma (ECG)', category: 'Cardiologia' },
    { id: 16, name: 'Teste ergométrico', category: 'Cardiologia' },
    { id: 17, name: 'Endoscopia', category: 'Procedimento' },
    { id: 18, name: 'Colonoscopia', category: 'Procedimento' },
    { id: 19, name: 'Papanicolau', category: 'Ginecologia' }
  ];
  
  // If query is empty, return first 5 items as suggestions
  if (!query) {
    return allExams.slice(0, 5);
  }
  
  // Filter exams by query
  return allExams.filter(exam => 
    exam.name.toLowerCase().includes(query.toLowerCase()) ||
    exam.category.toLowerCase().includes(query.toLowerCase())
  );
};

// Fetch insurance plans
export const fetchInsurancePlans = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    { id: 1, name: 'Bradesco Saúde', logo: null },
    { id: 2, name: 'Hapvida', logo: null },
    { id: 3, name: 'Sul América Saúde', logo: null },
    { id: 4, name: 'Amil', logo: null },
    { id: 5, name: 'Golden Cross', logo: null },
    { id: 6, name: 'NotreDame Intermédica', logo: null },
    { id: 7, name: 'Ameplan Saúde', logo: null },
    { id: 8, name: 'SUS', logo: null },
    { id: 9, name: 'Particular', logo: null }
  ];
};

// Fetch clinics by exam and insurance in Camaçari
export const fetchClinicsByExamAndInsurance = async (examName, insuranceName) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const allClinics = [
    { 
      id: 1, 
      name: 'Hospital Geral de Camaçari', 
      address: 'Av. Radial A, s/n - PHOC III - Camaçari, BA', 
      phone: '(71) 3333-3333',
      hours: '24 horas',
      distance: '1.8 km',
      acceptedInsurances: ['SUS', 'Bradesco Saúde', 'Amil'],
      availableExams: ['Hemograma completo', 'Glicemia', 'Radiografia (raio-X)', 'Eletrocardiograma (ECG)'],
      rating: 4.2,
      reviewCount: 89,
      image: 'https://source.unsplash.com/random/300x200/?hospital,1'
    },
    { 
      id: 2, 
      name: 'Clínica IATI Camaçari', 
      address: 'Av. Radial B, 184 - Centro, Camaçari - BA', 
      phone: '(71) 3333-6666',
      hours: 'Seg - Sex: 07:00 - 18:00, Sáb: 07:00 - 12:00',
      distance: '2.3 km',
      acceptedInsurances: ['Hapvida', 'Sul América Saúde', 'Bradesco Saúde', 'Particular'],
      availableExams: ['Hemograma completo', 'Colesterol total e frações', 'Ultrassonografia', 'Mamografia'],
      rating: 4.6,
      reviewCount: 124,
      image: 'https://source.unsplash.com/random/300x200/?clinic,5'
    },
    { 
      id: 3, 
      name: 'SESI Camaçari', 
      address: 'R. do Migrante, s/n - Centro, Camaçari - BA', 
      phone: '(71) 3333-7777',
      hours: 'Seg - Sex: 08:00 - 17:00',
      distance: '3.1 km',
      acceptedInsurances: ['NotreDame Intermédica', 'SUS', 'Particular'],
      availableExams: ['Hemograma completo', 'TSH e T4', 'Audiometria', 'Exame de vista'],
      rating: 4.3,
      reviewCount: 67,
      image: 'https://source.unsplash.com/random/300x200/?clinic,6'
    },
    { 
      id: 4, 
      name: 'Laboratório Alpha Camaçari', 
      address: 'Av. Getúlio Vargas, 35 - Centro, Camaçari - BA', 
      phone: '(71) 3333-8888',
      hours: 'Seg - Sex: 06:00 - 16:00, Sáb: 06:00 - 11:00',
      distance: '2.5 km',
      acceptedInsurances: ['Ameplan Saúde', 'Bradesco Saúde', 'Hapvida', 'SUS', 'Particular'],
      availableExams: ['Hemograma completo', 'Glicemia', 'Papanicolau', 'Exame de urina (EAS)'],
      rating: 4.8,
      reviewCount: 212,
      image: 'https://source.unsplash.com/random/300x200/?laboratory,1'
    },
    { 
      id: 5, 
      name: 'Centro Diagnóstico de Camaçari', 
      address: 'R. Francisco Drumond, 238 - Centro, Camaçari - BA', 
      phone: '(71) 3333-9999',
      hours: 'Seg - Sex: 07:00 - 19:00, Sáb: 08:00 - 13:00',
      distance: '1.9 km',
      acceptedInsurances: ['Amil', 'Golden Cross', 'Particular'],
      availableExams: ['Tomografia computadorizada (TC)', 'Ressonância magnética (RM)', 'Ultrassonografia'],
      rating: 4.5,
      reviewCount: 156,
      image: 'https://source.unsplash.com/random/300x200/?diagnostic,1'
    }
  ];
  
  // Filter clinics that accept the insurance and have the exam
  return allClinics.filter(clinic => 
    clinic.acceptedInsurances.includes(insuranceName) && 
    clinic.availableExams.includes(examName)
  );
};

// Fetch available time slots for a specific date, doctor/clinic
export const fetchAvailableTimeSlots = async (date, doctorId = null, clinicId = null) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate some random time slots
  const timeSlots = [];
  const startHour = 8;
  const endHour = 17;
  
  // Create a date object for the selected date
  const selectedDate = new Date(date);
  
  // Randomly make some time slots unavailable
  for (let hour = startHour; hour <= endHour; hour++) {
    // Morning slots (on the hour and half past)
    if (Math.random() > 0.3) { // 70% chance of availability
      timeSlots.push({
        time: `${hour}:00`,
        available: true
      });
    }
    
    if (hour < endHour && Math.random() > 0.3) { // 70% chance of availability
      timeSlots.push({
        time: `${hour}:30`,
        available: true
      });
    }
  }
  
  // Sort by time
  return timeSlots.sort((a, b) => {
    const [aHour, aMinute] = a.time.split(':').map(Number);
    const [bHour, bMinute] = b.time.split(':').map(Number);
    
    if (aHour !== bHour) {
      return aHour - bHour;
    }
    return aMinute - bMinute;
  });
};

// Make a simulated API call to book an appointment
export const bookAppointment = async (appointmentData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate successful booking (in a real app, this would send data to a server)
  return {
    success: true,
    appointmentId: Math.floor(Math.random() * 1000000),
    ...appointmentData
  };
};

// Add rating functionality
export const submitReview = async (doctorId, rating, comment) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    message: 'Avaliação enviada com sucesso'
  };
};

// Add clinic details fetch
export const fetchClinicDetails = async (clinicId) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: clinicId,
    name: 'Clínica Exemplo',
    address: 'Rua Exemplo, 123 - Camaçari, BA',
    phone: '(71) 1234-5678',
    hours: 'Seg-Sex: 8h-18h',
    specialties: ['Cardiologia', 'Dermatologia'],
    insurancePlans: ['Plano A', 'Plano B'],
    rating: 4.5,
    reviews: [
      { id: 1, rating: 5, comment: 'Ótimo atendimento', date: '2024-03-01' }
    ]
  };
};
