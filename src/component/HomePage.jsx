import Header from "./Headers";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class HomePage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      profileImageUrl: PropTypes.string,
      twitterId: PropTypes.string,
      screenName: PropTypes.string,
      _id: PropTypes.string
    })
  };

  state = {
    user: {},
    error: null,
    authenticated: false,
    searchText : null
  };

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  setSearchCriteria = ({ target }) => {
    this.setState({
      searchText:target.value
    })
  }
  callSearchApi = () => {
    fetch("http://localhost:4000/auth/search/tweet",{
      method: "POST",
      credentials: "include",
      body:JSON.stringify({"text":this.state.searchText}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(res => {
      console.log(res);
      
    })
  }
  render() {
    const { authenticated } = this.state;
    console.log(this.state);
    // if (authenticated) {
    //   console.log(this.props);
    //   this.props.history.push("/search");
    // }
    return (
      <div>
        <Header
          authenticated={authenticated}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        <div>
          {!authenticated ? (
            <h1>Welcome!</h1>
          ) : (
            <div>
              <h1>You have login succcessfully!</h1>
              <h2>Welcome {this.state.user.name}!</h2>
              <label>Search tweets: </label>
              <input type="text" placeholder="Enter hashtag" onChange={this.setSearchCriteria}></input>
              <button onClick={this.callSearchApi}>Search</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
