import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";
import StudentService from "../../services/student.service"
import {Link} from "react-router-dom";
import "./student.css";
import ComponentLibrary from "../common/view.element.component";

const students = async () => {
    try {
        return (await StudentService.getAllStudents()).data.content;
    } catch (e) {
        console.log("Не всё идёт по плану! " + JSON.stringify(e.response.data));
    }
}

export default class Student extends Component {

    constructor(props) {
        super(props);
        this.setActiveStudent = this.setActiveStudent.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentIndex: -1,
            currentUser: {username: ""},
            currentStudent: null,
            students: []
        };
    }

    setActiveStudent(student, index) {
        this.setState({
            currentStudent: student,
            currentIndex: index
        });
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({
                redirect: "/home"
            });
        }

        students().then(response => {
            this.setState({
                currentUser: currentUser,
                userReady: true,
                students: response
            })
        });

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {students, currentIndex, currentStudent} = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <div className="mb-5">
                        <h4 className="creation mr-2">Student List</h4>
                        <Link
                            to={"/student"}
                            className="btn btn-primary"
                        >
                            Create
                        </Link>
                    </div>

                    <ul className="list-group">
                        {students &&
                        students.map((student, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveStudent(student, index)}
                                key={index}
                            >
                                {student.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentStudent ? (
                        <div>
                            <div>
                                <h4 className="float-left mr-2">Student</h4>
                                <Link
                                    to={"/student/" + currentStudent.id}
                                    className="btn btn-warning"
                                >
                                    Show
                                </Link>
                            </div>
                            {ComponentLibrary.listDiv('Name', currentStudent.name)}
                            {ComponentLibrary.listDiv('Email', currentStudent.email)}
                            {ComponentLibrary.listDiv('Card Number', currentStudent.cardNumber)}
                            {ComponentLibrary.listDiv('Group Name', currentStudent.groupName)}
                            {ComponentLibrary.listDiv('Subgroup', currentStudent.subgroup)}
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <span className="font-weight-bold">Please click on a Student...</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
