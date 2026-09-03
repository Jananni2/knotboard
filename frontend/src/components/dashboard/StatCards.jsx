import React from "react";

function StatCards({ stats }) {
    return (
        <div className="stats-row">

            <div className="stat-card">
                <h3>Total Active Boards</h3>
                <p>{stats?.totalBoards || 0}</p>
            </div>

            <div className="stat-card">
                <h3>Notes Generated</h3>
                <p>{stats?.totalNotes || 0}</p>
            </div>

            <div className="stat-card">
                <h3>Collaborators</h3>
                <p>{stats?.totalUsers || 0}</p>
            </div>

            <div className="stat-card">
                <h3>Avg Ideas per Board</h3>
                <p>{stats?.avgNotes || 0}</p>
            </div>

        </div>
    );
}

export default StatCards;