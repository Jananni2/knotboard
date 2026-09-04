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

    // -----------------------------
    // NOTES FROM REDUX
    // -----------------------------
    const {
        items,
        loading,
        error,
        lastDeleted
    } = useSelector((state) => state.notes);

    // -----------------------------
    // BOARD FROM REDUX
    // -----------------------------
    const board = useSelector(
        (state) => state.boards.activeBoard
    );

    // -----------------------------
    // USER
    // -----------------------------
    const user = useSelector(
        (state) => state.auth?.user
    );

    const isStakeholder =
        user?.role === "STAKEHOLDER";

    // -----------------------------
    // LOCAL STATE
    // -----------------------------
    const [dragging, setDragging] = useState(null);
    const [showUndo, setShowUndo] = useState(false);
    const [editedContent, setEditedContent] = useState({});
    const [showNoteForm, setShowNoteForm] = useState(false);

    // -----------------------------
    // FETCH BOARD + NOTES
    // -----------------------------
    useEffect(() => {
        if (id) {
            dispatch(fetchNotes(id));
            dispatch(fetchBoardById(id));
        }
    }, [id, dispatch]);

    // -----------------------------
    // SHOW UNDO MESSAGE
    // -----------------------------
    useEffect(() => {
        if (lastDeleted) {
            setShowUndo(true);

            const timer = setTimeout(() => {
                setShowUndo(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [lastDeleted]);

    // -----------------------------
    // CLEAR ERROR
    // -----------------------------
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    // -----------------------------
    // DRAG START
    // -----------------------------
    const handleMouseDown = (e, note) => {
        if (isStakeholder) {
            return;
        }

        if (e.target.tagName === "TEXTAREA") {
            return;
        }

        const rect =
            e.currentTarget.getBoundingClientRect();

        setDragging({
            id: note.id,
            offsetX:
                e.clientX - rect.left,
            offsetY:
                e.clientY - rect.top
        });
    };

    // -----------------------------
    // DRAG END
    // -----------------------------
    const handleMouseUp = (e) => {
        if (!dragging) {
            return;
        }

        const canvas =
            e.currentTarget.getBoundingClientRect();

        const note = items.find(
            (item) =>
                item.id === dragging.id
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

    // -----------------------------
    // OPEN ADD NOTE FORM
    // -----------------------------
    const handleAddNote = () => {
        if (isStakeholder) {
            return;
        }

        setShowNoteForm(true);
    };

    // -----------------------------
    // CREATE NOTE
    // -----------------------------
    const handleCreateNote = async (noteData) => {
        if (isStakeholder) {
            return;
        }

        await dispatch(
            addNote({
                boardId: Number(id),
                content: noteData.content,
                colorCode: noteData.colorCode,
                x: noteData.x || 100,
                y: noteData.y || 100
            })
        );

        setShowNoteForm(false);

        // Refresh board data so capacity count
        // stays synchronized with backend.
        dispatch(fetchBoardById(id));
    };

    // -----------------------------
    // DELETE NOTE
    // -----------------------------
    const handleDelete = (noteId) => {
        if (isStakeholder) {
            return;
        }

        dispatch(deleteNote(noteId));
    };

    // -----------------------------
    // UNDO DELETE
    // -----------------------------
    const handleUndo = async () => {
        if (!lastDeleted || isStakeholder) {
            return;
        }

        await dispatch(
            undoDelete(lastDeleted.id)
        );

        setShowUndo(false);

        // Refresh board from backend
        dispatch(fetchBoardById(id));
    };

    // -----------------------------
    // UPDATE CONTENT
    // -----------------------------
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

    // -----------------------------
    // CAPACITY
    // -----------------------------
    const currentNoteCount =
        items.length;

    const maxNoteCapacity =
        board?.maxNoteCapacity || 50;

    return (
        <div
            className="board-canvas"
            onMouseUp={handleMouseUp}
            style={{
                position: "relative",
                minHeight: "600px"
            }}
        >

            {/* =========================
                CAPACITY BAR
            ========================== */}

            <CapacityBar
                current={currentNoteCount}
                max={maxNoteCapacity}
            />

            {/* =========================
                LOADING
            ========================== */}

            {loading && (
                <p>
                    Loading notes...
                </p>
            )}

            {/* =========================
                STICKY NOTES
            ========================== */}

            {items.map((note) => (
                <div
                    key={note.id}
                    className="sticky-note"
                    onMouseDown={(e) =>
                        handleMouseDown(
                            e,
                            note
                        )
                    }
                    style={{
                        position: "absolute",
                        left: `${note.x}px`,
                        top: `${note.y}px`,
                        background:
                            note.colorCode,
                        cursor:
                            isStakeholder
                                ? "default"
                                : "grab"
                    }}
                >

                    <textarea
                        value={
                            editedContent[
                                note.id
                            ] !== undefined
                                ? editedContent[
                                      note.id
                                  ]
                                : note.content
                        }
                        readOnly={
                            isStakeholder
                        }
                        onChange={(e) => {
                            if (
                                !isStakeholder
                            ) {
                                setEditedContent(
                                    (prev) => ({
                                        ...prev,
                                        [note.id]:
                                            e.target
                                                .value
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

                    {!isStakeholder && (
                        <button
                            type="button"
                            onClick={() =>
                                handleDelete(
                                    note.id
                                )
                            }
                            aria-label="Delete note"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}

            {/* =========================
                ADD NOTE BUTTON
            ========================== */}

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

            {/* =========================
                STICKY NOTE FORM
            ========================== */}

            {showNoteForm &&
                !isStakeholder && (
                    <StickyNoteForm
                        onSubmit={
                            handleCreateNote
                        }
                        onClose={() =>
                            setShowNoteForm(
                                false
                            )
                        }
                    />
                )}

            {/* =========================
                UNDO TOAST
            ========================== */}

            {showUndo &&
                lastDeleted &&
                !isStakeholder && (
                    <div className="undo-toast">

                        <span>
                            Note deleted.
                        </span>

                        <button
                            type="button"
                            onClick={
                                handleUndo
                            }
                        >
                            Undo
                        </button>

                    </div>
                )}

            {/* =========================
                ERROR TOAST
            ========================== */}

            {error && (
                <div
                    className="error-toast"
                    style={{
                        background:
                            "#ef4444"
                    }}
                >
                    {typeof error ===
                    "string"
                        ? error
                        : error.message ||
                          "Something went wrong"}
                </div>
            )}

        </div>
    );
}

export default BoardCanvas;