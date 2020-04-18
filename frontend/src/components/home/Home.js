import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postAttendance, getAttendance } from "../../actions/attendanceActions";
import moment from "moment";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
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
    if (time === "9:00:00 am" || time <= "6:00:00 pm") {
      this.setState({
        status: "Present",
        color: "#95e1d3"
      });
    } else if (time === "10:01:00 am" || time <= "5:00:00 pm") {
      this.setState({
        status: "Late",
        color: "#fce38a"
      });
    } else {
      this.setState({
        status: "Absent",
        color: "#f38181"
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
      username: user.username,
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
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div className='container userdetail col-sm-12'>
            <div>
              <p className='mt-5'>Hi, {user.name}</p>
              <p>Joining Date is : {moment(user.joined).format('DD-MM-YYYY')}</p>
              <p>Registered Email :{user.email}</p>
              <p>Registered Mobile : {user.mobile}</p>
              <p>current department :{user.department}</p>
            </div>
          </div>

          <div className='container markattendance mt-4 col-sm-12'>
            <div>
              <form onSubmit={this.onSubmit}>
                <p hidden={(time === "10:01:00 am" || time <= "5:00:00 pm") ? "" : "hidden"}>
                  <textarea
                    className='mt-4'
                    placeholder='Reason for being late today.. '
                    name='reason'
                    value={this.state.reason}
                    onChange={this.onChange}
                    rows='2'
                    cols='30'></textarea>
                </p>
                <p>
                  <button
                    disabled={this.state.clicks === true ? "disabled" : ""}
                    type='submit'
                    className='btn btn-success markbtn mb-4'>
                    I'm Present
                  </button>
                </p>
                <br></br>
                <p
                  className='mt-5'
                  hidden={this.state.clicks === true ? "" : "hidden"}>
                  Successfully Submitted
                </p>
              </form>
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
