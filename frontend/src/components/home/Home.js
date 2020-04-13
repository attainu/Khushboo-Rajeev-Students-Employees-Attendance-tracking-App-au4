import React, { Component } from "react";
import PropTypes from "prop-types";
import { setCurrentUser } from "../../actions/authActions";
import { connect } from "react-redux";

class Home extends Component {
  componentWillMount() {
    this.props.setCurrentUser();
  }
  render() {
    return (
      <div className='container-fluid mt-5'>
        <div className='container userdetail '>
          {this.props.user.map((user, index) => (
            <div key={index}>
              <p>Hi, {user.name}</p>
              <p>Your Joining Date is : {user.joined}</p>
              <p>Your Registered Email is :{user.email}</p>
              <p>Your Registered Mobile is : {user.mobile}</p>
              <p>and Your current department is :{user.department}</p>
            </div>
          ))}
        </div>
        <div className='container markattendance mt-4'>
          <div>
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
              <button type='submit' className='btn btn-success markbtn mb-4'>
                I'm Present
              </button>{" "}
            </p>
            <br></br>
            <p className='mt-5'> Successfully Submitted</p>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { setCurrentUser })(Home);
