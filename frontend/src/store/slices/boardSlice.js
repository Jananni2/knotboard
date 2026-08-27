import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from "../../services/boardService";

// GET /boards
export const fetchBoards = createAsyncThunk(
    "boards/fetchBoards",
    async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
        try {
            return await boardService.getBoards(page, size);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch boards" }
            );
        }
    }
);

// GET /boards/{id}
export const fetchBoardById = createAsyncThunk(
    "boards/fetchBoardById",
    async (id, { rejectWithValue }) => {
        try {
            return await boardService.getBoardById(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch board" }
            );
        }
    }
);

// POST /boards
export const createBoard = createAsyncThunk(
    "boards/createBoard",
    async (boardData, { rejectWithValue }) => {
        try {
            return await boardService.createBoard(boardData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to create board" }
            );
        }
    }
);

// GET /insights/board/{id}
export const fetchBoardInsights = createAsyncThunk(
    "boards/fetchBoardInsights",
    async (id, { rejectWithValue }) => {
        try {
            return await boardService.getBoardInsights(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch insights" }
            );
        }
    }
);

// GET /insights/workspace/stats
export const fetchWorkspaceStats = createAsyncThunk(
    "boards/fetchWorkspaceStats",
    async (_, { rejectWithValue }) => {
        try {
            return await boardService.getWorkspaceStats();
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch workspace stats" }
            );
        }
    }
);

// POST /members/invite
export const inviteMember = createAsyncThunk(
    "boards/inviteMember",
    async ({ boardId, userId }, { rejectWithValue }) => {
        try {
            return await boardService.inviteMember(boardId, userId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to invite member" }
            );
        }
    }
);

const initialState = {
    items: [],
    activeBoard: null,
    insights: {},
    workspaceStats: {
        totalNotes: 0,
        activeNotes: 0
    },
    loading: false,
    error: null,
    totalPages: 0,
    totalElements: 0
};

const boardSlice = createSlice({
    name: "boards",

    initialState,

    reducers: {
        clearActiveBoard: (state) => {
            state.activeBoard = null;
            state.insights = {};
        }
    },

    extraReducers: (builder) => {
        builder

            // FETCH BOARDS
            .addCase(fetchBoards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.loading = false;

                const payload = action.payload;

                state.items = payload.content || [];
                state.totalPages = payload.totalPages || 0;
                state.totalElements = payload.totalElements || 0;
            })

            .addCase(fetchBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })

            // FETCH BOARD BY ID
            .addCase(fetchBoardById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchBoardById.fulfilled, (state, action) => {
                state.loading = false;
                state.activeBoard = action.payload;
            })

            .addCase(fetchBoardById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })

            // CREATE BOARD
            .addCase(createBoard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
                state.totalElements += 1;
            })

            .addCase(createBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })

            // BOARD INSIGHTS
            .addCase(fetchBoardInsights.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchBoardInsights.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload && action.payload.id !== undefined) {
                    state.insights[action.payload.id] = action.payload.insights;
                } else {
                    state.insights = action.payload;
                }
            })

            .addCase(fetchBoardInsights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })

            // WORKSPACE STATS
            .addCase(fetchWorkspaceStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchWorkspaceStats.fulfilled, (state, action) => {
                state.loading = false;
                state.workspaceStats = action.payload;
            })

            .addCase(fetchWorkspaceStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })

            // INVITE MEMBER
            .addCase(inviteMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(inviteMember.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(inviteMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            });
    }
});

export const { clearActiveBoard } = boardSlice.actions;

export default boardSlice.reducer;