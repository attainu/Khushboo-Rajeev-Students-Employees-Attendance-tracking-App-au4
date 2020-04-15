import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postAttendance } from "../../actions/attendanceActions";
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
      clicks: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const time = moment().format("h:mm:ss a");
    if (time >= "9:00:00 am" || time <= "10:00:00 am") {
      this.setState({
        status: "Present",
      });
    } else if (time >= "10:01:00 am" || time >= "5:00:00 pm") {
      this.setState({
        status: "Late",
      });
    } else {
      this.setState({
        status: "Absent",
      });
    }
  }

  onSubmit(e) {
    //to overide the default form behaviour
    e.preventDefault();
    //for showing success message on front end
    this.setState({
      clicks: true,
    });
    // setting data to be sent to postAttendance function
    const { user } = this.props.auth;
    console.log("consoling name ", user.name);
    const attendance = {
      username: user.username,
      status: this.state.status,
      date: Date.now(),
      reason: "",
      errors: {},
    };

    this.props.postAttendance(attendance);
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className='container-fluid mt-5'>
        {/* BLUE BOX DATA */}
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
          {/* GREEN BOX DATA */}
          <div className='container markattendance mt-4 col-sm-12'>
            <div>
              <form onSubmit={this.onSubmit}>
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
                    className='btn btn-success markbtn mb-4'>
                    Mark attendance
                  </button>{" "}
                </p>
                <br></br>
                {}
                <p
                  className='mt-5'
                  hidden={this.state.clicks === true ? "" : "hidden"}>
                  {" "}
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
});

export default connect(mapStateToProps, { postAttendance })(Home);
