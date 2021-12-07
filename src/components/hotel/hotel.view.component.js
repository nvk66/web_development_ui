import React, {Component} from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import HotelService from "../../services/hotel.service"
import AuthService from "../../services/auth.service";
import {Redirect} from "react-router-dom";
import CheckButton from "react-validation/build/button";
import ValidationService from "../../validation/validate.field";
import InputComponent from "../common/input.component";
import ButtonComponent from "../common/button.component";

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
            message: '',
            loading: false
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({
                redirect: "/home"
            });
        } else {
            const id = this.props.match.params.id;
            console.log(id);
            if (id) {
                this.getHotel(id);
            }
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
        this.setState({
            message: '',
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
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
        } else {
            this.setState({
                loading: false
            });
        }
    }

    deleteHotel() {
        HotelService.deleteHotel(this.state.currentHotel.id).then(response => {
            console.log(response.data);
            this.props.history.push('/hotels');
        }).catch(e => {
            console.log(e);
        });
    }

    createHotel(e) {
        e.preventDefault();

        this.setState({
            message: '',
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            HotelService.addHotel(
                this.state.currentHotel
            ).then(response => {
                console.log(response.data);
                this.setState({
                    message: 'The hotel was created successfully!',
                    created: true,
                    loading: false
                });
            })
        } else {
            this.setState({
                loading: false
            });
        }
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
                                <Form
                                    onSubmit={currentHotel.id ? this.createHotel : this.updateHotel}
                                    ref={c => {
                                        this.form = c;
                                    }}
                                >
                                    <InputComponent
                                        onChange={this.onChangeName}
                                        value={currentHotel.name}
                                        name={'Name'}
                                        id={'name'}
                                        validations={
                                            [ValidationService.required,
                                                ValidationService.inputStringLength]
                                        }
                                    />
                                    <InputComponent
                                        onChange={this.onChangeDirectorName}
                                        value={currentHotel.directorName}
                                        name={'Director Name'}
                                        id={'directorName'}
                                        validations={
                                            [ValidationService.required,
                                                ValidationService.inputStringLength]
                                        }
                                    />
                                    <InputComponent
                                        onChange={this.onChangeCountVisitors}
                                        value={currentHotel.countVisitor}
                                        name={'Count Visitors'}
                                        id={'countVisitor'}
                                        validations={
                                            [ValidationService.required,
                                                ValidationService.inputNum]
                                        }
                                    />
                                    <InputComponent
                                        onChange={this.onChangeAddress}
                                        value={currentHotel.address}
                                        name={'Address'}
                                        id={'address'}
                                        validations={
                                            [ValidationService.required,
                                                ValidationService.inputStringLength]
                                        }
                                    />
                                    <ButtonComponent
                                        id={currentHotel.id}
                                        create={this.createHotel}
                                        update={this.updateHotel}
                                        deleteFunc={this.deleteHotel}
                                    />
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton
                                        style={{display: "none"}}
                                        ref={c => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                            </div>
                            }
                        </div>
                    )
                )}
            </div>
        );
    }
}
