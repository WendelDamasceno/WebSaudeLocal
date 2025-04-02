import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with the actual API base URL

export const searchHealthFacilities = async (location, type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                location,
                type
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching health facilities:', error);
        throw error;
    }
};

export const getEmergencyServices = async (location) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/emergency-services`, {
            params: {
                location
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching emergency services:', error);
        throw error;
    }
};

export const checkMedicineAvailability = async (medicineName, location) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/medicine-availability`, {
            params: {
                medicineName,
                location
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error checking medicine availability:', error);
        throw error;
    }
};