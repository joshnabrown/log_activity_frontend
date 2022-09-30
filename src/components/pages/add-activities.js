import React, { Component } from "react";
import Activities from "../activities/activities";
import AddActivityForm from "../forms/add-activity-form";


export default class AddActivities extends Component {
    constructor() {
        super();

        this.state = {
            activities: []
        }

        this.getAllActivities = this.getAllActivities.bind(this);
    }

    getAllActivities() {
        fetch("https://log-activities.herokuapp.com/activity/get", { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    activities: response
                })
            })
            .catch(error => console.log("Error getting activities", error))
    }

    render() {
        return (
            <div>
                <div className="home-wrapper">
                    <div className="add-activity-container">
                        <AddActivityForm
                            getAllActivities={this.getAllActivities}
                        />
                    </div>
                    <div className="list-activities-wrapper">
                        <Activities
                            getAllActivities={this.getAllActivities}
                            activities={this.state.activities}
                        />
                    </div>
                </div>
            </div>
        )
    }
}