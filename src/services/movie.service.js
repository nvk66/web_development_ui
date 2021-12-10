import ApiService from "./api.service";

const API_URL = 'http://localhost:8080/api/';

const getMovie = (id) => {
    return ApiService.createAuthorizedRequest()
        .get('movies/' + id)
}

const deleteMovie = (id) => {
    return ApiService.createAuthorizedRequest()
        .delete('movies/' + id)
}

const addMovie = (movie) => {
    return ApiService.createAuthorizedRequest()
        .post('movies/', movie)
}

const updateMovie = (id, movie) => {
    return ApiService.createAuthorizedRequest()
        .put('movies/' + id, movie);
}

const getAllMovies = () => {
    return ApiService.createAuthorizedRequest()
        .get('movies/');
}

const MovieService = {
    getMovie,
    deleteMovie,
    addMovie,
    updateMovie,
    getAllMovies
}

export default MovieService;
