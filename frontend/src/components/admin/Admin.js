import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsersAttendance } from "../../actions/attendanceActions";

class Admin extends Component {
  componentDidMount = () => {
    this.props.getAllUsersAttendance();
  };
  render() {
    const { allUsers } = this.props.leaderboardsattendance;
    console.log("allUsers", allUsers);

    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='admindiv mt-4 col-sm-4'>
            <h3> Pick a Date</h3>
            <input type='date' name='birthday' />
          </div>

          <div className='col-sm-8'>
            <h2 style={{ textAlign: "center" }}>Employees Attendance Data</h2>
            <table className='table table-striped admintable mt-2'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Employee</th>
                  <th scope='col'>Ontime</th>
                  <th scope='col'>Absent</th>
                  <th scope='col'>Late</th>
                </tr>
              </thead>
              {allUsers &&
                allUsers.map((item, index) => {
                  // console.log("asdfg", allUsers);
                  return (
                    <tbody key={index}>
                      <tr>
                        <th scope='row'> {index + 1}</th>
                        <td>
                          <img
                            className='rounded-circle'
                            src={item.avatar}
                            alt={item.name}
                            style={{ width: "25px", marginRight: "5px" }}
                          />
                          {item.name}
                        </td>
                        <td>{item.prcount.ontimeTotal}</td>
                        <td>{item.prcount.absentTotal}</td>
                        <td>{item.prcount.lateTotal}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllUsersAttendance: PropTypes.func.isRequired,
  leaderboardsattendance: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  attendance: state.attendance,
  leaderboardsattendance: state.leaderboardsattendance,
});

export default connect(mapStateToProps, { getAllUsersAttendance })(Admin);
