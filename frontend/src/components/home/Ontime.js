import React, { Component } from "react";

export default class Ontime extends Component {
  render() {
    return (
      <div className='container markattendance mt-4'>
        <button type='submit' className='btn btn-success markbtn mb-4'>
          I'm Present
        </button>{" "}
        <br></br>
        <p className='mt-5'> Successfully Submitted</p>
      </div>
    );
  }
}
