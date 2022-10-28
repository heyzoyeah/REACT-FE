import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./login.scss";
import { handleLoginAPI } from "../../services/userService";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleOnChangeUser = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnChangePassWord = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmitLogin = async () => {
    try {
      await handleLoginAPI(this.state.username, this.state.password);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let { username, password } = this.state;
    return (
      <>
        <div className="materialContainer">
          <div className="box">
            <div className="title">LOGIN</div>
            <div className="input">
              <input
                type="text"
                value={username}
                placeholder="USERNAME"
                onChange={(event) => this.handleOnChangeUser(event)}
              />
              <span className="spin"></span>
            </div>

            <div className="input">
              <input
                type="password"
                value={password}
                placeholder="PASSWORD"
                onChange={(event) => this.handleOnChangePassWord(event)}
              />
              <span className="spin"></span>
            </div>

            <div className="button login">
              <button
                onClick={() => {
                  this.handleSubmitLogin();
                }}
              >
                <span>GO</span> <i className="fa fa-check"></i>
              </button>
            </div>

            {/* <a href="" class="pass-forgot">
              Forgot your password?
            </a> */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
