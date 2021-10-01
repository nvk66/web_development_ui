import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import HotelService from "../services/hotel.service"

const hotels = async () => {
    try {
        return (await HotelService.getAllHotels()).data.content;
        // return response.data.content;
    } catch (e) {
        console.log("Не всё идёт по плану!");
    }
}

export default class Hotel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentIndex: -1,
            currentUser: {username: ""},
            hotels: []
        };
    }


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({redirect: "/home"});
        }

        hotels().then(response => {
            this.setState({
                currentUser: currentUser,
                userReady: true,
                hotels: response
            })
        });

    }

    // render() {
    //     if (this.state.redirect) {
    //         return <Redirect to={this.state.redirect}/>
    //     }
    //
    //     const {currentUser, hotels, currentIndex} = this.state;
    //
    //     return (
    //         <div className="list row">
    //             {/*<div className="col-md-8">*/}
    //             {/*    <div className="input-group mb-3">*/}
    //             {/*        <input*/}
    //             {/*            type="text"*/}
    //             {/*            className="form-control"*/}
    //             {/*            placeholder="Search by title"*/}
    //             {/*            value={searchTitle}*/}
    //             {/*            onChange={this.onChangeSearchTitle}*/}
    //             {/*        />*/}
    //             {/*        <div className="input-group-append">*/}
    //             {/*            <button*/}
    //             {/*                className="btn btn-outline-secondary"*/}
    //             {/*                type="button"*/}
    //             {/*                onClick={this.searchTitle}*/}
    //             {/*            >*/}
    //             {/*                Search*/}
    //             {/*            </button>*/}
    //             {/*        </div>*/}
    //             {/*    </div>*/}
    //             {/*</div>*/}
    //             <div className="col-md-6">
    //                 <h4>Hotel List</h4>
    //
    //                 <ul className="list-group">
    //                     {hotels &&
    //                     hotels.map((hotel, index) => (
    //                         <li
    //                             className={
    //                                 "list-group-item " +
    //                                 (index === currentIndex ? "active" : "")
    //                             }
    //                             onClick={() => this.setActiveTutorial(tutorial, index)}
    //                             key={index}
    //                         >
    //                             {tutorial.title}
    //                         </li>
    //                     ))}
    //                 </ul>
    //
    //                 <button
    //                     className="m-3 btn btn-sm btn-danger"
    //                     onClick={this.removeAllTutorials}
    //                 >
    //                     Remove All
    //                 </button>
    //             </div>
    //             <div className="col-md-6">
    //                 {currentTutorial ? (
    //                     <div>
    //                         <h4>Tutorial</h4>
    //                         <div>
    //                             <label>
    //                                 <strong>Title:</strong>
    //                             </label>{" "}
    //                             {currentTutorial.title}
    //                         </div>
    //                         <div>
    //                             <label>
    //                                 <strong>Description:</strong>
    //                             </label>{" "}
    //                             {currentTutorial.description}
    //                         </div>
    //                         <div>
    //                             <label>
    //                                 <strong>Status:</strong>
    //                             </label>{" "}
    //                             {currentTutorial.published ? "Published" : "Pending"}
    //                         </div>
    //
    //                         <Link
    //                             to={"/tutorials/" + currentTutorial.id}
    //                             className="badge badge-warning"
    //                         >
    //                             Edit
    //                         </Link>
    //                     </div>
    //                 ) : (
    //                     <div>
    //                         <br />
    //                         <p>Please click on a Tutorial...</p>
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // }

}