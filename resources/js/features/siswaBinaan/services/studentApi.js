import axios from 'axios';

export async function getStudents() {
    const response = await axios.get('/api/students');

    return response.data.data;
}

export async function getStudent(studentId) {
    const response = await axios.get(`/api/students/${studentId}`);

    return response.data.data;
}

export function createStudent(payload) {
    return axios.post('/api/students', payload);
}

export function updateStudent(studentId, payload) {
    return axios.patch(`/api/students/${studentId}`, payload);
}
