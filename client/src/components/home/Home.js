import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="container userdetail ">
          <p className="mt-5"> Hi, user_name</p>

          <p> Joining Date: 21/03/2019 </p>
          <p> Registered Email ID: email@email.com</p>
          <p>Registered Mo. No. 987654321 </p>
          <p> Department: Department</p>

        </div>



        <div className="container markattendance mt-4">
          <div >
            <p> <textarea className="mt-4" placeholder="Reason for being late today.. " name="reason"
              rows="2" cols="30"></textarea></p>
            <p> <button type="submit" class="btn btn-success markbtn mb-4">I'm Present</button> </p>
            <br></br>
            <p className="mt-5"> Successfully Submitted</p>

          </div>


        </div>
      </div>




    );
  }
}
export default Home;
