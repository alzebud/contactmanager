import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "./../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/users/${id}`
    );
    console.log(res);
    const { name, email, phone } = res.data;
    this.setState({ name, email, phone });
  }

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = async (e, value) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    const { id } = this.props.match.params;

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

    const res = await axios.put(
      `http://jsonplaceholder.typicode.com/users/${id}`,
      { name, email, phone }
    );

    value.dispatch({ type: "update_contact", payload: res.data });

    this.setState({ name: "", email: "", phone: "", errors: {} });

    this.props.history.push("/");
  };

  render() {
    return (
      <Consumer>
        {value => (
          <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
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
                  value="Update Contact"
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

export default EditContact;
