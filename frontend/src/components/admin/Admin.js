import React, { Component } from "react";

class Admin extends Component {
  render() {
    return (
      <div className='container-fluid mt-5'>
        <div className='admindiv mt-4 '>
          <h3> Pick a Date</h3>
          <input type='date' name='birthday' />
        </div>
        <h2 style={{ textAlign: "center" }}>Employees Attendance Data</h2>
        <table className='table table-striped admintable mt-2'>
          <thead>
            <tr>
              <th scope='col'>Employee</th>
              <th scope='col'>Present</th>
              <th scope='col'>Absent</th>
              <th scope='col'>Late</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rajeev Ranjan</td>
              <td>26</td>
              <td>0</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Khushboo Goyal</td>
              <td>22</td>
              <td>4</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Zibran</td>
              <td>18</td>
              <td>8</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Admin;
