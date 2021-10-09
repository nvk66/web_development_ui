import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class StudentService {
    getStudent(id) {
        return axios.get(API_URL + 'students/' + id, {headers: authHeader()})
    }

    deleteStudent(id) {
        return axios.delete(API_URL + 'students/' + id, {headers: authHeader()})
    }

    addStudent(student) {
        return axios.post(API_URL + 'students/', student, {headers: authHeader()})
    }

    updateStudent(id, student) {
        return axios.put(API_URL + 'students/' + id, student, {headers: authHeader()});
    }

    getAllStudents() {
        return axios.get(API_URL + 'students/', {headers: authHeader()});
    }
}

export default new StudentService();
