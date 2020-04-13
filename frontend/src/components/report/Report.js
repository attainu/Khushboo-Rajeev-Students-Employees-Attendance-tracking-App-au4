import React, { Component } from "react";
import ReactMinimalPieChart from "react-minimal-pie-chart";
class Report extends Component {
  render() {
    return (
      <div className='container-fluid mt-5'>
        <h2> Report</h2>

        <table className='table table-striped reporttable'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Date</th>
              <th scope='col'>Status</th>
              <th scope='col'>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td>20/03/2020</td>
              <td>
                <i className='fas fa-check'></i>
              </td>
              <td>-</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td>29/03/2020</td>
              <td>
                <i className='fas fa-times'></i>
              </td>
              <td>Fever</td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td>02/04/2020</td>
              <td>
                <i className='fas fa-exclamation'></i>
              </td>
              <td>Traffic</td>
            </tr>
          </tbody>
        </table>

        <div className='chart'>
          <h2>Chart</h2>
          <ReactMinimalPieChart
            cx={40}
            cy={48}
            data={[
              {
                color: "#E38627",
                title: "One",
                value: 10,
              },
              {
                color: "#C13C37",
                title: "Two",
                value: 15,
              },
              {
                color: "#6A2135",
                title: "Three",
                value: 20,
              },
            ]}
            label
            labelPosition={112}
            labelStyle={{
              fontFamily: "sans-serif",
              fontSize: "5px",
            }}
            radius={40}
          />
        </div>
      </div>
    );
  }
}
export default Report;
