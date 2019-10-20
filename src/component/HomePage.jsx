import Header from "./Headers";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Spin, Table } from "antd";

const coloumn = [
  {
    title: "Row Number",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "Tweets",
    dataIndex: "tweet",
    key: "tweet"
  }
];
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
    searchText: null,
    searchedTweets: [],
    loader: false
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
      searchText: target.value
    });
  };
  callSearchApi = async () => {
    this.setState({
      loader: true
    });
    await fetch("http://localhost:4000/auth/search/tweet", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ text: this.state.searchText }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(result => {
      //console.log(result.json());
      result.json().then(data => {
        var resArr = [];
        data.responseObj.map((value, index) => {
          resArr.push({ key: index, tweet: value });
        });
        this.setState({
          searchedTweets: resArr,
          loader: false
        });
      });
    });
    //var response = callApifun();
  };
  /* callApifun = () => {
    return new Promise(function(resolve,reject){
      fetch("http://localhost:4000/auth/search/tweet", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ text: this.state.searchText }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then()
    })
  } */
  render() {
    const { authenticated } = this.state;
    console.log(this.state);
    // if (authenticated) {
    //   console.log(this.props);
    //   this.props.history.push("/search");
    // }
    return (
      <Spin spinning={this.state.loader}>
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
                <input
                  type="text"
                  placeholder="Enter hashtag"
                  onChange={this.setSearchCriteria}
                ></input>
                <button onClick={this.callSearchApi}>Search</button>
                <div>
                  {this.state.searchedTweets.length > 0 ? (
                    <Table
                      dataSource={this.state.searchedTweets}
                      columns={coloumn}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Spin>
    );
  }
}
