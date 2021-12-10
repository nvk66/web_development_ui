import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthVerify from "./shared/auth-verify";

import AuthService from "./services/auth.service";

import Login from "./components/auth/login.component";
import Hotel from "./components/hotel/hotel.component";
import Register from "./components/auth/register.component";
import Home from "./components/home.component";
import Profile from "./components/auth/profile.component";

import EventBus from "./shared/EventBus";
import HotelView from "./components/hotel/hotel.view.component";
import Movie from "./components/movie/movie.component";
import MovieView from "./components/movie/movie.view.component";
import StudentView from "./components/student/student.view.component";
import Student from "./components/student/student.component";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showHotelBoard: false,
            showUsersBoard: false,
            showMovieBoard: false,
            showStudentBoard: false,
            currentUser: {
                login: '',
                roles: [],
                accessToken: '',
                refreshToken: ''
            },
            showRegister: false,
            showLogin: false,
            showLogout: false,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: {
                    login: user.login,
                    roles: user.roles,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken
                },
                showHotelBoard: user.roles.includes('ROLE_HOTEL_MANAGER'),
                showUsersBoard: user.roles.includes('ROLE_USER_MANAGER'),
                showMovieBoard: user.roles.includes('ROLE_MOVIE_MANAGER'),
                showStudentBoard: user.roles.includes('ROLE_STUDENT_MANAGER'),
                showAdminBoard: true,
                showLogout: true
            });
        } else {
            this.setState({
                showLogin: true,
                showRegister: true
            });
        }


        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showHotelBoard: false,
            showUsersBoard: false,
            showMovieBoard: false,
            showStudentBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {
            currentUser, showHotelBoard, showMovieBoard, showStudentBoard,
            showRegister, showLogin, showLogout
        } = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        OmSTU
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
                                </Link>
                            </li>
                        )}

                        {showHotelBoard && (
                            <li className="nav-item">
                                <Link to={"/hotels"} className="nav-link">
                                    Hotel Board
                                </Link>
                            </li>
                        )}

                        {showMovieBoard && (
                            <li className="nav-item">
                                <Link to={"/movies"} className="nav-link">
                                    Movie Board
                                </Link>
                            </li>
                        )}

                        {showStudentBoard && (
                            <li className="nav-item">
                                <Link to={"/students"} className="nav-link">
                                    Student Board
                                </Link>
                            </li>
                        )}

                    </div>

                    <div className="navbar-nav ml-auto">
                        {showLogout && (
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        )}

                        {showLogin && (
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        )}

                        {showRegister && (
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        )}
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>

                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>

                        <Route exact path="/hotels" component={Hotel} />
                        <Route exact path="/hotel/:id" component={HotelView} />
                        <Route exact path="/hotel" component={HotelView} />

                        <Route exact path="/movies" component={Movie}/>
                        <Route exact path="/movie/:id" component={MovieView} />
                        <Route exact path="/movie" component={MovieView} />

                        <Route exact path="/students" component={Student}/>
                        <Route exact path="/student" component={StudentView} />
                        <Route exact path="/student/:id" component={StudentView} />
                    </Switch>
                </div>

                { <AuthVerify logOut={this.logOut}/> }
            </div>
        );
    }
}

export default App;
