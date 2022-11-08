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
      errMessage: "",
    };
  }

  handleOnChangeUser = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnChangePassWord = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmitLogin = async () => {
    //reset status
    this.setState({
      errMessage: "",
    });
    try {
      let dataValidate = await handleLoginAPI(
        this.state.username,
        this.state.password
      );
      if (dataValidate && dataValidate.errCode !== 0) {
        this.setState({
          errMessage: dataValidate.messenger,
        });
      }
      if (dataValidate && dataValidate.errCode === 0) {
        console.log(dataValidate.user);
        console.log("login done");
        this.props.userLoginSuccess(dataValidate.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.messenger,
          });
        }
      }
      console.log(e.response);
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
            <div className="warning-color" style={{ color: "red" }}>
              {this.state.errMessage}
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
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
