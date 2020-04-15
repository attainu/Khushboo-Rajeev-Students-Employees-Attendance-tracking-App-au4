import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postAttendance } from "../../actions/attendanceActions";
import attendanceReducer from "../../Redux/reducers/attendanceReducer";

class Home extends Component {
  /*  state = {
    status: false,
    click: false,
  };
  handleAttendance = () => {
    this.setState(
      {
        status: true,
        click: true,
      },
      () => {
        console.log("clicked state", this.state);
      }
    );
  }; */
  constructor() {
    super();
    this.state = {
      username: "rajeev",
      status: "",
      date: "",
      reason: "",
      errors: {},
    };
    /* binding change and submit events to "this" */
    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    //to overide the default form behaviour
    e.preventDefault();

    const attendance = {
      username: "rajeev",
      status: "",
      date: "",
      reason: "",
      errors: {},
    };

    this.props.postAttendance(attendance);
  }

  render() {
    const { user } = this.props.auth;
    console.log("user", user);

    return (
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div className='container userdetail col-sm-12'>
            <div>
              <p className='mt-5'>Hi, {user.name}</p>
              <p>Joining Date is : {user.joined}</p>
              <p>Registered Email :{user.email}</p>
              <p>Registered Mobile : {user.mobile}</p>
              <p>current department :{user.department}</p>
            </div>
          </div>

          <div className='container markattendance mt-4 col-sm-12'>
            {/* <div>
              <p>
                {" "}
                <textarea
                  className='mt-4'
                  placeholder='Reason for being late today.. '
                  name='reason'
                  rows='2'
                  cols='30'></textarea>
              </p>
              <p>
                {" "}
                <button
                  type='submit'
                  className='btn btn-success markbtn mb-4'
                  type='submit'
                  disabled={this.state.click === false ? "" : "disable"}
                  onClick={() => {
                    this.handleAttendance();
                  }}>
                  I'm Present
                </button>{" "}
              </p>
              <br></br>
              {}
              <p
                className='mt-5'
                hidden={
                  this.state.status && this.state.click === true ? "" : "hidden"
                }>
                {" "}
                Successfully Submitted
              </p>
            </div> */}
            <form onSubmit={this.onSubmit}>
              <button className='btn btn-danger' type='submit'>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  postAttendance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { postAttendance })(Home);
