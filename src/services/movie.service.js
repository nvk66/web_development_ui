import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class MovieService {
    getMovie(id) {
        return axios.get(API_URL + 'movies/' + id, {headers: authHeader()})
    }

    deleteMovie(id) {
        return axios.delete(API_URL + 'movies/' + id, {headers: authHeader()})
    }

    addMovie(movie) {
        return axios.post(API_URL + 'movies/', movie, {headers: authHeader()})
    }

    updateMovie(id, movie) {
        return axios.put(API_URL + 'movies/' + id, movie, {headers: authHeader()});
    }

    getAllMovies() {
        return axios.get(API_URL + 'movies/', {headers: authHeader()});
    }
}

export default new MovieService();
