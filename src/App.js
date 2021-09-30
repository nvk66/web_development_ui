import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import AuthVerify from "./common/auth-verify";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Hotel from "./components/hotel.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

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
            currentUser: undefined,
        });
    }

    render() {
        const {
            currentUser, showHotelBoard, showUsersBoard, showMovieBoard, showStudentBoard,
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

                        {showHotelBoard && (
                            <li className="nav-item">
                                <Link to={"/hotel"} className="nav-link">
                                    Hotel Board
                                </Link>
                            </li>
                        )}

                        {showUsersBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Users Board
                                </Link>
                            </li>
                        )}

                        {showMovieBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Users Board
                                </Link>
                            </li>
                        )}

                        {showStudentBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Users Board
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
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
                        <Route exact path="/hotel" component={Hotel}/>
                        <Route path="/user" component={BoardUser}/>
                        <Route path="/mod" component={BoardModerator}/>
                        <Route path="/admin" component={BoardAdmin}/>
                    </Switch>
                </div>

                { /*<AuthVerify logOut={this.logOut}/> */}
            </div>
        );
    }
}

export default App;
