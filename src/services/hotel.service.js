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

    addHotel(hotel) {
        return axios.post(API_URL + 'hotel/', hotel, {headers: authHeader()})
    }

    updateHotel(id, hotel) {
        return axios.put(API_URL + 'hotel/' + id, hotel, {headers: authHeader()});
    }

    getAllHotels() {
        return axios.get(API_URL + 'hotel/', {headers: authHeader()});
    }
}

export default new HotelService();
