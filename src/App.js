import React, { Component } from "react";
import "./App.css";
import UsersTable from "./users/UsersTable";
import fetchUsers from "./users/fetchUsersImperative";

class App extends Component {
  state = {
    cities: []
  };
  async componentDidMount() {
    const cities = await fetchUsers(
      "https://randomuser.me/api/?nat=fr&results=400"
    );
    this.setState({ cities });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.cities.map(city => (
            <div key={city.name}>
              <h1>{city.name}</h1>
              <UsersTable users={city.users} />
            </div>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
