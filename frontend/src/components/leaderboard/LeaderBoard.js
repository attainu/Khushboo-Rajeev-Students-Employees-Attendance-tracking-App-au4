import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsersAttendance } from "../../actions/attendanceActions";
class LeaderBoard extends Component {
    componentDidMount = () => {
        this.props.getAllUsersAttendance();
    }

    render() {
        const { allUsers } = this.props.leaderboardsattendance;
        console.log("allUsers", allUsers);

        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="leaderboarddiv col-sm-5">
                        <h2 className="mt-5"> Leader-Boards</h2>
                    </div>
                    <div className="col-sm-7 ">
                        <table className="table table-striped leaderboardtable">
                            <thead>
                                <tr>
                                    <th scope="col">Rank</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">%</th>
                                </tr>
                            </thead>
                            {allUsers && allUsers.map((item, index) => {
                                console.log("asdfg", allUsers);
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <th scope='row' > {index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.prcount.percentages} </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div >
            </div>
        );
    }
}

LeaderBoard.propTypes = {
    auth: PropTypes.object.isRequired,
    getAllUsersAttendance: PropTypes.func.isRequired,
    leaderboardsattendance: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    attendance: state.attendance,
    leaderboardsattendance: state.leaderboardsattendance
});


export default connect(mapStateToProps, { getAllUsersAttendance })(
    LeaderBoard
);

