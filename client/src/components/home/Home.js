import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchUser } from "../../actions/userAction";
import { connect } from "react-redux";

class Home extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div className='container-fluid mt-5'>
        <div className='container userdetail '>
          {this.props.user.map((user) => (
            <div>
              <h5>Hi, {user.user_name}</h5>
              <h5>Your Joining Date is : {user.joining_date}</h5>
              <h5>Your Registered Email is :{user.registered_emailid}</h5>
              <h5>Your Registered Mobile is : {user.registered_contactno}</h5>
              <h5>and Your current department is :{user.department}</h5>
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
  user: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { fetchUser })(Home);
