import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postAttendance, getAttendance } from "../../actions/attendanceActions";
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
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const time = moment().format("h:mm:ss a");
    if (time === "9:00:00 am" || time <= "10:00:00 am") {
      this.setState({
        status: "Ontime",
        color: "#95e1d3",
      });
    } else if (time === "10:01:00 am" || time <= "5:00:00 pm") {
      this.setState({
        status: "Late",
        color: "#fce38a",
      });
    } else {
      this.setState({
        status: "Absent",
        color: "#f38181",
      });
    }
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
  }

  render() {
    const time = moment().format("h:mm:ss a");
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
        <div className='row'>
          <div className='col lg-6'>
            <div className='card mt-5 border-0'>
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
                      // wee need to use visiblity class to show and hide textarea
                      // className='invisible'
                      /* hidden={
                        time === "9:00:00 am" || time <= "10:00:00 am"
                          ? ""
                          : "hidden"
                      } */
                    ></textarea>
                  </div>
                  <button type='submit' className='btn btn-success'>
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
    );
  }
}
Home.propTypes = {
  auth: PropTypes.object.isRequired,
  postAttendance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  attendance: state.userAttendance,
});

export default connect(mapStateToProps, { postAttendance, getAttendance })(
  Home
);
