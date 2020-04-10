import React, { Component } from "react";
import axios from 'axios';
//import PropTypes from "prop-types"; */
import { getUserDetails } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


class Home extends Component {

  state = {
    userdetails: []
  };


  /* componentDidMount = () => {
    this.getUserDetails();
  }
  getUserDetails = () => {
    console.log("started");
    axios
      .get("http://localhost:8080/home")
      .then(res => {
        //res.data
        console.log("res", res.data);

        this.setState({
          ...this.state,
          userdetails: res.data
        })
      }
      )
      .catch(err =>
        console.log("eroor", err)
      );
  };
   */



  render() {
    console.log("this.state", this.state);
    return (
      <div className="container-fluid mt-5">
        <div className="container userdetail ">
          {this.props.UserDetails.map((userdetails) => {
            return (
              <p>
                <p className="mt-5"> Hi, {userdetails.user_name}</p>
                <p> Joining Date: {userdetails.joining_date} </p>
                <p> Registered Email ID:  {userdetails.registered_emailid}</p>
                <p>Registered Mo. No. {userdetails.registered_contactno} </p>
                <p> Department:  {userdetails.department}</p>
              </p>
            )
          })}


        </div>



        <div className="container markattendance mt-4">
          <div >
            <p> <textarea className="mt-4" placeholder="Reason for being late today.. " name="reason"
              rows="2" cols="30"></textarea></p>
            <p> <button type="submit" className="btn btn-success markbtn mb-4">I'm Present</button> </p>
            <br></br>
            <p className="mt-5"> Successfully Submitted</p>

          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({

  UserDetails: state.udetails

}, console.log("state", state.udetails));

export default connect(mapStateToProps, { getUserDetails })(withRouter(Home));
//export default Home;
