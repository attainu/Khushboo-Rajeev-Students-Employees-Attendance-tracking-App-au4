import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className='landing' id="landingImage">
          <div className='dark-overlay landing-inner text-dark'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 text-center' >


                  <h1 className='display-3 mb-4'>EasyAttend</h1>
                  <p className='lead' >
                    {" "}
                  Create your attendance account with email that you have given
                  in the company
                </p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="fullcard">
          <div className="row">
            <div className="col-lg-6 ">
              <div className="card mt-5 border-0" id="aboutUs">
                <div className="card-body">
                  <h5 className="card-title">About Us</h5>
                  <hr></hr>
                  <p className="card-text">Delivering Easy Attendance Interface for Employees on Web. </p>

                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card mt-5 border-0" id="contactUs">
                <div className="card-body">
                  <h5 className="card-title">Contact Us</h5>
                  <hr></hr>
                  <p className="card-text">
                    Email: contact@easyattend.com
                    Contact Number: 9876543210
                    Address: 156, Easyattend, Bangaluru, 530068
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
