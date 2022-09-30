import React, { Component } from "react";

export default class AddActivityForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: "",
            selected_rating: "",
            new_activity: "",
            new_activity_id: "",
            rating_id: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.addActivityRating = this.addActivityRating.bind(this);
    }

    addActivityRating() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                activity_id: this.state.new_activity_id,
                rating_id: this.state.rating,
                user_id: localStorage.id
            })
        };

        fetch("https://log-activities.herokuapp.com/activityrating/add", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response))

            .catch(error => console.log("Error adding an activity rating", error))
    }

    handleSubmit(event) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.new_activity,
                user_id: localStorage.id
            })
        };
        fetch("https://log-activities.herokuapp.com/activity/add", requestOptions)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    new_activity_id: response.id,
                })
                this.addActivityRating();
                this.setState({
                    new_activity: "",
                    selected_rating: ""
                })
                this.props.getAllActivities();
            })
            .catch(error => console.log("Error adding an activity", error))

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDropdown(event) {
        this.setState({
            rating: event.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="add-activity-header">
                    <h1>Add Activity</h1>
                </div>
                <form onSubmit={this.handleSubmit} className="add-activity-form">
                    <div className="add-activity-inputs">
                        <label>
                            Rating:
                            <select name="selected_rating" onChange={this.handleDropdown}>
                                <option value="1">I love</option>
                                <option value="2">I really enjoy</option>
                                <option value="3">I am amused</option>
                                <option value="7">I can't wait to try</option>
                                <option value="8">I might really enjoy</option>
                                <option value="4">I am fine</option>
                                <option value="9">I am interested in</option>
                                <option value="10">I might be fine</option>
                                <option value="11">I am uninterested in</option>
                                <option value="5">I do not enjoy</option>
                                <option value="12">I do not want to try</option>
                                <option value="13">I cannot try</option>
                                <option value="6">I do not like</option>
                            </select>
                        </label>

                        <label>
                            Activity:
                            <input
                                type="text"
                                onChange={this.handleChange}
                                name="new_activity"
                                placeholder="New Activity"
                                value={this.state.new_activity}
                            />
                        </label>
                    </div>
                    <div className="add-activity-submit">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}