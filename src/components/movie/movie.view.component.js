import React, {Component} from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import MovieService from "../../services/movie.service"
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

export default class MovieView extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.goToMovies = this.goToMovies.bind(this);
        this.newMovie = this.newMovie.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.createMovie = this.createMovie.bind(this);

        this.state = {
            redirect: null,
            currentMovie: {
                id: null,
                name: '',
                author: '',
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
            this.getMovie(id);
        }
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMovie: {
                    ...prevState.currentMovie,
                    name: name
                }
            };
        });
    }

    onChangeAuthor(e) {
        const author = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMovie: {
                    ...prevState.currentMovie,
                    author: author
                }
            };
        });
    }

    newMovie() {
        this.setState({
            redirect: null,
            currentMovie: {
                id: null,
                name: '',
                author: '',
            },
            created: false,
            updated: false,
            message: ''
        });
    }

    goToMovies() {
        return this.props.history.push('/movies');
    }

    getMovie(id) {
        MovieService.getMovie(id)
            .then(response => {
                this.setState({
                    currentMovie: {
                        id: response.data.id,
                        name: response.data.name,
                        author: response.data.author,
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

    updateMovie() {
        MovieService.updateMovie(
            this.state.currentMovie.id,
            this.state.currentMovie
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The movie was updated successfully!",
                updated: true
            });
            // this.props.history.push('/movies');
        }).catch(e => {
            console.log(e);
        });
    }

    deleteMovie() {
        MovieService.deleteMovie(this.state.currentMovie.id).then(response => {
            console.log(response.data);
            this.props.history.push('/movies');
        }).catch(e => {
            console.log(e);
        });
    }

    createMovie() {
        MovieService.addMovie(
            this.state.currentMovie
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The movie was created successfully!",
                created: true
            });
            // this.props.history.push('/movies');
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {currentMovie} = this.state;

        return (
            <div className="edit-form">
                {this.state.created ? (
                    <div>
                        <h4>{this.state.message}</h4>
                        <button className="btn btn-success mr-2" onClick={this.newMovie}>
                            Add another one
                        </button>
                        <button className="btn btn-warning mr-2" onClick={this.goToMovies}>
                            Go to movies
                        </button>
                    </div>
                ) : (
                    this.state.updated ? (
                        <div>
                            <h4>{this.state.message}</h4>
                            <button className="btn btn-warning" onClick={this.goToMovies}>
                                Go to movies
                            </button>
                        </div>
                    ) : (
                        <div>
                            {<div>
                                <h4>Movie</h4>
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            required
                                            value={currentMovie.name}
                                            onChange={this.onChangeName}
                                            name="name"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="author">Author</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="author"
                                            required
                                            value={currentMovie.author}
                                            onChange={this.onChangeAuthor}
                                            name="author"
                                            validations={[required, inputStringLength]}
                                        />
                                    </div>
                                </Form>
                            </div>
                            }
                            {currentMovie.id ? (
                                <div>
                                    <button
                                        className="btn btn-danger mr-2"
                                        onClick={this.deleteMovie}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={this.updateMovie}
                                    >
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={this.createMovie}
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
