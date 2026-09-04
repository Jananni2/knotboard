 import React from "react";

function CapacityBar({
    current = 0,
    max
}) {

    // Board capacity is still loading
    if (
        max === undefined ||
        max === null
    ) {

        return (
            <div className="capacity-container">

                <div className="capacity-header">

                    <span>
                        Board Capacity
                    </span>

                    <span>
                        Loading...
                    </span>

                </div>

                <div className="capacity-bar">

                    <div
                        className="capacity-progress"
                        style={{
                            width: "0%"
                        }}
                    />

                </div>

            </div>
        );
    }

    // Prevent division by zero
    const percent =
        max > 0
            ? Math.min(
                  (current / max) * 100,
                  100
              )
            : 0;

    let barColor;

    if (percent > 90) {

        barColor = "#ef4444";

    } else if (percent > 70) {

        barColor = "#f59e0b";

    } else {

        barColor = "#10b981";
    }

    return (
        <div className="capacity-container">

            <div className="capacity-header">

                <span>
                    Board Capacity
                </span>

                <span
                    style={{
                        color: barColor
                    }}
                >
                    {current}/{max}
                </span>

            </div>

            <div className="capacity-bar">

                <div
                    className="capacity-progress"

                    style={{
                        width:
                            `${percent}%`,

                        backgroundColor:
                            barColor,

                        transition:
                            "width 0.5s ease-out"
                    }}
                />

            </div>

        </div>
    );
}

export default CapacityBar;