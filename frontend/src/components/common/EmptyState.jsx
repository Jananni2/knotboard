import React from "react";

function EmptyState({
    message,
    ctaText,
    onCtaClick
}) {
    return (
        <div className="empty-state">

            <div className="empty-state-icon">
                📝
            </div>

            <h3>
                {message}
            </h3>

            <p>
                Start your brainstorming session now.
            </p>

            {ctaText && onCtaClick && (
                <button
                    type="button"
                    className="btn-primary"
                    onClick={onCtaClick}
                >
                    {ctaText}
                </button>
            )}

        </div>
    );
}

export default EmptyState;