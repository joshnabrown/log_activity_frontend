import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { Component } from "react";

export default class Activities extends Component {
    constructor() {
        super();

        this.deleteActivity = this.deleteActivity.bind(this)
    }

    deleteActivity(activity_id) {
        fetch(`https://log-activities.herokuapp.com/activity/delete/${activity_id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(response => {
                this.props.getAllActivities();
            })
            .catch(error => { console.log("delete activity error", error) })
    }

    componentDidMount() {
        this.props.getAllActivities();
    }

    render() {
        const activityRecords = this.props.activities.map(activities => {
            return <h3 key={activities.title}>User {activities.user_id} added - {activities.title} </h3>;
            // return <h3 key={activities.title}>User {activities.user_id} added {localStorage.id == activities.user_id ? <a onClick={() => this.deleteActivity(activities.id)}><FontAwesomeIcon icon="trash" /></a> : "-"} {activities.title} </h3>;
        });
        return (

            <div className="activities-wrapper">
                <div className="list-activities-heading">
                    <h1>List All Activities</h1>
                </div>
                <div className="activities-listed">
                    <div>{activityRecords}</div>
                </div>
            </div>
        )
    }
}
