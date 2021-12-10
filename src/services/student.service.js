import ApiService from "./api.service";

const getStudent = (id) => {
    return ApiService.createAuthorizedRequest()
        .get('students/' + id)
}

const deleteStudent = (id) => {
    return ApiService.createAuthorizedRequest()
        .delete('students/' + id)
}

const addStudent = (student) => {
    return ApiService.createAuthorizedRequest()
        .post('students/', student)
}

const updateStudent = (id, student) => {
    return ApiService.createAuthorizedRequest()
        .put('students/' + id, student);
}

const getAllStudents = () => {
    return ApiService.createAuthorizedRequest()
        .get('students/');
}

const StudentService = {
    getStudent,
    deleteStudent,
    addStudent,
    updateStudent,
    getAllStudents
}

export default StudentService;
