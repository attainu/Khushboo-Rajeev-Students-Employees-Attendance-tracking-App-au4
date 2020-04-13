import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Late from "./Late";
import Ontime from "./Ontime";
import moment from "moment";

class Home extends Component {
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      /* rendering user data provided by the user */
      <div className='container-fluid mt-5'>
        <div className='container userdetail '>
          <p>Hi, {user.name}</p>
          <p>Your Joining Date is : {user.joined}</p>
          <p>Your Registered Email is :{user.email}</p>
          <p>Your Registered Mobile is : {user.mobile}</p>
          <p>and Your current department is :{user.department}</p>
        </div>
        {/* conditionally rendering the I'm Present button */
        /* rendering NORMAL
        form between the time 9 am to 10 pm */}
        {console.log(moment().format("HH:mm:ss"))}
        <Ontime />
        {/* rendering LATE form between the time 10:01 am to 5 pm */}
        <Late />
        {/*after 5 pm setting attendance to ABSENT by default */}
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
