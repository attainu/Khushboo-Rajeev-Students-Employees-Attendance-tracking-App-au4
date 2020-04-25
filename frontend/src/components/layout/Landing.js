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
          <div class="row">
            <div class="col-lg-6 ">
              <div class="card mt-5 border-0" id="aboutUs">
                <div class="card-body">
                  <h5 class="card-title">About Us</h5>
                  <hr></hr>
                  <p class="card-text">Delivering Easy Attendance Interface for Employees on Web. </p>

                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card mt-5 border-0" id="contactUs">
                <div class="card-body">
                  <h5 class="card-title">Contact Us</h5>
                  <hr></hr>
                  <p class="card-text">
                    Email: contact@easyattend.com
                    Contact Number: 9876543210
                    Address: 156, Easyattend, Bangaluru, 530068
                </p>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container">
          <div className="card" id="aboutUs">
            <p> Delivering Easy Attendance Interface for Employees on Web.</p>

          </div>
          <div className="card" id="contactUs">
            <p> Email: contact@easyattend.com</p>
            <p> Contact Number: 9876543210</p>
            <p> Address: 156, Easyattend, Bangaluru, 530068 </p>
          </div>
        </div> */}
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
