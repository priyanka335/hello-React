import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUserAction, addUserAction, updateUserAction } from "./actions";
class CRUD extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myUser: {
        id: "",
        title: "",
        url: "",
        thumbnailurl: "",
      },
      index: "",
      isEdit: false,
    };
  }

  handleDelete = (user) => {
    this.props.dispatch(deleteUserAction(user));
  };

  handleClear = () => {
    let user = { id: "", title: "", url: "", thumbnailurl: "" };
    this.setState({ myUser: user });
  };
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let user = { ...this.state.myUser };
    user[name] = value;
    this.setState({ myUser: user });
  };

  handleSubmit = () => {
    this.props.dispatch(addUserAction(this.state.myUser));
    this.handleClear();
  };

  handleEdit = (user, i) => {
    this.setState({ myUser: user, isEdit: true, index: i });
  };
  handleUpdate = () => {
    let user = { ...this.state.myUser };
    user.index = this.state.index;
    this.props.dispatch(updateUserAction(user));
    this.handleClear();
    this.setState({ isEdit: false });
  };
  render() {
    const { users } = this.props;
    const { myUser, isEdit } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="id">ID :</label>
          <input
            type="text"
            value={myUser.id}
            name="id"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />{" "}
          <br />
          <label htmlFor="title">title:</label>
          <input
            type="text"
            value={myUser.title}
            name="title"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />{" "}
          <br />
          <label htmlFor="url">url :</label>
          <input
            type="text"
            value={myUser.url}
            name="username"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />{" "}
          <br />
          <label htmlFor="thmubnailurl">thumbnailurl : </label>
          <input
            type="text"
            value={myUser.thumbnailurl}
            name="password"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />{" "}
          <br />
          {!isEdit && (
            <button type="button" onClick={this.handleSubmit}>
              Add User
            </button>
          )}
          {isEdit && (
            <button type="button" onClick={this.handleUpdate}>
              Update User
            </button>
          )}
        </form>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.title}</td>
                  <td>{user.url}</td>
                  <td>{user.thumbnailurl}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleEdit(user, i);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleDelete(user);
                      }}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(CRUD);
