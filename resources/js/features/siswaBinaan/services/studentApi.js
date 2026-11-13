import axios from 'axios';

let studentsCache = null;
let studentsRequest = null;
const studentCache = new Map();

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

export function invalidateStudentsCache() {
    studentsCache = null;
    studentCache.clear();
}
