import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class Home extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <div className="home-wrapper">
                    <div className="welcome-page">
                        <div className="welcome-heading">
                            <h1>Welcome to Log Activities!</h1>
                        </div>
                        <div className="navigation-descriptions">
                            <h2><FontAwesomeIcon icon="fa-solid fa-square-plus" /> - Add new Activities</h2>
                            <h2><FontAwesomeIcon icon="fa-solid fa-heart" /> - filter by favorites! </h2>
                            <h2><FontAwesomeIcon icon="fa-solid fa-bucket" /> - filter by bucket list activities</h2>
                            <h2><FontAwesomeIcon icon="fa-solid fa-thumbs-down" /> - filter by not liked activities</h2>
                            <h2><FontAwesomeIcon icon="fa-solid fa-ban" /> - filter by not interesting activities</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}