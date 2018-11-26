import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "delete_contact":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.id)
      };
    case "add_contact":
      const newState = { ...state };
      newState.contacts = [...newState.contacts, action.newContact];
      return newState;
    case "update_contact":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    this.setState({ contacts: res.data });
  }

  // componentDidMount() {
  //   axios
  //     .get("http://jsonplaceholder.typicode.com/users")
  //     .then(res => this.setState({ contacts: res.data }));
  // }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
