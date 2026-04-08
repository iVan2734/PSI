import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export async function getMovies(query = "", page = 1) {
    try {
        const { data } = await api.get("/movies", {
            params: { q: query, page },
        });
        return [data, null];
    } catch (err) {
        return [null, err.response?.data?.error ?? err.message];
    }
}
