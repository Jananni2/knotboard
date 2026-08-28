import React, { useState } from "react";

const COLORS = [
    "#fff9c4",
    "#ffcdd2",
    "#c8e6c9",
    "#bbdefb",
    "#e1bee7",
    "#ffe0b2"
];

function StickyNoteForm({ initialData, onSubmit, onClose }) {
    const [content, setContent] = useState(
        initialData?.content || ""
    );

    const [colorCode, setColorCode] = useState(
        initialData?.colorCode || COLORS[0]
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            content,
            colorCode
        });
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>
                    {initialData?.id
                        ? "Edit Sticky Note"
                        : "Post Sticky Note"}
                </h2>

                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="note-content">
                        What's on your mind?
                    </label>

                    <textarea
                        id="note-content"
                        rows="4"
                        placeholder="Type your idea here..."
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        Color Theme
                    </label>

                    <div className="color-palette">
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                aria-label={`Select ${color}`}
                                onClick={() =>
                                    setColorCode(color)
                                }
                                style={{
                                    backgroundColor: color,
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    border:
                                        colorCode === color
                                            ? "2px solid #2563eb"
                                            : "1px solid #ccc",
                                    cursor: "pointer"
                                }}
                            />
                        ))}
                    </div>
                </div>

                <button type="submit">
                    {initialData?.id
                        ? "Save Changes"
                        : "Post Note"}
                </button>
            </form>
        </div>
    );
}

export default StickyNoteForm;