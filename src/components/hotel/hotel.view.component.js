import React, {Component} from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import HotelService from "../../services/hotel.service"
import AuthService from "../../services/auth.service";
import {Redirect} from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const inputStringLength = value => {
    if (value.length < 0 || value.length > 64) {
        return (
            <div className="alert alert-danger" role="alert">
                The input field must be between 1 and 64 characters.
            </div>
        );
    }
};

const inputNum = value => {
    if (!(/^[1-9][\d]*$/.test(value))) {
        return (
            <div className="alert alert-danger" role="alert">
                The input field must be positive numeric.
            </div>
        );
    }
};

export default class HotelView extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCountVisitors = this.onChangeCountVisitors.bind(this);
        this.onChangeDirectorName = this.onChangeDirectorName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.goToHotels = this.goToHotels.bind(this);
        this.newHotel = this.newHotel.bind(this);
        this.getHotel = this.getHotel.bind(this);
        this.updateHotel = this.updateHotel.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
        this.createHotel = this.createHotel.bind(this);

        this.state = {
            redirect: null,
            currentHotel: {
                id: null,
                name: '',
                directorName: '',
                countVisitor: '',
                address: ''
            },
            created: false,
            updated: false,
            message: ''
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({
                redirect: "/home"
            });
        }

        const id = this.props.match.params.id;
        console.log(id);
        if (id) {
            this.getHotel(id);
        }
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHotel: {
                    ...prevState.currentHotel,
                    name: name
                }
            };
        });
    }

    onChangeDirectorName(e) {
        const directorName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHotel: {
                    ...prevState.currentHotel,
                    directorName: directorName
                }
            };
        });
    }

    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHotel: {
                    ...prevState.currentHotel,
                    address: address
                }
            };
        });
    }

    onChangeCountVisitors(e) {
        const countVisitor = e.target.value;

        this.setState(prevState => ({
            currentHotel: {
                ...prevState.currentHotel,
                countVisitor: countVisitor
            }
        }));
    }

    newHotel() {
        this.setState({
            redirect: null,
            currentHotel: {
                id: null,
                name: '',
                directorName: '',
                countVisitor: '',
                address: ''
            },
            created: false,
            updated: false,
            message: ''
        });
    }

    goToHotels() {
        return this.props.history.push('/hotels');
    }

    getHotel(id) {
        HotelService.getHotel(id)
            .then(response => {
                this.setState({
                    currentHotel: {
                        id: response.data.id,
                        name: response.data.name,
                        directorName: response.data.directorName,
                        countVisitor: response.data.countVisitor,
                        address: response.data.address,
                    }
                });
                console.log(this.state);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateHotel() {
        HotelService.updateHotel(
            this.state.currentHotel.id,
            this.state.currentHotel
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The hotel was updated successfully!",
                updated: true
            });
            // this.props.history.push('/hotels');
        }).catch(e => {
            console.log(e);
        });
    }

    deleteHotel() {
        HotelService.deleteHotel(this.state.currentHotel.id).then(response => {
            console.log(response.data);
            this.props.history.push('/hotels');
        }).catch(e => {
            console.log(e);
        });
    }

    createHotel() {
        HotelService.addHotel(
            this.state.currentHotel
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The hotel was created successfully!",
                created: true
            });
            // this.props.history.push('/hotels');
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {currentHotel} = this.state;

        return (
            <div className="edit-form">
                {this.state.created ? (
                    <div>
                        <h4>{this.state.message}</h4>
                        <button className="btn btn-success mr-2" onClick={this.newHotel}>
                            Add another one
                        </button>
                        <button className="btn btn-warning mr-2" onClick={this.goToHotels}>
                            Go to hotels
                        </button>
                    </div>
                ) : (
                    this.state.updated ? (
                        <div>
                            <h4>{this.state.message}</h4>
                            <button className="btn btn-warning" onClick={this.goToHotels}>
                                Go to hotels
                            </button>
                        </div>
                    ) : (
                        <div>
                            {<div>
                                <h4>Hotel</h4>
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            required
                                            value={currentHotel.name}
                                            onChange={this.onChangeName}
                                            name="name"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="directorName">Director Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="directorName"
                                            required
                                            value={currentHotel.directorName}
                                            onChange={this.onChangeDirectorName}
                                            name="directorName"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="countVisitor">Count Visitors</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="countVisitor"
                                            required
                                            value={currentHotel.countVisitor}
                                            onChange={this.onChangeCountVisitors}
                                            name="countVisitor"
                                            validations={[required, inputNum]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            required
                                            value={currentHotel.address}
                                            onChange={this.onChangeAddress}
                                            name="address"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>
                                </Form>
                            </div>
                            }
                            {currentHotel.id ? (
                                <div>
                                    <button
                                        className="btn btn-danger mr-2"
                                        onClick={this.deleteHotel}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={this.updateHotel}
                                    >
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={this.createHotel}
                                    >
                                        Create
                                    </button>
                                </div>
                            )
                            }
                        </div>
                    )
                )}
            </div>
        );
    }
}
