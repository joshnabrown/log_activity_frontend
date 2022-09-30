import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class NewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }


    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        };
        fetch("https://log-activities.herokuapp.com/user/add", requestOptions)
            .then(response => response.json())

            .catch(error => {
                this.setState({ errorText: "An Error occurred" });
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="container-wrapper">
                <div className="logo-wrapper">
                    <div className="logo">
                        <h1>Log Experiences</h1>
                    </div>
                    <div className="tag-line">
                        <h2>Log What You Love</h2>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">

                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <FontAwesomeIcon icon="lock" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>{this.state.errorText}</div>
                    <button className="btn" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        )
    }
}