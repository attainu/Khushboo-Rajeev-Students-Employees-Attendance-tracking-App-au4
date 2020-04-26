import React, { Component } from "react";

export default class LeaveRequest extends Component {
  render() {
    return (
      <div class='container' id='leavediv'>
        <div className='row'>
          <div className='col-sm-5'>
            <h2 className='mt-5'>Leave Request</h2>
          </div>
          <div class='col-sm-7'>
            <form action=''>
              <textarea
                className='form-control '
                name='leave'
                id='leaveRequest'
                cols='30'
                rows='10'
                placeholder='Type here...'></textarea>
              <button type='submit' className='btn btn-success mt-3'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
