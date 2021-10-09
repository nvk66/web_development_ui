import React, {Component} from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import StudentService from "../../services/student.service"
import AuthService from "../../services/auth.service";
import {Redirect} from "react-router-dom";
import {isEmail} from "validator";

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

const subgroupInput = value => {
    if (value !== '1' && value !== '2') {
        return (
            <div className="alert alert-danger" role="alert">
                The subgroup field must be 1 or 2.
            </div>
        );
    }
}

const emailInput = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

export default class StudentView extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeGroupName = this.onChangeGroupName.bind(this);
        this.onChangeSubgroup = this.onChangeSubgroup.bind(this);
        this.goToStudents = this.goToStudents.bind(this);
        this.newStudent = this.newStudent.bind(this);
        this.getStudent = this.getStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.createStudent = this.createStudent.bind(this);

        this.state = {
            redirect: null,
            currentStudent: {
                id: null,
                name: '',
                email: '',
                cardNumber: '',
                groupName: '',
                subgroup: ''
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
            this.getStudent(id);
        }
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    name: name
                }
            };
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(function (prevState) {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    email: email
                }
            };
        });
    }

    onChangeGroupName(e) {
        const groupName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    groupName: groupName
                }
            };
        });
    }

    onChangeCardNumber(e) {
        const cardNumber = e.target.value;

        this.setState(prevState => ({
            currentStudent: {
                ...prevState.currentStudent,
                cardNumber: cardNumber
            }
        }));
    }

    onChangeSubgroup(e) {
        const subgroup = e.target.value;

        this.setState(prevState => ({
            currentStudent: {
                ...prevState.currentStudent,
                subgroup: subgroup
            }
        }));
    }

    newStudent() {
        this.setState({
            redirect: null,
            currentStudent: {
                id: null,
                name: '',
                email: '',
                cardNumber: '',
                groupName: '',
                subgroup: ''
            },
            created: false,
            updated: false,
            message: ''
        });
    }

    goToStudents() {
        return this.props.history.push('/students');
    }

    getStudent(id) {
        StudentService.getStudent(id)
            .then(response => {
                this.setState({
                    currentStudent: {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        cardNumber: response.data.cardNumber,
                        groupName: response.data.groupName,
                        subgroup: response.data.subgroup,
                    }
                });
                console.log(this.state);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateStudent() {
        StudentService.updateStudent(
            this.state.currentStudent.id,
            this.state.currentStudent
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The student was updated successfully!",
                updated: true
            });
            // this.props.history.push('/students');
        }).catch(e => {
            console.log(e);
        });
    }

    deleteStudent() {
        StudentService.deleteStudent(this.state.currentStudent.id).then(response => {
            console.log(response.data);
            this.props.history.push('/students');
        }).catch(e => {
            console.log(e);
        });
    }

    createStudent() {
        StudentService.addStudent(
            this.state.currentStudent
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The student was created successfully!",
                created: true
            });
            // this.props.history.push('/students');
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {currentStudent} = this.state;

        return (
            <div className="edit-form">
                {this.state.created ? (
                    <div>
                        <h4>{this.state.message}</h4>
                        <button className="btn btn-success mr-2" onClick={this.newStudent}>
                            Add another one
                        </button>
                        <button className="btn btn-warning mr-2" onClick={this.goToStudents}>
                            Go to students
                        </button>
                    </div>
                ) : (
                    this.state.updated ? (
                        <div>
                            <h4>{this.state.message}</h4>
                            <button className="btn btn-warning" onClick={this.goToStudents}>
                                Go to students
                            </button>
                        </div>
                    ) : (
                        <div>
                            {<div>
                                <h4>Student</h4>
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            required
                                            value={currentStudent.name}
                                            onChange={this.onChangeName}
                                            name="name"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            required
                                            value={currentStudent.email}
                                            onChange={this.onChangeEmail}
                                            name="email"
                                            validations={[required, emailInput]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="cardNumber"
                                            required
                                            value={currentStudent.cardNumber}
                                            onChange={this.onChangeCardNumber}
                                            name="cardNumber"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="groupName">Group Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="groupName"
                                            required
                                            value={currentStudent.groupName}
                                            onChange={this.onChangeGroupName}
                                            name="groupName"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subgroup">Subgroup</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="subgroup"
                                            required
                                            value={currentStudent.subgroup}
                                            onChange={this.onChangeSubgroup}
                                            name="subgroup"
                                            validations={[required, subgroupInput]}
                                        />
                                    </div>
                                </Form>
                            </div>
                            }
                            {currentStudent.id ? (
                                <div>
                                    <button
                                        className="btn btn-danger mr-2"
                                        onClick={this.deleteStudent}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={this.updateStudent}
                                    >
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={this.createStudent}
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
