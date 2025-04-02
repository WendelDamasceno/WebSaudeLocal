import api from './api';

export const fetchHealthRecords = async () => {
  try {
    const response = await api.get('/health-records');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar histórico médico');
  }
};

export const updateHealthRecord = async (data) => {
  try {
    const response = await api.post('/health-records', data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar histórico médico');
  }
};

export const uploadMedicalDocument = async (file, recordId) => {
  const formData = new FormData();
  formData.append('document', file);

  try {
    const response = await api.post(`/health-records/${recordId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao enviar documento');
  }
};
