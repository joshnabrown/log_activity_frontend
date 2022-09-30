import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";


export default class NavigationContainer extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
    }

    handleSuccessfulLogout() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://log-activities.herokuapp.com/logout/${localStorage.id}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                localStorage.setItem("id", "none");
                this.setState({ loggedInStatus: "NOT_LOGGED_IN" })
            })
            .catch(error => {
                this.setState({ errorText: "An Error Occurred" });
                this.props.handleUnsuccessfulAuth();
            });
        window.location.reload();
    }

    render() {
        return (
            <div className="nav-wrapper">
                <div className="logo">
                    <NavLink to="/">Log Activities</NavLink>
                </div>
                <div className="big-filters">
                    {this.props.loggedInStatus === 'LOGGED_IN'
                        ? <NavLink to="/add-activities">
                            <FontAwesomeIcon icon="fa-solid fa-square-plus" />
                        </NavLink>
                        : null}
                    <FontAwesomeIcon icon="fa-solid fa-heart" />
                    <FontAwesomeIcon icon="fa-solid fa-bucket" />
                    <FontAwesomeIcon icon="fa-solid fa-thumbs-down" />
                    <FontAwesomeIcon icon="fa-solid fa-ban" />

                </div>
                <div className="nav-links">
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {this.props.loggedInStatus === 'LOGGED_IN'
                        ? <a onClick={this.handleSuccessfulLogout}>
                            User {localStorage.id}
                            <FontAwesomeIcon icon="sign-out-alt" />
                        </a>
                        : null}
                </div>

            </div>

        );
    }

};

