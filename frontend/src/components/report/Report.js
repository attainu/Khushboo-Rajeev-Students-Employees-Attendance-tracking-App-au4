import React, { Component } from "react";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postAttendance, getAttendance } from "../../actions/attendanceActions";
import moment from "moment";

class Report extends Component {

  componentDidMount = () => {
    this.props.getAttendance();
  }

  render() {

    const { userAttendance } = this.props.attendance;
    /* console.log("userAttendance", userAttendance); */

    const { attendaceData, totalAttendanceStatusWiseCount } = userAttendance;
    /* console.log("attendaceData, totalAttendanceStatusWiseCount", attendaceData, totalAttendanceStatusWiseCount); */


    return (
      <div className='container-fluid mt-5' >
        <div className='row'>
          <div className='col-sm-6 col-md-6 col-lg-6 reporttablediv'>
            <h2> Report</h2>

            <table className='table table-striped reporttable '>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Date </th>
                  <th scope='col'>Status </th>
                  <th scope='col'>Note</th>
                </tr>
              </thead>
              {attendaceData && attendaceData.map((item, index) => {
                var t1 = item.date;

                return (
                  <tbody key={index}>
                    <tr >
                      <th scope='row' > {index + 1}</th>
                      <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                      <td>
                        {item.status}
                      </td>
                      <td>{item.reason}</td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
          <div className='col-sm-6 col-md-6 col-lg-6'>
            <div className='chart'>
              <h2>Chart</h2>
              {/*  {console.log("pie chart state", this.state)} */}
              <ReactMinimalPieChart
                cx={60}
                cy={40}

                data={[
                  {
                    color: "#f38181",
                    title: "Absent",
                    value: totalAttendanceStatusWiseCount ? totalAttendanceStatusWiseCount.absentTotal : 0,
                  },
                  {
                    color: "#fce38a",
                    title: "Late",
                    value: totalAttendanceStatusWiseCount ? totalAttendanceStatusWiseCount.lateTotal : 0,
                  },
                  {
                    color: "#95e1d3",
                    title: "Present",
                    value: totalAttendanceStatusWiseCount ? totalAttendanceStatusWiseCount.presentTotal : 0,
                  },
                ]}
                label
                labelPosition={112}
                labelStyle={{
                  fontFamily: "sans-serif",
                  fontSize: "5px",
                }}
                radius={30}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Report.propTypes = {
  auth: PropTypes.object.isRequired,
  postAttendance: PropTypes.func.isRequired,
  //getAttendance: PropTypes.func.isRequired,
  attendance: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  attendance: state.attendance
});

export default connect(mapStateToProps, { postAttendance, getAttendance })(
  Report
);

