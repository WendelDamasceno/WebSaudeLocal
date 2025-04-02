import axios from 'axios';
import searchHealthFacilities from './googlePlacesService';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Função para lidar com erros de maneira consistente
const handleApiError = (error) => {
  if (error.response) {
    // Erro da resposta do servidor (4xx, 5xx)
    console.error('API Error Response:', error.response.data);
    return { 
      error: true, 
      message: error.response.data.message || 'Erro no servidor', 
      status: error.response.status 
    };
  } else if (error.request) {
    // Sem resposta do servidor
    console.error('API No Response:', error.request);
    return { 
      error: true, 
      message: 'Não foi possível conectar ao servidor', 
      status: 0 
    };
  } else {
    // Outro tipo de erro
    console.error('API Request Error:', error.message);
    return { 
      error: true, 
      message: 'Erro ao fazer requisição', 
      status: 0 
    };
  }
};

// API para hospitais e clínicas em Camaçari
export const fetchHealthFacilities = async (filters = {}) => {
  try {
    const response = await api.get('/health-facilities', { params: filters });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// API para buscar hospitais específicos - Modificada para usar Google Places API
export const fetchHospitals = async (location = 'Camaçari, BA', query = '') => {
  try {
    // Em produção, usar a API do Google Places
    if (process.env.NODE_ENV !== 'development') {
      const data = await searchHealthFacilities(location, 5000);
      
      // Filtrar por termo de busca se necessário
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        return data.filter(item => 
          item.name.toLowerCase().includes(lowercaseQuery) || 
          item.address.toLowerCase().includes(lowercaseQuery) ||
          item.type.toLowerCase().includes(lowercaseQuery)
        );
      }
      
      return data;
    }
    
    // No ambiente de desenvolvimento, continuamos com os dados mockados
    console.log(`Fetching hospitals for ${location} with query: "${query}"`);
    
    // Em desenvolvimento, retornar dados mocados
    if (process.env.NODE_ENV === 'development') {
      // Simular tempo de resposta da API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Array de hospitais mocados
      const mockedHospitals = [
        {
          id: 1,
          name: 'Hospital Geral de Camaçari',
          type: 'Hospital',
          address: 'Rua Francisco Drumond, s/n - Centro, Camaçari - BA',
          phone: '(71) 3621-3050',
          rating: 4.2,
          distance: '2.3',
          waitTime: '35 min',
          hasEmergency: true,
          acceptsHealthInsurance: true,
          isPublic: true // Marcando como hospital público
        },
        {
          id: 2,
          name: 'UPA Camaçari',
          type: 'Emergência',
          address: 'Av. Leste, s/n - Centro, Camaçari - BA',
          phone: '(71) 3622-7389',
          rating: 3.8,
          distance: '1.8',
          waitTime: '50 min',
          hasEmergency: true,
          acceptsHealthInsurance: false, // Não mostra convênio para UPA
          isPublic: true // Marcando como unidade pública
        },
        {
          id: 3,
          name: 'Clínica Santa Clara',
          type: 'Clínica',
          address: 'Rua da Bandeira, 240 - Centro, Camaçari - BA',
          phone: '(71) 3621-8762',
          rating: 4.5,
          distance: '3.1',
          waitTime: '15 min',
          hasEmergency: false,
          acceptsHealthInsurance: true,
          isPublic: false // Não é pública
        },
        {
          id: 4,
          name: 'Centro Médico de Camaçari',
          type: 'Clínica',
          address: 'Av. Principal, 783 - Centro, Camaçari - BA',
          phone: '(71) 3624-9080',
          rating: 4.0,
          distance: '2.7',
          waitTime: '25 min',
          hasEmergency: false,
          acceptsHealthInsurance: true,
          isPublic: false // Não é pública
        },
        {
          id: 5,
          name: 'Hospital Regional de Camaçari',
          type: 'Hospital',
          address: 'Rua da Saúde, 123 - Ponto Certo, Camaçari - BA',
          phone: '(71) 3625-7700',
          rating: 4.4,
          distance: '4.5',
          waitTime: '30 min',
          hasEmergency: true,
          acceptsHealthInsurance: true,
          isPublic: true // Marcando como hospital público
        }
      ];

      // Filtrar resultados se houver uma query
      if (query) {
        console.log("Filtering with query:", query);
        const lowercaseQuery = query.toLowerCase();
        const filtered = mockedHospitals.filter(hospital => 
          hospital.name.toLowerCase().includes(lowercaseQuery) || 
          hospital.address.toLowerCase().includes(lowercaseQuery) ||
          hospital.type.toLowerCase().includes(lowercaseQuery)
        );
        console.log("Filtered results:", filtered);
        return filtered;
      }
      
      return mockedHospitals;
    }
  } catch (error) {
    return handleApiError(error);
  }
};

// API para buscar detalhes de um hospital específico
export const fetchHospitalDetail = async (id) => {
  try {
    // Em desenvolvimento, retornar dados mockados
    if (process.env.NODE_ENV === 'development') {
      // Simular tempo de resposta da API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simular detalhes de hospitais
      const mockedHospitalDetails = {
        1: {
          id: 1,
          name: 'Hospital Geral de Camaçari',
          type: 'Hospital',
          address: 'Rua Francisco Drumond, s/n - Centro, Camaçari - BA',
          phone: '(71) 3621-3050',
          rating: 4.2,
          reviewCount: 156,
          distance: '2.3',
          waitTime: '35 min',
          hasEmergency: true,
          acceptsHealthInsurance: true,
          isPublic: true,
          occupancyStatus: 'high', // low, medium, high, critical
          operatingHours: [
            'Segunda a Sexta: 24 horas',
            'Sábados e Domingos: 24 horas',
            'Feriados: 24 horas'
          ],
          hasParking: true,
          parkingDetails: 'Estacionamento gratuito para pacientes e visitantes',
          specialties: [
            'Clínica Médica',
            'Pediatria',
            'Ortopedia',
            'Cardiologia',
            'Neurologia',
            'Ginecologia',
            'Obstetrícia',
            'Cirurgia Geral'
          ],
          acceptedInsurance: [],
          ratingBreakdown: [
            { stars: 5, percentage: 35 },
            { stars: 4, percentage: 40 },
            { stars: 3, percentage: 15 },
            { stars: 2, percentage: 7 },
            { stars: 1, percentage: 3 }
          ],
          reviews: [
            {
              id: 101,
              userName: 'Maria Silva',
              rating: 5,
              date: '12/03/2024',
              comment: 'Excelente atendimento na emergência, equipe muito preparada e atenciosa.'
            },
            {
              id: 102,
              userName: 'João Ferreira',
              rating: 4,
              date: '28/02/2024',
              comment: 'Bom hospital, mas o tempo de espera poderia ser menor. Equipe médica muito competente.'
            },
            {
              id: 103,
              userName: 'Ana Souza',
              rating: 3,
              date: '15/02/2024',
              comment: 'Atendimento razoável. Instalações precisam de melhorias, mas os médicos são bons.'
            }
          ]
        },
        2: {
          id: 2,
          name: 'UPA Camaçari',
          type: 'Emergência',
          address: 'Av. Leste, s/n - Centro, Camaçari - BA',
          phone: '(71) 3622-7389',
          rating: 3.8,
          reviewCount: 93,
          distance: '1.8',
          waitTime: '50 min',
          hasEmergency: true,
          acceptsHealthInsurance: false,
          isPublic: true,
          occupancyStatus: 'critical',
          operatingHours: [
            'Segunda a Domingo: 24 horas'
          ],
          hasParking: true,
          parkingDetails: 'Estacionamento gratuito com vagas limitadas',
          specialties: [
            'Clínica Médica',
            'Pediatria',
            'Ortopedia'
          ],
          acceptedInsurance: [],
          ratingBreakdown: [
            { stars: 5, percentage: 25 },
            { stars: 4, percentage: 35 },
            { stars: 3, percentage: 25 },
            { stars: 2, percentage: 10 },
            { stars: 1, percentage: 5 }
          ],
          reviews: [
            {
              id: 201,
              userName: 'Carlos Santos',
              rating: 4,
              date: '05/03/2024',
              comment: 'Atendimento rápido considerando ser uma UPA. Médicos atenciosos.'
            },
            {
              id: 202,
              userName: 'Patrícia Oliveira',
              rating: 2,
              date: '20/02/2024',
              comment: 'Muito tempo de espera e poucos médicos disponíveis. Estrutura boa.'
            }
          ]
        },
        3: {
          id: 3,
          name: 'Clínica Santa Clara',
          type: 'Clínica',
          address: 'Rua da Bandeira, 240 - Centro, Camaçari - BA',
          phone: '(71) 3621-8762',
          rating: 4.5,
          reviewCount: 87,
          distance: '3.1',
          waitTime: '15 min',
          hasEmergency: false,
          acceptsHealthInsurance: true,
          isPublic: false,
          occupancyStatus: 'low',
          operatingHours: [
            'Segunda a Sexta: 08:00 às 18:00',
            'Sábados: 08:00 às 12:00',
            'Domingos e Feriados: Fechado'
          ],
          hasParking: true,
          parkingDetails: 'Estacionamento pago para pacientes',
          specialties: [
            'Clínica Médica',
            'Dermatologia',
            'Endocrinologia',
            'Cardiologia',
            'Ginecologia',
            'Nutrição',
            'Psicologia'
          ],
          acceptedInsurance: [
            'Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Hapvida'
          ],
          ratingBreakdown: [
            { stars: 5, percentage: 60 },
            { stars: 4, percentage: 30 },
            { stars: 3, percentage: 5 },
            { stars: 2, percentage: 3 },
            { stars: 1, percentage: 2 }
          ],
          reviews: [
            {
              id: 301,
              userName: 'Roberto Almeida',
              rating: 5,
              date: '10/03/2024',
              comment: 'Excelente clínica! Atendimento pontual e equipe muito profissional. Recomendo!'
            },
            {
              id: 302,
              userName: 'Juliana Costa',
              rating: 5,
              date: '01/03/2024',
              comment: 'Ambiente limpo e organizado. Médicos competentes e atendimento rápido.'
            }
          ]
        },
        4: {
          id: 4,
          name: 'Centro Médico de Camaçari',
          type: 'Clínica',
          address: 'Av. Principal, 783 - Centro, Camaçari - BA',
          phone: '(71) 3624-9080',
          rating: 4.0,
          reviewCount: 64,
          distance: '2.7',
          waitTime: '25 min',
          hasEmergency: false,
          acceptsHealthInsurance: true,
          isPublic: false,
          occupancyStatus: 'medium',
          operatingHours: [
            'Segunda a Sexta: 07:00 às 19:00',
            'Sábados: 07:00 às 13:00',
            'Domingos e Feriados: Fechado'
          ],
          hasParking: false,
          parkingDetails: '',
          specialties: [
            'Clínica Médica',
            'Ortopedia',
            'Oftalmologia',
            'Otorrinolaringologia',
            'Urologia',
            'Neurologia'
          ],
          acceptedInsurance: [
            'Unimed', 'Bradesco Saúde', 'NotreDame Intermédica', 'Amil'
          ],
          ratingBreakdown: [
            { stars: 5, percentage: 30 },
            { stars: 4, percentage: 45 },
            { stars: 3, percentage: 15 },
            { stars: 2, percentage: 7 },
            { stars: 1, percentage: 3 }
          ],
          reviews: [
            {
              id: 401,
              userName: 'Fernando Gomes',
              rating: 4,
              date: '08/03/2024',
              comment: 'Bom atendimento e preços acessíveis. Recomendo principalmente para exames.'
            },
            {
              id: 402,
              userName: 'Luciana Martins',
              rating: 3,
              date: '20/02/2024',
              comment: 'Atendimento demorado, mas os médicos são bons. Falta estacionamento.'
            }
          ]
        },
        5: {
          id: 5,
          name: 'Hospital Regional de Camaçari',
          type: 'Hospital',
          address: 'Rua da Saúde, 123 - Ponto Certo, Camaçari - BA',
          phone: '(71) 3625-7700',
          rating: 4.4,
          reviewCount: 201,
          distance: '4.5',
          waitTime: '30 min',
          hasEmergency: true,
          acceptsHealthInsurance: true,
          isPublic: true,
          occupancyStatus: 'medium',
          operatingHours: [
            'Segunda a Domingo: 24 horas'
          ],
          hasParking: true,
          parkingDetails: 'Estacionamento gratuito para pacientes e acompanhantes',
          specialties: [
            'Clínica Médica',
            'Pediatria',
            'Cirurgia Geral',
            'Obstetrícia',
            'Ortopedia',
            'Traumatologia',
            'Cardiologia',
            'Neurologia',
            'Psiquiatria',
            'Oncologia'
          ],
          acceptedInsurance: [],
          ratingBreakdown: [
            { stars: 5, percentage: 50 },
            { stars: 4, percentage: 30 },
            { stars: 3, percentage: 15 },
            { stars: 2, percentage: 3 },
            { stars: 1, percentage: 2 }
          ],
          reviews: [
            {
              id: 501,
              userName: 'Marcos Pereira',
              rating: 5,
              date: '15/03/2024',
              comment: 'Excelente hospital. Fui muito bem atendido na emergência. Equipe médica de primeira.'
            },
            {
              id: 502,
              userName: 'Daniela Ribeiro',
              rating: 4,
              date: '05/03/2024',
              comment: 'Bom hospital público, com boa estrutura e profissionais capacitados. Apenas o tempo de espera que é um pouco longo.'
            },
            {
              id: 503,
              userName: 'Paulo Henrique',
              rating: 5,
              date: '28/02/2024',
              comment: 'Minha esposa teve nosso filho neste hospital e o atendimento foi excelente. Recomendo!'
            }
          ]
        }
      };
      
      // Verificar se o hospital existe
      if (mockedHospitalDetails[id]) {
        return mockedHospitalDetails[id];
      } else {
        throw new Error('Hospital não encontrado');
      }
    }

    // Código para API real
    const response = await api.get(`/hospitals/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Determinar tipo do estabelecimento com base nas informações disponíveis
// eslint-disable-next-line no-unused-vars
const determineType = (place) => {
  const types = place.types || [];
  if (types.includes('hospital')) {
    return 'Hospital';
  } else if (types.includes('clinic')) {
    return 'Clínica';
  } else if (types.includes('emergency')) {
    return 'Emergência';
  }
  return 'Outro';
};

// Tentar determinar se tem emergência
// eslint-disable-next-line no-unused-vars
const determineIfEmergency = (place) => {
  const name = place.name.toLowerCase();
  return name.includes('emergência') || 
         name.includes('emergencia') || 
         name.includes('pronto socorro') || 
         name.includes('upa') || 
         name.includes('24h');
};

// Tentar determinar se é um hospital público
// eslint-disable-next-line no-unused-vars
const determineIfPublic = (place) => {
  const name = place.name.toLowerCase();
  // eslint-disable-next-line no-unused-vars
  const types = place.types || [];
  
  return name.includes('sus') || 
         name.includes('upa') || 
         name.includes('público') || 
         name.includes('publico') || 
         name.includes('municipal') ||
         name.includes('estadual') ||
         name.includes('federal') ||
         name.includes('pronto socorro');
};

// API para busca de clínicas
export const fetchClinics = async (location, query = '') => {
  try {
    // Em desenvolvimento, retornar dados mocados filtrados do fetchHospitals
    if (process.env.NODE_ENV === 'development') {
      const allFacilities = await fetchHospitals(location);
      return allFacilities.filter(facility => facility.type === 'Clínica');
    }

    // Código para API real
    const response = await api.get('/clinics', { 
      params: { location, query } 
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Login e autenticação
export const loginUser = async (credentials) => {
  try {
    // Em desenvolvimento, simular login bem-sucedido
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simular token JWT
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxOTk0ODcyMH0';
      localStorage.setItem('auth_token', token);
      
      return { 
        success: true, 
        user: { 
          id: 1, 
          name: 'João Silva', 
          email: credentials.email 
        } 
      };
    }

    // Código para API real
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// API para buscar medicamentos
export const searchMedicine = async (query = '') => {
  try {
    // Em desenvolvimento, retornar dados mocados
    if (process.env.NODE_ENV === 'development') {
      // Simular tempo de resposta da API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Array de medicamentos mocados
      const mockedMedicines = [
        {
          id: 1,
          name: 'Dipirona 500mg',
          pharmacy: 'Farmácia Popular',
          price: '5,90',
          available: true
        },
        {
          id: 2,
          name: 'Paracetamol 750mg',
          pharmacy: 'Drogasil',
          price: '8,50',
          available: true
        },
        {
          id: 3,
          name: 'Amoxicilina 500mg',
          pharmacy: 'Pague Menos',
          price: '25,90',
          available: true
        },
        {
          id: 4,
          name: 'Omeprazol 20mg',
          pharmacy: 'Farmácia São Paulo',
          price: '15,20',
          available: false
        }
      ];

      // Filtrar resultados se houver uma query
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        return mockedMedicines.filter(medicine => 
          medicine.name.toLowerCase().includes(lowercaseQuery) || 
          medicine.pharmacy.toLowerCase().includes(lowercaseQuery)
        );
      }
      
      return mockedMedicines;
    }

    // Código para API real
    const response = await api.get('/medicines', { 
      params: { query } 
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// API para buscar médicos - Aprimorada com mais dados para melhor exibição
export const fetchDoctors = async (specialty = '') => {
  try {
    // Em desenvolvimento, retornar dados mocados
    if (process.env.NODE_ENV === 'development') {
      // Simular tempo de resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Array de médicos mocados mais detalhados
      const mockedDoctors = [
        {
          id: 1,
          name: 'Dra. Maria Silva',
          specialty: 'Clínico Geral',
          rating: 4.8,
          available: true,
          nextAvailable: 'Hoje às 14:30',
          phone: '(71) 98765-4321',
          location: 'Clínica Central - Rua Principal, 250',
          distance: '1.2',
          insurances: ['Unimed', 'Bradesco Saúde', 'SulAmérica'],
          about: 'Especialista em medicina preventiva e cuidados primários com mais de 10 anos de experiência.',
          education: 'Formada pela UFBA com residência no Hospital das Clínicas'
        },
        {
          id: 2,
          name: 'Dr. João Santos',
          specialty: 'Cardiologista',
          rating: 4.9,
          available: false,
          nextAvailable: 'Amanhã às 10:00',
          phone: '(71) 98765-4322',
          location: 'Hospital São Lucas - Av. Principal, 1500',
          distance: '3.5',
          insurances: ['Unimed', 'SulAmérica'],
          about: 'Cardiologista com foco em prevenção de doenças cardíacas e tratamentos não-invasivos.',
          education: 'Especializado pelo Instituto do Coração (InCor)'
        },
        {
          id: 3,
          name: 'Dra. Ana Oliveira',
          specialty: 'Pediatra',
          rating: 4.7,
          available: true,
          nextAvailable: 'Hoje às 15:45',
          phone: '(71) 98765-4323',
          location: 'Clínica Infantil - Rua das Flores, 123',
          distance: '0.8',
          insurances: ['Unimed', 'Bradesco Saúde', 'Amil'],
          about: 'Pediatra especializada em desenvolvimento infantil e medicina do adolescente.',
          education: 'Doutora em pediatria pela USP'
        },
        {
          id: 4,
          name: 'Dr. Carlos Ferreira',
          specialty: 'Clínico Geral',
          rating: 4.5,
          available: true,
          nextAvailable: 'Hoje às 16:15',
          phone: '(71) 98765-4324',
          location: 'Posto de Saúde Central - Praça da Matriz, s/n',
          distance: '2.1',
          insurances: ['SUS'],
          about: 'Médico dedicado à comunidade com foco em medicina familiar.',
          education: 'Formado pela UFBA com especialização em Saúde da Família'
        },
        {
          id: 5,
          name: 'Dra. Roberta Menezes',
          specialty: 'Dermatologista',
          rating: 4.8,
          available: true,
          nextAvailable: 'Hoje às 17:30',
          phone: '(71) 98765-4325',
          location: 'Centro Médico Premium - Shopping Camaçari, 4° andar',
          distance: '3.2',
          insurances: ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil'],
          about: 'Especialista em dermatologia clínica e estética com abordagem integrada.',
          education: 'Pós-graduada pela Sociedade Brasileira de Dermatologia'
        },
        {
          id: 6,
          name: 'Dr. Ricardo Alves',
          specialty: 'Ortopedista',
          rating: 4.6,
          available: false,
          nextAvailable: 'Quinta-feira às 09:00',
          phone: '(71) 98765-4326',
          location: 'Hospital São Lucas - Av. Principal, 1500',
          distance: '3.5',
          insurances: ['Unimed', 'Bradesco Saúde'],
          about: 'Especialista em traumatologia esportiva e cirurgia ortopédica.',
          education: 'Formado pela UFMG com residência em Ortopedia e Traumatologia'
        },
        {
          id: 7,
          name: 'Dra. Paula Mendonça',
          specialty: 'Ginecologista',
          rating: 4.9,
          available: true,
          nextAvailable: 'Hoje às 18:00',
          phone: '(71) 98765-4327',
          location: 'Clínica da Mulher - Rua das Flores, 500',
          distance: '1.5',
          insurances: ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil'],
          about: 'Ginecologista e obstetra com atendimento humanizado e foco na saúde integral da mulher.',
          education: 'Residência em Ginecologia e Obstetrícia pela UFBA'
        },
        {
          id: 8,
          name: 'Dr. Mateus Costa',
          specialty: 'Oftalmologista',
          rating: 4.7,
          available: false,
          nextAvailable: 'Amanhã às 14:00',
          phone: '(71) 98765-4328',
          location: 'Centro Oftalmológico - Av. Principal, 780',
          distance: '2.8',
          insurances: ['Unimed', 'Amil'],
          about: 'Especialista em doenças da retina e cirurgia de catarata.',
          education: 'Fellowship em Retina no Hospital Albert Einstein'
        },
        {
          id: 9,
          name: 'Dra. Juliana Passos',
          specialty: 'Psiquiatra',
          rating: 4.8,
          available: true,
          nextAvailable: 'Hoje às 16:00',
          phone: '(71) 98765-4329',
          location: 'Centro Integrado de Saúde Mental - Rua Secundária, 230',
          distance: '4.0',
          insurances: ['Unimed', 'Bradesco Saúde', 'SulAmérica'],
          about: 'Psiquiatra com abordagem integrativa e humanizada no tratamento de diversos transtornos mentais.',
          education: 'Especialista em Psiquiatria pela ABP'
        },
        {
          id: 10,
          name: 'Dr. Fernando Martins',
          specialty: 'Neurologista',
          rating: 4.7,
          available: false,
          nextAvailable: 'Sexta-feira às 10:30',
          phone: '(71) 98765-4330',
          location: 'Hospital Regional - Av. Contorno, 1000',
          distance: '5.2',
          insurances: ['Unimed', 'Bradesco Saúde'],
          about: 'Neurologista com foco em doenças neurodegenerativas e cefaléias.',
          education: 'Doutorado em Neurologia pela USP'
        }
      ];

      // Filtrar por especialidade se fornecida
      if (specialty) {
        const lowercaseSpecialty = specialty.toLowerCase();
        const filtered = mockedDoctors.filter(doctor => 
          doctor.specialty.toLowerCase().includes(lowercaseSpecialty) || 
          doctor.name.toLowerCase().includes(lowercaseSpecialty)
        );
        console.log("Médicos filtrados por especialidade:", filtered);
        return filtered;
      }
      
      return mockedDoctors;
    }

    // Código para API real
    const response = await api.get('/doctors', { 
      params: { specialty } 
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default api;