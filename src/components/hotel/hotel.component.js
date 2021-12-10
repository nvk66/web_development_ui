import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";
import HotelService from "../../services/hotel.service"
import {Link} from "react-router-dom";
import "./hotel.css";
import ComponentLibrary from "../common/view.element.component";
import InfoComponent from "../common/info.component";
import TableComponent from "../common/table.component";

const hotels = async () => {
    try {
        return (await HotelService.getAllHotels()).data.content;
    } catch (e) {
        console.log("Не всё идёт по плану! " + JSON.stringify(e.response.data));
    }
}

const collectData = (hotel) => {
    const data = new Map();
    if (hotel) {
        data.set('Hotel', hotel.name);
        data.set('Address', hotel.address);
        data.set('Director Name', hotel.directorName);
        data.set('Count Visitors', hotel.countVisitor);
    }
    return data;
}

export default class Hotel extends Component {

    constructor(props) {
        super(props);
        this.setActiveHotel = this.setActiveHotel.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentIndex: -1,
            currentUser: {username: ''},
            currentHotel: null,
            hotels: []
        };
    }

    setActiveHotel(hotel, index) {
        this.setState({
            currentHotel: hotel,
            currentIndex: index
        });
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({
                redirect: "/home"
            });
        } else {
            hotels().then(response => {
                this.setState({
                    currentUser: currentUser,
                    userReady: true,
                    hotels: response
                })
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {hotels, currentIndex, currentHotel} = this.state;

        return (
            <div className="list row">
                <TableComponent
                    setActive={this.setActiveHotel}
                    info={'hotel'}
                    data={hotels}
                    name={'Hotel'}
                    value={'name'}
                    id={currentIndex}
                />
                <InfoComponent
                    info={'hotel'}
                    name={'Hotel'}
                    id={currentHotel ? currentHotel.id : null}
                    data={collectData(currentHotel)}
                />
            </div>
        );
    }

}