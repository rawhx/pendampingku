import axios from 'axios';

let studentsCache = null;
let studentsRequest = null;
const studentCache = new Map();
let dashboardCache = null;
let dashboardRequest = null;

export async function getDashboard() {
    if (dashboardCache) {
        return dashboardCache;
    }

    if (!dashboardRequest) {
        dashboardRequest = axios
            .get('/api/dashboard')
            .then((response) => response.data.data)
            .then((dashboard) => {
                dashboardCache = dashboard;

                return dashboard;
            })
            .finally(() => {
                dashboardRequest = null;
            });
    }

    return dashboardRequest;
}

export async function getStudents() {
    if (studentsCache) {
        return studentsCache;
    }

    if (!studentsRequest) {
        studentsRequest = axios
            .get('/api/students')
            .then((response) => response.data.data)
            .then((students) => {
                studentsCache = students;
                students.forEach((student) => {
                    studentCache.set(String(student.id), student);
                });

                return students;
            })
            .finally(() => {
                studentsRequest = null;
            });
    }

    return studentsRequest;
}

export async function getStudent(studentId) {
    const cachedStudent = studentCache.get(String(studentId));

    if (cachedStudent) {
        return cachedStudent;
    }

    const response = await axios.get(`/api/students/${studentId}`);
    const student = response.data.data;
    studentCache.set(String(studentId), student);

    return student;
}

export function createStudent(payload) {
    return axios.post('/api/students', payload).then((response) => {
        invalidateStudentsCache();

        return response;
    });
}

export function updateStudent(studentId, payload) {
    return axios.patch(`/api/students/${studentId}`, payload).then((response) => {
        invalidateStudentsCache();

        return response;
    });
}

export async function getStudentObservations(studentId) {
    const response = await axios.get(`/api/students/${studentId}/observations`);

    return response.data.data;
}

export async function getStudentObservation(studentId, observationId) {
    const response = await axios.get(
        `/api/students/${studentId}/observations/${observationId}`,
    );

    return response.data.data;
}

export async function downloadStudentObservationPdf(studentId, observationId) {
    const response = await axios.get(
        `/api/students/${studentId}/observations/${observationId}/pdf`,
        { responseType: 'blob' },
    );
    const url = URL.createObjectURL(response.data);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download =
        response.headers['content-disposition']
            ?.match(/filename="?([^"]+)"?/i)?.[1] ??
        `catatan-${studentId}-${observationId}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}

export async function createStudentObservation(studentId, payload) {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
        if (key === 'files') {
            value.forEach((file) => formData.append('files[]', file));
            return;
        }

        if (key === 'rubric' || key === 'qualitative' || key === 'ai_recommendation') {
            formData.append(key, JSON.stringify(value));
            return;
        }

        formData.append(
            key,
            typeof value === 'boolean' ? (value ? '1' : '0') : String(value),
        );
    });

    const response = await axios.post(
        `/api/students/${studentId}/observations`,
        formData,
    );

    return response.data.data;
}

export async function generateStudentRecommendation(studentId, fieldNotes) {
    const response = await axios.post(
        `/api/students/${studentId}/observations/generate-ai`,
        { field_notes: fieldNotes },
    );

    return response.data.data;
}

export function invalidateStudentsCache() {
    studentsCache = null;
    studentCache.clear();
    dashboardCache = null;
}
