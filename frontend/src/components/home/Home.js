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
          <div>
            <p className='mt-5'>Hi, {user.name}</p>
            <p>Joining Date : {user.joined}</p>
            <p>Registered Email :{user.email}</p>
            <p>Registered Mobile : {user.mobile}</p>
            <p>Department :{user.department}</p>
          </div>
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
