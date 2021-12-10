import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";
import StudentService from "../../services/student.service"
import "./student.css";
import TableComponent from "../common/table.component";
import InfoComponent from "../common/info.component";

const students = async () => {
    try {
        return (await StudentService.getAllStudents()).data.content;
    } catch (e) {
        console.log("Не всё идёт по плану! " + JSON.stringify(e.response.data));
    }
}

const collectData = (student) => {
    const data = new Map();
    if (student) {
        data.set('Name', student.name);
        data.set('Email', student.subgroup);
        data.set('Card Number', student.email);
        data.set('Group Name', student.cardNumber);
        data.set('Subgroup', student.groupName);
    }
    return data;
}


export default class Student extends Component {

    constructor(props) {
        super(props);
        this.setActiveStudent = this.setActiveStudent.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentIndex: -1,
            currentUser: {username: ''},
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
                <TableComponent
                    setActive={this.setActiveStudent}
                    info={'student'}
                    data={students}
                    name={'Student'}
                    value={'name'}
                    id={currentIndex}
                />
                <InfoComponent
                    info={'student'}
                    name={'Student'}
                    id={currentStudent ? currentStudent.id : null}
                    data={collectData(currentStudent)}
                />
            </div>
        );
    }
}
