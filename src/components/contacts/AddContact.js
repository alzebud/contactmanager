import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "./../layout/TextInputGroup";
import uuid from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = (e, value) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    if (name.trim() === "") {
      this.setState({ errors: { name: "name is required" } });
      return;
    }

    if (email.trim() === "") {
      this.setState({ errors: { email: "email is required" } });
      return;
    }

    if (phone.trim() === "") {
      this.setState({ errors: { phone: "phone is required" } });
      return;
    }

    axios
      .post("http://jsonplaceholder.typicode.com/users", { name, email, phone })
      .then(res =>
        value.dispatch({ type: "add_contact", newContact: res.data })
      );

    this.setState({ name: "", email: "", phone: "", errors: {} });

    this.props.history.push("/");
  };

  render() {
    return (
      <Consumer>
        {value => (
          <div className="card mb-3">
            <div className="card-header">Add Contact</div>
            <div className="card-body">
              <form onSubmit={e => this.onFormSubmit(e, value)}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="enter name"
                  value={this.state.name}
                  onChange={this.onInputChange}
                  error={this.state.errors.name}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                  error={this.state.errors.email}
                />
                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="enter phone"
                  value={this.state.phone}
                  onChange={this.onInputChange}
                  error={this.state.errors.phone}
                />
                <input
                  type="submit"
                  value="Add Contact"
                  className="btn btn-block"
                />
              </form>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default AddContact;
