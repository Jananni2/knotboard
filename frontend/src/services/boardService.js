import api from "./api";

const boardService = {
    // POST /boards
    createBoard: async (boardData) => {
        const response = await api.post("/boards", boardData);
        return response.data;
    },

    // GET /boards?page={page}&size={size}
    getBoards: async (page = 0, size = 10) => {
        const response = await api.get(
            `/boards?page=${page}&size=${size}`
        );
        return response.data;
    },

    // GET /boards/{id}
    getBoardById: async (id) => {
        const response = await api.get(`/boards/${id}`);
        return response.data;
    },

    // GET /insights/board/{id}
    getBoardInsights: async (id) => {
        const response = await api.get(`/insights/board/${id}`);
        return response.data;
    },

    // POST /members/invite?boardId={boardId}&userId={userId}
    inviteMember: async (boardId, userId) => {
        const response = await api.post(
            `/members/invite?boardId=${boardId}&userId=${userId}`
        );
        return response.data;
    },

    // GET /insights/workspace/stats
    getWorkspaceStats: async () => {
        const response = await api.get(
            "/insights/workspace/stats"
        );
        return response.data;
    },

    // PUT /boards/{id}/settings?maxCapacity={maxCapacity}&status={status}
    updateSettings: async (id, maxCapacity, status) => {
        const response = await api.put(
            `/boards/${id}/settings?maxCapacity=${maxCapacity}&status=${status}`
        );
        return response.data;
    }
};

export default boardService;