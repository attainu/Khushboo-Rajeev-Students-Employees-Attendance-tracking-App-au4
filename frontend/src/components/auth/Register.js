import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames"; //this package allows us to have conditional classnames , we are using it to change bootstrap class for error display
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
      department: "",
      mobile: "",
      joined: "",
      avatar: "",
      password: "",
      password2: "",
      errors: {},
      buttonstatus: false,
      emaildb: [
        "admin@gmail.com",
        "rajeev@gmail.com",
        "khushboo@gmail.com",
        "ctopp0@gmail.com",
        "noteague1@gmail.com",
        "ltonepohl2@gmail.com",
        "lfesby3@gmail.com",
        "eworsalls4@gmail.com",
        "cdentith5@gmail.com",
        "sboak6@gmail.com",
        "bcoxen7@gmail.com",
        "landree8@gmail.com",
        "rgrzeszczyk9@gmail.com",
      ],
    };

    /* binding change and submit events to "this" */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  //getting errors from redux and storing it in component state
  componentWillReceiveProps(errorsFromReducers) {
    if (errorsFromReducers.errors) {
      this.setState({ errors: errorsFromReducers.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnClickInDept = () => {
    for (let i = 0; i <= this.state.emaildb.length; i++)
      if (this.state.email === this.state.emaildb[i]) {
        console.log(
          "setting button status to false current status:",
          this.state.buttonstatus
        );
        this.setState({
          buttonstatus: false,
        });
      } else {
        console.log(
          "not matched setting button status to true again current status:",
          this.state.buttonstatus
        );
        this.setState({
          buttonstatus: true,
        });
      }
  };

  onSubmit(e) {
    //to overide the default form behaviour
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      avatar: this.state.avatar,
      department: this.state.department.toUpperCase(),
      mobile: this.state.mobile,
      joined: this.state.joined,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    //destructuring errors

    const { errors } = this.state;

    return (
      <div className='register'>
        <div className='container mb-5'>
          <div className='row'>
            <div className='col-md-5 m-auto'>
              <h2 className='display-4 text-center'>Sign Up</h2>
              <form noValidate onSubmit={this.onSubmit}>
                {/******************** NAME INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder='name'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className='invalid-feedback'>{errors.name}</div>
                  )}
                </div>
                {/******************** USERNAME INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    placeholder='Username'
                    name='username'
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className='invalid-feedback'>{errors.username}</div>
                  )}
                </div>
                {/******************** EMAIL INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='email'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder='Email Address'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                  {/* <small className='form-text text-muted'>
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small> */}
                </div>
                {/******************** DEPARTMENT INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.department,
                    })}
                    placeholder='Department'
                    name='department'
                    value={this.state.department}
                    onChange={this.onChange}
                    onClick={this.handleOnClickInDept}
                  />
                  {errors.department && (
                    <div className='invalid-feedback'>{errors.department}</div>
                  )}
                </div>
                {/******************** MOBILE INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='number'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.mobile,
                    })}
                    placeholder='Mobile'
                    name='mobile'
                    value={this.state.mobile}
                    onChange={this.onChange}
                  />
                  {errors.mobile && (
                    <div className='invalid-feedback'>{errors.mobile}</div>
                  )}
                </div>
                {/******************** JOINED INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='date'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder='joining date'
                    name='joined'
                    value={this.state.joined}
                    onChange={this.onChange}
                  />
                  {errors.joined && (
                    <div className='invalid-feedback'>{errors.joined}</div>
                  )}
                </div>
                {/******************** PASSWORD1 INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
                </div>
                {/******************** PASSWORD2 INPUT FILED ********************/}
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder='Confirm Password'
                    name='password2'
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className='invalid-feedback'>{errors.password2}</div>
                  )}
                </div>
                {/******************** SUBMIT BUTTON INPUT FILED ********************/}
                <button
                  className='btn btn-danger mb-5'
                  type='submit' /*
                  disabled={this.state.buttonstatus} */
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//typechecking
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
