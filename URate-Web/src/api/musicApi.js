import { allTracks, albums, artists, getAlbumById, searchMock } from "../data/mockData";

const PAGE_SIZE = 25;

// Simulate a brief async delay so skeletons are visible during development.
const delay = (ms = 120) => new Promise(r => setTimeout(r, ms));

export async function getTracks(query = "", page = 0) {
    await delay();
    const start = page * PAGE_SIZE;
    const slice = allTracks.slice(start, start + PAGE_SIZE);
    return [{ tracks: slice, hasMore: start + PAGE_SIZE < allTracks.length }, null];
}

export async function searchAll(query) {
    await delay(80);
    if (!query.trim()) return [{ tracks: [], albums: [], artists: [] }, null];
    return [searchMock(query), null];
}

export async function getAlbum(albumId) {
    await delay();
    const result = getAlbumById(albumId);
    if (!result) return [null, "Album not found"];
    return [result, null];
}

export async function getAlbumGenres() {
    return [{ genres: [] }, null];
}

// Re-export so other files that might import these don't break at import time.
export { allTracks as mockTracks, albums as mockAlbums, artists as mockArtists };
