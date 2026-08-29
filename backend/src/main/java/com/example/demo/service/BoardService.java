import api from "./api";

const boardService = {
    // POST /api/boards
    createBoard: async (boardData) => {
        const response = await api.post("/api/boards", boardData);
        return response.data;
    },

    // GET /api/boards?page={page}&size={size}
    getBoards: async (page = 0, size = 6) => {
        const response = await api.get(
            `/api/boards?page=${page}&size=${size}`
        );
        return response.data;
    },

    // GET /api/boards/{id}
    getBoardById: async (id) => {
        const response = await api.get(`/api/boards/${id}`);
        return response.data;
    },

    // GET /api/insights/board/{id}
    getBoardInsights: async (id) => {
        const response = await api.get(`/api/insights/board/${id}`);
        return response.data;
    },

    // POST /api/members/invite?boardId={boardId}&userId={userId}
    inviteMember: async (boardId, userId) => {
        const response = await api.post(
            `/api/members/invite?boardId=${boardId}&userId=${userId}`
        );
        return response.data;
    },

    // GET /api/insights/workspace/stats
    getWorkspaceStats: async () => {
        const response = await api.get(
            "/api/insights/workspace/stats"
        );
        return response.data;
    },

    // PUT /api/boards/{id}/settings?maxCapacity={maxCapacity}&status={status}
    updateSettings: async (id, maxCapacity, status) => {
        const response = await api.put(
            `/api/boards/${id}/settings?maxCapacity=${maxCapacity}&status=${status}`
        );
        return response.data;
    }
};

export default boardService;