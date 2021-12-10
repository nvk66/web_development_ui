import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";
import MovieService from "../../services/movie.service"
import {Link} from "react-router-dom";
import "./movie.css";
import ComponentLibrary from "../common/view.element.component";
import TableComponent from "../common/table.component";
import InfoComponent from "../common/info.component";

const movies = async () => {
    try {
        return (await MovieService.getAllMovies()).data.content;
    } catch (e) {
        console.log("Не всё идёт по плану! " + JSON.stringify(e.response.data));
    }
}

const collectData = (movie) => {
    const data = new Map();
    if (movie) {
        data.set('Name', movie.name);
        data.set('Author', movie.author);
    }
    return data;
}

export default class Movie extends Component {

    constructor(props) {
        super(props);
        this.setActiveMovie = this.setActiveMovie.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentIndex: -1,
            currentUser: {username: ''},
            currentMovie: null,
            movies: []
        };
    }

    setActiveMovie(movie, index) {
        this.setState({
            currentMovie: movie,
            currentIndex: index
        });
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({redirect: "/home"});
        }

        movies().then(response => {
            this.setState({
                currentUser: currentUser,
                userReady: true,
                movies: response
            })
        });

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {movies, currentIndex, currentMovie} = this.state;

        return (
            <div className="list row">
                <TableComponent
                    setActive={this.setActiveMovie}
                    info={'movie'}
                    data={movies}
                    name={'Movie'}
                    value={'name'}
                    id={currentIndex}
                />
                <InfoComponent
                    info={'movie'}
                    name={'Movie'}
                    id={currentMovie ? currentMovie.id : null}
                    data={collectData(currentMovie)}
                />
            </div>
        );
    }
}
