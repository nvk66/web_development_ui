import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class HotelService {
    getHotel(id) {
        return axios.get(API_URL + 'hotel/' + id, {headers: authHeader()})
    }

    deleteHotel(id) {
        return axios.delete(API_URL + 'hotel/' + id, {headers: authHeader()})
    }

    addHotel() {

    }

    getAllHotels() {
        return axios.get(API_URL + 'hotel/', {headers: authHeader()});
    }
}

export default new HotelService();
