 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    fetchNotes,
    addNote,
    moveNote,
    deleteNote,
    undoDelete,
    updateNoteContent,
    clearError
} from "../../store/slices/noteSlice";

import CapacityBar from "../common/CapacityBar";

function BoardCanvas() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        items,
        loading,
        error,
        lastDeleted
    } = useSelector((state) => state.notes);

    const user = useSelector((state) => state.auth?.user);

    const isStakeholder = user?.role === "STAKEHOLDER";

    const [dragging, setDragging] = useState(null);
    const [showUndo, setShowUndo] = useState(false);
    const [editedContent, setEditedContent] = useState({});

    // Fetch notes when board ID changes
    useEffect(() => {
        if (id) {
            dispatch(fetchNotes(id));
        }
    }, [id, dispatch]);

    // Show undo toast after deletion
    useEffect(() => {
        if (lastDeleted) {
            setShowUndo(true);

            const timer = setTimeout(() => {
                setShowUndo(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [lastDeleted]);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    // Start dragging
    const handleMouseDown = (e, note) => {
        if (isStakeholder) {
            return;
        }

        // Do not start dragging when clicking textarea
        if (e.target.tagName === "TEXTAREA") {
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();

        setDragging({
            id: note.id,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top
        });
    };

    // Finish dragging
    const handleMouseUp = (e) => {
        if (!dragging) {
            return;
        }

        const canvas = e.currentTarget.getBoundingClientRect();

        const note = items.find(
            (item) => item.id === dragging.id
        );

        if (!note) {
            setDragging(null);
            return;
        }

        const newX = Math.max(
            0,
            e.clientX - canvas.left - dragging.offsetX
        );

        const newY = Math.max(
            0,
            e.clientY - canvas.top - dragging.offsetY
        );

        dispatch(
            moveNote({
                id: note.id,
                x: newX,
                y: newY,
                version: note.version
            })
        );

        setDragging(null);
    };

    // Add new note
    const handleAddNote = () => {
        if (isStakeholder) {
            return;
        }

        dispatch(
            addNote({
                boardId: Number(id),
                content: "New Idea",
                colorCode: "#fff9c4",
                x: 100,
                y: 100
            })
        );
    };

    // Delete note
    const handleDelete = (noteId) => {
        if (isStakeholder) {
            return;
        }

        dispatch(deleteNote(noteId));
    };

    // Undo deletion
    const handleUndo = () => {
        if (!lastDeleted || isStakeholder) {
            return;
        }

        dispatch(undoDelete(lastDeleted.id));
        setShowUndo(false);
    };

    // Edit note content
    const handleContentBlur = (note, e) => {
        if (isStakeholder) {
            return;
        }

        const content = e.target.value;

        if (content !== note.content) {
            dispatch(
                updateNoteContent({
                    id: note.id,
                    content,
                    version: note.version
                })
            );
        }
    };

    return (
        <div
            className="board-canvas"
            onMouseUp={handleMouseUp}
            style={{
                position: "relative",
                minHeight: "600px"
            }}
        >

            {/* Board Capacity */}
            <CapacityBar
                current={items.length}
                max={50}
            />

            {loading && (
                <p>Loading notes...</p>
            )}

            {items.map((note) => (
                <div
                    key={note.id}
                    className="sticky-note"
                    onMouseDown={(e) =>
                        handleMouseDown(e, note)
                    }
                    style={{
                        position: "absolute",
                        left: `${note.x}px`,
                        top: `${note.y}px`,
                        background: note.colorCode,
                        cursor: isStakeholder
                            ? "default"
                            : "grab"
                    }}
                >
                    <textarea
                        value={
                            editedContent[note.id] !== undefined
                                ? editedContent[note.id]
                                : note.content
                        }
                        readOnly={isStakeholder}
                        onChange={(e) => {
                            if (!isStakeholder) {
                                setEditedContent((prev) => ({
                                    ...prev,
                                    [note.id]: e.target.value
                                }));
                            }
                        }}
                        onBlur={(e) =>
                            handleContentBlur(note, e)
                        }
                    />

                    {!isStakeholder && (
                        <button
                            type="button"
                            onClick={() =>
                                handleDelete(note.id)
                            }
                            aria-label="Delete note"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}

            {!isStakeholder && (
                <button
                    type="button"
                    className="btn-primary-flex"
                    onClick={handleAddNote}
                    aria-label="Add note"
                >
                    +
                </button>
            )}

            {showUndo && lastDeleted && !isStakeholder && (
                <div className="undo-toast">
                    <span>
                        Note deleted.
                    </span>

                    <button
                        type="button"
                        onClick={handleUndo}
                    >
                        Undo
                    </button>
                </div>
            )}

            {error && (
                <div
                    className="error-toast"
                    style={{
                        background: "#ef4444"
                    }}
                >
                    {typeof error === "string"
                        ? error
                        : error.message || "Something went wrong"}
                </div>
            )}

        </div>
    );
}

export default BoardCanvas;