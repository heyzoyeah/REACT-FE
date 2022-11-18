import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { handleGetUser } from "../../services/userService";
import "../System/UserManage.scss";

import ModalCreateUser from "./modalCreateUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrUser: [],
    };
  }

  async componentDidMount() {
    let response = await handleGetUser("ALL");
    //check điều kiện
    if (response && response.errCode === 0) {
      this.setState({
        ArrUser: response.users,
      });
    }
  }

  render() {
    let { ArrUser } = this.state;

    return (
      <div className="text-center">
        <h1>User</h1>
        <div>
          <button>+ create User</button>

          <ModalCreateUser></ModalCreateUser>
        </div>
        <table id="customers">
          <tr>
            <th>id</th>
            <th>email</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>address</th>
            <th>phonenumber</th>
            <th>gender</th>
            <th>roleId</th>
            <th>positionId</th>
            <th>image</th>
            <th>Action</th>
          </tr>
          {ArrUser &&
            ArrUser.length > 0 &&
            ArrUser.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.phonenumber}</td>
                  <td>{item.gender}</td>
                  <td>{item.roleId}</td>
                  <td>{item.positionId}</td>
                  <td>{item.image}</td>
                  <td>
                    <button className="btn btn-info m-2 px-4">EDIT</button>
                    <button className="btn btn-danger m-2 px-4">DELETE</button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
