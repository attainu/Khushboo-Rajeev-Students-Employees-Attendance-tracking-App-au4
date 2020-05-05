import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  postAttendance,
  getAttendance,
  getAttendanceTime,
} from "../../actions/attendanceActions";
import { getCurrentUser } from "../../actions/authActions";
import moment from "moment";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      username: "",
      name: "",
      status: "",
      date: "",
      reason: "",
      errors: {},
      color: "",
      clicks: false,
      invisible: "visible",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const time = new Date().getHours();
    if (time === 9 && time < 10) {
      this.setState({
        status: "Ontime",
        color: "#27A644",
      });
    } else if (time === 10 && time < 12) {
      this.setState({
        status: "Late",
        color: "#ffc93c",
      });
    } else {
      this.setState({
        status: "Late",
        color: "#FE0739",
      });
    }
    const { user } = this.props.auth;
    if (user.email === "admin@gmail.com") {
      this.setState({
        invisible: "invisible",
      });
    }
    let date = Date.now();
    let currentDate = moment(date).format("DD-MM-YYYY");
    //console.log("currentDate", currentDate);
    const { userAttendanceResponse } = this.props.homepageattendance;
    //console.log("userAttendanceResponse", userAttendanceResponse);
    var userAttendanceResponseMap = [];
    userAttendanceResponse.forEach(function (userAttendanceResponse) {
      var attendanceOfUser = userAttendanceResponse.attendance;
      attendanceOfUser.forEach(function (x) {
        let today = moment(x.date).format("DD-MM-YYYY");
        //console.log("today", today);
        userAttendanceResponseMap.push(today);
      });
      //console.log('userAttendanceResponseMap', userAttendanceResponseMap);
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      clicks: true,
    });
    const { user } = this.props.auth;
    const attendance = {
      avatar: user.avatar,
      username: user.username,
      name: user.name,
      status: this.state.status,
      date: Date.now(),
      reason: this.state.reason,
      color: this.state.color,
      errors: {},
    };
    this.props.postAttendance(attendance);
    this.props.getAttendanceTime();
  }
  render() {
    let kitkat = this.props.currentuser;
    // console.log("kitkat", kitkat);
    let date = Date.now();
    let currentDate = moment(date).format("DD-MM-YYYY");
    //console.log("currentDate", currentDate);
    const { userAttendanceResponse } = this.props.homepageattendance;
    //console.log("userAttendanceResponse", userAttendanceResponse);
    var userAttendanceResponseMap = [];
    userAttendanceResponse.forEach(function (userAttendanceResponse) {
      var attendanceOfUser = userAttendanceResponse.attendance;
      attendanceOfUser.forEach(function (x) {
        let today = moment(x.date).format("DD-MM-YYYY");
        //console.log("today", today);
        userAttendanceResponseMap.push(today);
      });
      //console.log('userAttendanceResponseMap', userAttendanceResponseMap);
    });
    const time = new Date().getHours();
    //console.log(time);
    const { user } = this.props.auth;
    return (
      <div className='container'>
        <div className='row userinfo'>
          <div className='col-lg-6'>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: "200px", marginRight: "5px" }}
            />
            <h4>{user.name}</h4>
          </div>
          <div className='col-lg-6'>
            <table className='table table-borderless'>
              <tbody>
                <tr>
                  <th scope='row'>Joined on</th>
                  <td>{moment(user.joined).format("DD-MM-YYYY")}</td>
                </tr>
                <tr>
                  <th scope='row'>Registered Mobile</th>
                  <td>{user.mobile}</td>
                </tr>
                <tr>
                  <th scope='row'>Registered Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th scope='row'>Department</th>
                  <td>{user.department}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='container row'>
          <div className='col lg-3'>
            <div className={this.state.invisible}>
              <div className='card mt-5 border-0' id='attedanceCard'>
                <div className='card-body'>
                  <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <textarea
                        className='form-control'
                        placeholder='reason why you were late'
                        name='reason'
                        rows='3'
                        value={this.state.reason}
                        onChange={this.onChange}
                        hidden={
                          time === 10 && time < 12 ? "" : "hidden"
                        }></textarea>
                    </div>
                    <button
                      type='submit'
                      className='btn btn-success'
                      disabled={
                        userAttendanceResponseMap.includes(currentDate) ||
                          time > 12
                          ? "disabled"
                          : ""
                      }>
                      Mark attendance
                    </button>
                  </form>
                  <div className='successmessage'>
                    <p
                      className='mt-4'
                      hidden={this.state.clicks === true ? "" : "hidden"}>
                      Successfully Submitted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  auth: PropTypes.object.isRequired,
  postAttendance: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  currentuser: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  attendance: state.userAttendance,
  homepageattendance: state.homepageattendance,
  currentuser: state.currentuser,
});
export default connect(mapStateToProps, {
  postAttendance,
  getAttendance,
  getAttendanceTime,
  getCurrentUser,
})(Home);


