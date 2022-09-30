import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationComponent from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import AddActivities from './pages/add-activities';

import Login from './pages/login';
import Icons from '../helpers/icons';
import NewUser from './pages/new-user';

export default class App extends Component {
  constructor(props) {
    super(props);
    Icons();

    this.state = {
      db_logged_in: "not yet",
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  handleSuccessfulAuth() {
    console.log("hit handleSuccessfulAuth");
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`https://log-activities.herokuapp.com/login/${localStorage.id}`, requestOptions)
      .then(response => response.json())
      .then(response => {
        this.setState({ loggedInStatus: "LOGGED_IN" });
        console.log("handleSucccessfulAuth:", loggedInStatus, response);
      })
      .catch(error => {
        this.setState({ errorText: "An Error Occurred" });
      });

  }

  handleUnsuccessfulAuth() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    if (localStorage.id !== "none") {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`https://log-activities.herokuapp.com/user/get/${localStorage.id}`, requestOptions)
        .then(response => response.json())
        .then(response => {
          this.setState({ db_logged_in: response.db_logged_in })
          if (this.state.db_logged_in === "LOGGED_IN") {
            this.setState({ loggedInStatus: "LOGGED_IN" })
          }
        })
        .catch(error => {
          console.log("An Error occurred at checkLogin Status", error);
        });
    } else {
      this.setState({ loggedInStatus: "NOT_LOGGED_IN" })
      localStorage.setItem("id", "none")
    }
  }

  componentDidMount() {
    this.checkLoginStatus();

  }

  loginRoute() {
    return [
      <Route to="/login" key="login-page"
        render={props => (
          <Login
            {...props}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
          />
        )}
      />
    ]
  }

  render() {
    return (
      <div className="container">
        <div className="app">
        </div>
        <Router>
          <div>
            <NavigationComponent
              key="navigation"
              loggedInStatus={this.state.loggedInStatus}
            />

            <Switch>
              {this.state.loggedInStatus === "LOGGED_IN"
                ? <Route exact path="/" push key="home-page"
                  render={props => (<Home {...props} />)}
                />
                : null}

              {this.state.loggedInStatus === "LOGGED_IN"
                ? <Route path="/add-activities" key="add-activities" component={AddActivities}
                />
                : null}

              <Route path="/about" key="about" component={About} />
              <Route path="/contact" key="contact" component={Contact} />
              <Route path="/new-user" key="new-user" component={NewUser} />

              {this.state.loggedInStatus === "NOT_LOGGED_IN"
                ? (this.loginRoute())
                : null}
            </Switch>

          </div>
        </Router>
      </div>
    );
  }
}