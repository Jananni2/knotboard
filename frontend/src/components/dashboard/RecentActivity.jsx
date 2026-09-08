import React, { useEffect, useState } from "react";
import api from "../../services/api";

function RecentActivity({ boardId }) {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await api.get(
                    `api/insights/board/${boardId}/activities?page=0&size=5`
                );

                setActivities(res.data.content || []);
            } catch (error) {
                console.error("Failed to fetch recent activity:", error);
                setActivities([]);
            }
        };

        if (boardId) {
            fetchActivities();
        }
    }, [boardId]);

    return (
        <div className="stat-card">
            <h3>Recent Activity</h3>

            {activities.length === 0 ? (
                <p>No recent activity.</p>
            ) : (
                <div className="activity-list">
                    {activities.map((activity, index) => (
                        <div
                            className="activity-item"
                            key={activity.id || index}
                        >
                            <div>
                                <strong
                                    style={{ color: "#2563eb" }}
                                >
                                    {activity.actorName}
                                </strong>

                                <span>
                                    {" "}
                                    {activity.actionDescription}
                                </span>
                            </div>

                            <small>
                                {new Date(
                                    activity.timestamp
                                ).toLocaleTimeString()}
                            </small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentActivity;