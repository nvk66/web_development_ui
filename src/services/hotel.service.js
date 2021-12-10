import ApiService from "./api.service";

const getHotel = (id) => {
    return ApiService.createAuthorizedRequest()
        .get('hotel/' + id)
}

const deleteHotel = (id) => {
    return ApiService.createAuthorizedRequest()
        .delete('hotel/' + id)
}

const addHotel = (hotel) => {
    return ApiService.createAuthorizedRequest()
        .post('hotel/', hotel)
}

const updateHotel = (id, hotel) => {
    return ApiService.createAuthorizedRequest()
        .put('hotel/' + id, hotel);
}

const getAllHotels = () => {
    return ApiService.createAuthorizedRequest()
        .get('hotel/');
}

const HotelService = {
    getHotel,
    deleteHotel,
    addHotel,
    updateHotel,
    getAllHotels
}

export default HotelService;
