 import React from "react";

function CapacityBar({ current, max }) {
    const percent = Math.min((current / max) * 100, 100);

    let barColor;

    if (percent > 90) {
        barColor = "#ef4444";       // red
    } else if (percent > 70) {
        barColor = "#f59e0b";       // orange
    } else {
        barColor = "#10b981";       // green
    }

    return (
        <div className="capacity-container">

            <div className="capacity-header">
                <span>Board Capacity</span>

                <span style={{ color: barColor }}>
                    {current}/{max}
                </span>
            </div>

            <div className="capacity-bar">
                <div
                    className="capacity-progress"
                    style={{
                        width: `${percent}%`,
                        backgroundColor: barColor,
                        transition: "width 0.5s ease-out"
                    }}
                />
            </div>

        </div>
    );
}

export default CapacityBar;