import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";
import HotelService from "../../services/hotel.service"
import {Link} from "react-router-dom";
import "./hotel.css";
import ComponentLibrary from "../common/view.element.component";

const hotels = async () => {
    try {
        return (await HotelService.getAllHotels()).data.content;
    } catch (e) {
        console.log("Не всё идёт по плану! " + JSON.stringify(e.response.data));
    }
}

export default class Hotel extends Component {

    constructor(props) {
        super(props);
        this.setActiveHotel = this.setActiveHotel.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentIndex: -1,
            currentUser: {username: ""},
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
                <div className="col-md-6">
                    <div className="mb-5">
                        <h4 className="creation mr-2">Hotel List</h4>
                        <Link
                            to={"/hotel"}
                            className="btn btn-primary"
                        >
                            Create
                        </Link>
                    </div>

                    <ul className="list-group">
                        {hotels &&
                        hotels.map((hotel, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveHotel(hotel, index)}
                                key={index}
                            >
                                {hotel.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentHotel ? (
                        <div className="mt-5">
                            <div>
                                <h4 className="float-left mr-2">Hotel</h4>
                                <Link
                                    to={"/hotel/" + currentHotel.id}
                                    className="btn btn-warning"
                                >
                                    Show
                                </Link>
                            </div>
                            {ComponentLibrary.listDiv('Name', currentHotel.name)}
                            {ComponentLibrary.listDiv('Address', currentHotel.address)}
                            {ComponentLibrary.listDiv('Director Name', currentHotel.directorName)}
                            {ComponentLibrary.listDiv('Count Visitors', currentHotel.countVisitor)}
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <span className="font-weight-bold">Please click on a Hotel...</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}