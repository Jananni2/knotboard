import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../../services/noteService";

// GET /notes/board/{boardId}
export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async (boardId, { rejectWithValue }) => {
        try {
            return await noteService.getNotesByBoard(boardId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch notes" }
            );
        }
    }
);

// POST /notes
export const addNote = createAsyncThunk(
    "notes/addNote",
    async (noteData, { rejectWithValue }) => {
        try {
            return await noteService.addNote(noteData);
        } catch (error) {
            return rejectWithValue("Failed to add note: Board capacity reached");
        }
    }
);

// PUT /notes/{id}/move
export const moveNote = createAsyncThunk(
    "notes/moveNote",
    async ({ id, x, y, version }, { rejectWithValue }) => {
        try {
            return await noteService.moveNote(id, x, y, version);
        } catch (error) {
            return rejectWithValue("Sync conflict: Someone else moved this note.");
        }
    }
);

// PUT /notes/{id}/content
export const updateNoteContent = createAsyncThunk(
    "notes/updateNoteContent",
    async ({ id, content, version }, { rejectWithValue }) => {
        try {
            return await noteService.updateNoteContent(
                id,
                content,
                version
            );
        } catch (error) {
            return rejectWithValue("Failed to update note.");
        }
    }
);

// DELETE /notes/{id}
export const deleteNote = createAsyncThunk(
    "notes/deleteNote",
    async (id, { rejectWithValue }) => {
        try {
            await noteService.deleteNote(id);
            return id;
        } catch (error) {
            return rejectWithValue("Failed to delete note.");
        }
    }
);

// POST /notes/{id}/undo
export const undoDelete = createAsyncThunk(
    "notes/undoDelete",
    async (id, { rejectWithValue }) => {
        try {
            await noteService.undoDelete(id);
            return id;
        } catch (error) {
            return rejectWithValue(
                "Undo failed: Capacity might be full again."
            );
        }
    }
);

const initialState = {
    items: [],
    loading: false,
    error: null,
    lastDeleted: null
};

const noteSlice = createSlice({
    name: "notes",

    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder

            // FETCH NOTES
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })

            // ADD NOTE
            .addCase(addNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(addNote.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })

            .addCase(addNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // MOVE NOTE
            .addCase(moveNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(moveNote.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(moveNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE NOTE CONTENT
            .addCase(updateNoteContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateNoteContent.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(updateNoteContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE NOTE
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;

                const deletedItem = state.items.find(
                    (item) => item.id === action.payload
                );

                state.lastDeleted = deletedItem || null;

                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
            })

            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UNDO DELETE
            .addCase(undoDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(undoDelete.fulfilled, (state, action) => {
                state.loading = false;

                if (
                    state.lastDeleted &&
                    state.lastDeleted.id === action.payload
                ) {
                    state.items.push(state.lastDeleted);
                    state.lastDeleted = null;
                }
            })

            .addCase(undoDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = noteSlice.actions;

export default noteSlice.reducer;