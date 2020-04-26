import React, { Component } from "react";

export default class Requests extends Component {
  render() {
    return (
      <div className='container mt-5'>
        <div className='row'></div>
        <div className='col-lg-12 '>
          <table className='table table-striped requesttable'>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Department</th>
                <th scope='col'>Email</th>
                <th scope='col'>Message</th>

                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope='row'>Khushboo Goyal</th>
                <td>CSE</td>
                <td>khushboo@gmail.com </td>
                <td className='reasontd'>Fever-7th may</td>
                <td className='actionbtn'>
                  {" "}
                  <button className='btn btn-success '>
                    <i className='fas fa-check'></i>
                  </button>
                  <button className='btn btn-danger mr-2'>
                    <i className='fas fa-times'></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope='row'>Rajeev Ranjan</th>
                <td>IT</td>
                <td>rajeev@gmail.com </td>
                <td className='reasontd'>Dengue-14th may</td>
                <td className='actionbtn'>
                  {" "}
                  <button className='btn btn-success '>
                    <i className='fas fa-check'></i>
                  </button>
                  <button className='btn btn-danger mr-2'>
                    <i className='fas fa-times'></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
