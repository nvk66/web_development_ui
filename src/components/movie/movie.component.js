import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";
import MovieService from "../../services/movie.service"
import {Link} from "react-router-dom";
import "./movie.css";
import ComponentLibrary from "../common/view.element.component";

const movies = async () => {
    try {
        return (await MovieService.getAllMovies()).data.content;
    } catch (e) {
        console.log("Не всё идёт по плану! " + JSON.stringify(e.response.data));
    }
}

export default class Movie extends Component {

    constructor(props) {
        super(props);
        this.setActiveMovie = this.setActiveMovie.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentIndex: -1,
            currentUser: {username: ""},
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
                <div className="col-md-6">
                    <div className="mb-5">
                        <h4 className="creation mr-2">Movie List</h4>
                        <Link
                            to={"/movie"}
                            className="btn btn-primary"
                        >
                            Create
                        </Link>
                    </div>

                    <ul className="list-group">
                        {movies &&
                        movies.map((movie, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveMovie(movie, index)}
                                key={index}
                            >
                                {movie.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentMovie ? (
                        <div>
                            <div>
                                <h4 className="float-left mr-2">Movie</h4>
                                <Link
                                    to={"/movie/" + currentMovie.id}
                                    className="btn btn-warning"
                                >
                                    Show
                                </Link>
                            </div>
                            {ComponentLibrary.listDiv('Name', currentMovie.name)}
                            {ComponentLibrary.listDiv('Author', currentMovie.author)}
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <span className="font-weight-bold">Please click on a Movie...</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
