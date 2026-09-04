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

import {
    fetchBoardById
} from "../../store/slices/boardSlice";

import CapacityBar from "../common/CapacityBar";
import StickyNoteForm from "./StickyNoteForm";

function BoardCanvas() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Get active board from Redux
    const board = useSelector(
        (state) => state.boards.activeBoard
    );

    // Get notes from Redux
    const {
        items,
        loading,
        error,
        lastDeleted
    } = useSelector((state) => state.notes);

    // Get logged-in user
    const user = useSelector(
        (state) => state.auth?.user
    );

    const isStakeholder =
        user?.role === "STAKEHOLDER";

    const [dragging, setDragging] = useState(null);
    const [showUndo, setShowUndo] = useState(false);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [editedContent, setEditedContent] = useState({});

    // -----------------------------------------
    // Fetch board + notes
    // -----------------------------------------
    useEffect(() => {
        if (id) {
            dispatch(fetchBoardById(id));
            dispatch(fetchNotes(id));
        }
    }, [id, dispatch]);

    // -----------------------------------------
    // Capacity values
    // -----------------------------------------

    // Number of notes currently displayed
    const currentNoteCount = items.length;

    // Maximum capacity coming from backend
    const maxNoteCapacity = board?.maxNoteCapacity;

    // -----------------------------------------
    // Show undo toast after deletion
    // -----------------------------------------
    useEffect(() => {
        if (lastDeleted) {
            setShowUndo(true);

            const timer = setTimeout(() => {
                setShowUndo(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [lastDeleted]);

    // -----------------------------------------
    // Clear error after 5 seconds
    // -----------------------------------------
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    // -----------------------------------------
    // Start dragging
    // -----------------------------------------
    const handleMouseDown = (e, note) => {
        if (isStakeholder) {
            return;
        }

        // Don't drag when clicking textarea
        if (e.target.tagName === "TEXTAREA") {
            return;
        }

        const rect =
            e.currentTarget.getBoundingClientRect();

        setDragging({
            id: note.id,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top
        });
    };

    // -----------------------------------------
    // Finish dragging
    // -----------------------------------------
    const handleMouseUp = (e) => {
        if (!dragging) {
            return;
        }

        const canvas =
            e.currentTarget.getBoundingClientRect();

        const note = items.find(
            (item) => item.id === dragging.id
        );

        if (!note) {
            setDragging(null);
            return;
        }

        const newX = Math.max(
            0,
            e.clientX -
                canvas.left -
                dragging.offsetX
        );

        const newY = Math.max(
            0,
            e.clientY -
                canvas.top -
                dragging.offsetY
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

    // -----------------------------------------
    // Open sticky note form
    // -----------------------------------------
    const handleAddNote = () => {
        if (isStakeholder) {
            return;
        }

        setShowNoteForm(true);
    };

    // -----------------------------------------
    // Create note
    // -----------------------------------------
    const handleCreateNote = async (noteData) => {
        if (isStakeholder) {
            return;
        }

        const result = await dispatch(
            addNote({
                ...noteData,
                boardId: Number(id)
            })
        );

        // Close form only if note was successfully created
        if (addNote.fulfilled.match(result)) {
            setShowNoteForm(false);
        }
    };

    // -----------------------------------------
    // Delete note
    // -----------------------------------------
    const handleDelete = (noteId) => {
        if (isStakeholder) {
            return;
        }

        dispatch(deleteNote(noteId));
    };

    // -----------------------------------------
    // Undo deletion
    // -----------------------------------------
    const handleUndo = () => {
        if (!lastDeleted || isStakeholder) {
            return;
        }

        dispatch(undoDelete(lastDeleted.id));
        setShowUndo(false);
    };

    // -----------------------------------------
    // Edit note content
    // -----------------------------------------
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

        // Clear local edited value
        setEditedContent((prev) => {
            const updated = { ...prev };
            delete updated[note.id];
            return updated;
        });
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

            {/* =====================================
                BOARD CAPACITY
            ====================================== */}
            <CapacityBar
                current={currentNoteCount}
                max={maxNoteCapacity}
            />

            {/* =====================================
                LOADING
            ====================================== */}
            {loading && (
                <p>Loading notes...</p>
            )}

            {/* =====================================
                STICKY NOTES
            ====================================== */}
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
                            editedContent[note.id] !==
                            undefined
                                ? editedContent[note.id]
                                : note.content
                        }
                        readOnly={isStakeholder}
                        onChange={(e) => {
                            if (!isStakeholder) {
                                setEditedContent(
                                    (prev) => ({
                                        ...prev,
                                        [note.id]:
                                            e.target.value
                                    })
                                );
                            }
                        }}
                        onBlur={(e) =>
                            handleContentBlur(
                                note,
                                e
                            )
                        }
                    />

                    {/* Delete button */}
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

            {/* =====================================
                ADD NOTE BUTTON
            ====================================== */}
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

            {/* =====================================
                STICKY NOTE FORM
            ====================================== */}
            {showNoteForm && !isStakeholder && (
                <StickyNoteForm
                    onSubmit={handleCreateNote}
                    onClose={() =>
                        setShowNoteForm(false)
                    }
                />
            )}

            {/* =====================================
                UNDO TOAST
            ====================================== */}
            {showUndo &&
                lastDeleted &&
                !isStakeholder && (
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

            {/* =====================================
                ERROR TOAST
            ====================================== */}
            {error && (
                <div
                    className="error-toast"
                    style={{
                        background: "#ef4444"
                    }}
                >
                    {typeof error === "string"
                        ? error
                        : error.message ||
                          "Something went wrong"}
                </div>
            )}
        </div>
    );
}

export default BoardCanvas;