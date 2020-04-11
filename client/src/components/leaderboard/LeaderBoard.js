
import React, { Component } from "react";

class LeaderBoard extends Component {
    render() {
        return (
            <div className="container-fluid mt-5">
                <div className="leaderboarddiv">
                    <h2 className="mt-5"> Leader-Boards</h2>
                </div>
                <table class="table table-striped leaderboardtable">
                    <thead>
                        <tr>

                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>1</td>
                            <td>Rajeev Ranjan</td>
                            <td>CSE</td>
                            <td>100</td>
                        </tr>
                        <tr>

                            <td>2</td>
                            <td>Khushboo Goyal</td>
                            <td>CSE</td>
                            <td>98</td>
                        </tr>
                        <tr>

                            <td> 3</td>
                            <td>Zibran</td>
                            <td>CSE</td>
                            <td>92</td>
                        </tr>
                    </tbody>
                </table>
            </div >


        );
    }
}
export default LeaderBoard;
