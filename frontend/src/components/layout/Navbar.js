import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (user.email === "admin@gmail.com") {
      console.log("u are admin");
      /* show logout button only */
      var authLinks = (
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'></li>
          <li className='nav-item'>
            <Link className='nav-link' to='/admin'>
              Admin
            </Link>
          </li>
          <li className='nav-item'>
            <div className='btn-group' role='group'>
              <button
                id='btnGroupDrop1'
                type='button'
                className='btn dropdown-toggle'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                <img
                  className='rounded-circle'
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: "25px", marginRight: "5px" }}
                  title='You must have a Gravatar connected to your email to display an image'
                />
                {user.username}
              </button>
              <div className='dropdown-menu' aria-labelledby='btnGroupDrop1'>
                <a
                  href='/'
                  onClick={this.onLogoutClick.bind(this)}
                  className='nav-link btnGroupDrop1'
                  id='logout'>
                  <i className='fas fa-sign-out-alt'></i>Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
      );
    } else {
      /* show user links */
      var authLinks = (
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/home'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/report'>
              Report
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/leaderboards'>
              Leaderboards
            </Link>
          </li>

          <li className='nav-item'>
            <div className='btn-group' role='group'>
              <button
                id='btnGroupDrop1'
                type='button'
                className='btn dropdown-toggle'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                <img
                  className='rounded-circle'
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: "25px", marginRight: "5px" }}
                  title='You must have a Gravatar connected to your email to display an image'
                />
                {user.username}
              </button>
              <div className='dropdown-menu' aria-labelledby='btnGroupDrop1'>
                <a
                  href='/'
                  onClick={this.onLogoutClick.bind(this)}
                  className='nav-link '
                  id='logout'>
                  <i className='fas fa-sign-out-alt'></i>Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
      );
    }

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className='navbar navbar-expand-md navbar-dark bg dark mb-5'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>
              EasyAttend
            </Link>
            <button
              className='navbar-toggler collapsed'
              type='button'
              data-toggle='collapse'
              data-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'>
              <ul className='navbar-nav ml-auto'>
                <div
                  className='collapse navbar-collapse'
                  id='navbarSupportedContent'>
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
