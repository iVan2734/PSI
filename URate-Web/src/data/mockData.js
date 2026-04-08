// All placeholder data for the frontend preview — no backend required.

const img = (seed, w, h = w) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// -- Artists --------------------------------------------------------------------

export const artists = [
    { id: "a1", name: "Neon Drift",       picture_medium: img("neon-drift-band", 200), picture_big: img("neon-drift-band", 400) },
    { id: "a2", name: "Violet Shore",     picture_medium: img("violet-shore-band", 200), picture_big: img("violet-shore-band", 400) },
    { id: "a3", name: "The Reckless Few", picture_medium: img("reckless-few-band", 200), picture_big: img("reckless-few-band", 400) },
    { id: "a4", name: "Mira Santos",      picture_medium: img("mira-santos-artist", 200), picture_big: img("mira-santos-artist", 400) },
    { id: "a5", name: "Cold Atlas",       picture_medium: img("cold-atlas-band", 200), picture_big: img("cold-atlas-band", 400) },
];

// -- Helper ---------------------------------------------------------------------

function cover(seed) {
    return {
        cover_medium: img(seed, 300),
        cover_big:    img(seed, 500),
        cover_xl:     img(seed, 1000),
    };
}

function track(id, title, durationSecs, position, artist, albumId, albumTitle, albumCoverSeed, community) {
    return {
        id,
        title,
        duration: durationSecs,
        track_position: position,
        artist: { id: artist.id, name: artist.name },
        album: {
            id: albumId,
            title: albumTitle,
            ...cover(albumCoverSeed),
        },
        mockCommunity: community,
    };
}

function comm(count, avg, genres, feelings) {
    return {
        count,
        average: avg,
        top_genre_tags: genres,
        top_feeling_tags: feelings,
        top_genre_max_count: count > 10 ? 15 : 0,
    };
}

// -- Albums & Tracks ------------------------------------------------------------

const a1 = artists[0]; // Neon Drift
const a2 = artists[1]; // Violet Shore
const a3 = artists[2]; // The Reckless Few
const a4 = artists[3]; // Mira Santos
const a5 = artists[4]; // Cold Atlas

export const albums = [
    // -- Neon Drift — Synthetic Dreams
    {
        id: "alb1",
        title: "Synthetic Dreams",
        artist: { id: a1.id, name: a1.name },
        release_date: "2023-03-15",
        nb_tracks: 6,
        genres: ["Electronic"],
        ...cover("synthetic-dreams-cover"),
    },
    // -- Neon Drift — Ocean Static
    {
        id: "alb2",
        title: "Ocean Static",
        artist: { id: a1.id, name: a1.name },
        release_date: "2022-07-22",
        nb_tracks: 5,
        genres: ["Electronic", "Ambient"],
        ...cover("ocean-static-cover"),
    },
    // -- Violet Shore — Petal & Rust
    {
        id: "alb3",
        title: "Petal & Rust",
        artist: { id: a2.id, name: a2.name },
        release_date: "2024-01-18",
        nb_tracks: 6,
        genres: ["Indie"],
        ...cover("petal-rust-cover"),
    },
    // -- Violet Shore — Haze
    {
        id: "alb4",
        title: "Haze",
        artist: { id: a2.id, name: a2.name },
        release_date: "2021-09-04",
        nb_tracks: 4,
        genres: ["Indie", "Alternative"],
        ...cover("haze-album-cover"),
    },
    // -- The Reckless Few — Fault Lines
    {
        id: "alb5",
        title: "Fault Lines",
        artist: { id: a3.id, name: a3.name },
        release_date: "2023-05-11",
        nb_tracks: 7,
        genres: ["Rock"],
        ...cover("fault-lines-cover"),
    },
    // -- The Reckless Few — Ember Coast
    {
        id: "alb6",
        title: "Ember Coast",
        artist: { id: a3.id, name: a3.name },
        release_date: "2022-02-28",
        nb_tracks: 5,
        genres: ["Rock", "Alternative"],
        ...cover("ember-coast-cover"),
    },
    // -- Mira Santos — After Hours
    {
        id: "alb7",
        title: "After Hours",
        artist: { id: a4.id, name: a4.name },
        release_date: "2024-04-05",
        nb_tracks: 6,
        genres: ["Pop", "R&B"],
        ...cover("after-hours-cover"),
    },
    // -- Mira Santos — Meridian
    {
        id: "alb8",
        title: "Meridian",
        artist: { id: a4.id, name: a4.name },
        release_date: "2022-11-14",
        nb_tracks: 5,
        genres: ["Pop"],
        ...cover("meridian-album-cover"),
    },
    // -- Cold Atlas — Signal Lost
    {
        id: "alb9",
        title: "Signal Lost",
        artist: { id: a5.id, name: a5.name },
        release_date: "2023-08-30",
        nb_tracks: 5,
        genres: ["Ambient"],
        ...cover("signal-lost-cover"),
    },
];

// -- Track lists per album ------------------------------------------------------

const tracksByAlbum = {
    alb1: [
        track("alb1-t1", "Midnight Cascade",   222, 1, a1, "alb1", "Synthetic Dreams", "synthetic-dreams-cover", comm(284, "8.1", ["Electronic", "Synth-Pop"], ["Energetic", "Dreamy"])),
        track("alb1-t2", "Glass City Lights",  255, 2, a1, "alb1", "Synthetic Dreams", "synthetic-dreams-cover", comm(197, "7.6", ["Electronic"],             ["Chill", "Nostalgic"])),
        track("alb1-t3", "Binary Sunset",      238, 3, a1, "alb1", "Synthetic Dreams", "synthetic-dreams-cover", comm(312, "8.4", ["Electronic", "Dance"],    ["Uplifting", "Energetic"])),
        track("alb1-t4", "Voltage",            175, 4, a1, "alb1", "Synthetic Dreams", "synthetic-dreams-cover", comm(143, "7.2", ["Electronic"],             ["Aggressive", "Hype"])),
        track("alb1-t5", "Synthetic Dreams",   301, 5, a1, "alb1", "Synthetic Dreams", "synthetic-dreams-cover", comm(421, "9.0", ["Electronic", "Ambient"],  ["Dreamy", "Peaceful"])),
        track("alb1-t6", "Fading Signal",      273, 6, a1, "alb1", "Synthetic Dreams", "synthetic-dreams-cover", comm(165, "7.5", ["Electronic"],             ["Melancholic", "Chill"])),
    ],
    alb2: [
        track("alb2-t1", "Depth Below",        208, 1, a1, "alb2", "Ocean Static", "ocean-static-cover", comm(98,  "7.8", ["Ambient", "Electronic"], ["Peaceful", "Dreamy"])),
        track("alb2-t2", "Static Reef",        284, 2, a1, "alb2", "Ocean Static", "ocean-static-cover", comm(131, "8.2", ["Ambient"],               ["Chill", "Melancholic"])),
        track("alb2-t3", "Submerge",           195, 3, a1, "alb2", "Ocean Static", "ocean-static-cover", comm(74,  "7.4", ["Electronic", "Ambient"], ["Dark", "Dreamy"])),
        track("alb2-t4", "Pacific Drone",      362, 4, a1, "alb2", "Ocean Static", "ocean-static-cover", comm(88,  "8.6", ["Ambient"],               ["Peaceful", "Chill"])),
        track("alb2-t5", "Shoreline Echo",     235, 5, a1, "alb2", "Ocean Static", "ocean-static-cover", comm(112, "7.9", ["Ambient", "Electronic"], ["Nostalgic", "Sad"])),
    ],
    alb3: [
        track("alb3-t1", "Wildfire Season",    227, 1, a2, "alb3", "Petal & Rust", "petal-rust-cover", comm(203, "8.3", ["Indie", "Folk"],  ["Energetic", "Emotional"])),
        track("alb3-t2", "Rust & Bloom",       252, 2, a2, "alb3", "Petal & Rust", "petal-rust-cover", comm(187, "7.9", ["Indie"],          ["Melancholic", "Romantic"])),
        track("alb3-t3", "Paper Bridges",      213, 3, a2, "alb3", "Petal & Rust", "petal-rust-cover", comm(241, "8.0", ["Indie", "Pop"],   ["Emotional", "Sad"])),
        track("alb3-t4", "Ivory Rain",         308, 4, a2, "alb3", "Petal & Rust", "petal-rust-cover", comm(156, "8.5", ["Indie"],          ["Dreamy", "Peaceful"])),
        track("alb3-t5", "Petal & Rust",       262, 5, a2, "alb3", "Petal & Rust", "petal-rust-cover", comm(318, "8.8", ["Indie", "Folk"],  ["Nostalgic", "Emotional"])),
        track("alb3-t6", "Quiet Collapse",     235, 6, a2, "alb3", "Petal & Rust", "petal-rust-cover", comm(122, "7.7", ["Indie"],          ["Sad", "Melancholic"])),
    ],
    alb4: [
        track("alb4-t1", "Soft Dissolve",      330, 1, a2, "alb4", "Haze", "haze-album-cover", comm(87,  "8.1", ["Alternative", "Shoegaze"], ["Dreamy", "Chill"])),
        track("alb4-t2", "Honey Haze",         258, 2, a2, "alb4", "Haze", "haze-album-cover", comm(104, "7.6", ["Indie"],                   ["Romantic", "Peaceful"])),
        track("alb4-t3", "Drifting Apart",     375, 3, a2, "alb4", "Haze", "haze-album-cover", comm(119, "8.4", ["Alternative"],             ["Sad", "Melancholic"])),
        track("alb4-t4", "Lavender Smoke",     292, 4, a2, "alb4", "Haze", "haze-album-cover", comm(93,  "7.9", ["Indie", "Alternative"],    ["Dreamy", "Anxious"])),
    ],
    alb5: [
        track("alb5-t1", "Fault Lines",        202, 1, a3, "alb5", "Fault Lines", "fault-lines-cover", comm(342, "7.8", ["Rock", "Alternative"], ["Energetic", "Aggressive"])),
        track("alb5-t2", "Burning Low",        245, 2, a3, "alb5", "Fault Lines", "fault-lines-cover", comm(276, "7.5", ["Rock"],               ["Dark", "Emotional"])),
        track("alb5-t3", "Concrete Thunder",   228, 3, a3, "alb5", "Fault Lines", "fault-lines-cover", comm(389, "8.2", ["Rock", "Punk"],       ["Aggressive", "Hype"])),
        track("alb5-t4", "Redline",            195, 4, a3, "alb5", "Fault Lines", "fault-lines-cover", comm(211, "8.0", ["Rock"],               ["Energetic", "Hype"])),
        track("alb5-t5", "Tectonic",           273, 5, a3, "alb5", "Fault Lines", "fault-lines-cover", comm(167, "7.7", ["Rock", "Alternative"], ["Dark", "Anxious"])),
        track("alb5-t6", "Aftershock",         238, 6, a3, "alb5", "Fault Lines", "fault-lines-cover", comm(144, "7.4", ["Rock"],               ["Emotional", "Aggressive"])),
        track("alb5-t7", "Broken Ground",      312, 7, a3, "alb5", "Fault Lines", "fault-lines-cover", comm(198, "8.1", ["Rock", "Alternative"], ["Melancholic", "Emotional"])),
    ],
    alb6: [
        track("alb6-t1", "Last Fire Standing", 215, 1, a3, "alb6", "Ember Coast", "ember-coast-cover", comm(131, "7.9", ["Rock", "Alternative"], ["Energetic", "Nostalgic"])),
        track("alb6-t2", "Ember Coast",        288, 2, a3, "alb6", "Ember Coast", "ember-coast-cover", comm(224, "8.3", ["Rock"],               ["Melancholic", "Emotional"])),
        track("alb6-t3", "Salt & Ash",         202, 3, a3, "alb6", "Ember Coast", "ember-coast-cover", comm(97,  "7.6", ["Rock", "Punk"],       ["Aggressive", "Dark"])),
        track("alb6-t4", "The Long Drive",     315, 4, a3, "alb6", "Ember Coast", "ember-coast-cover", comm(178, "8.0", ["Rock", "Alternative"], ["Nostalgic", "Chill"])),
        track("alb6-t5", "Neon Wolves",        235, 5, a3, "alb6", "Ember Coast", "ember-coast-cover", comm(143, "7.8", ["Rock"],               ["Energetic", "Hype"])),
    ],
    alb7: [
        track("alb7-t1", "After Hours",        232, 1, a4, "alb7", "After Hours", "after-hours-cover", comm(487, "8.6", ["Pop", "R&B"],  ["Romantic", "Chill"])),
        track("alb7-t2", "Silk & Rain",        250, 2, a4, "alb7", "After Hours", "after-hours-cover", comm(362, "8.1", ["R&B"],         ["Dreamy", "Romantic"])),
        track("alb7-t3", "Midnight in Milan",  218, 3, a4, "alb7", "After Hours", "after-hours-cover", comm(291, "7.9", ["Pop", "R&B"],  ["Nostalgic", "Emotional"])),
        track("alb7-t4", "Golden Hour",        268, 4, a4, "alb7", "After Hours", "after-hours-cover", comm(534, "9.1", ["Pop"],          ["Happy", "Uplifting"])),
        track("alb7-t5", "Velvet Sky",         225, 5, a4, "alb7", "After Hours", "after-hours-cover", comm(218, "8.0", ["R&B"],         ["Romantic", "Peaceful"])),
        track("alb7-t6", "Last Dance",         302, 6, a4, "alb7", "After Hours", "after-hours-cover", comm(176, "7.8", ["Pop", "R&B"],  ["Sad", "Emotional"])),
    ],
    alb8: [
        track("alb8-t1", "True North",         210, 1, a4, "alb8", "Meridian", "meridian-album-cover", comm(98,  "7.7", ["Pop"],     ["Uplifting", "Energetic"])),
        track("alb8-t2", "Meridian",           255, 2, a4, "alb8", "Meridian", "meridian-album-cover", comm(143, "8.2", ["Pop", "R&B"], ["Nostalgic", "Emotional"])),
        track("alb8-t3", "Shifting Tides",     232, 3, a4, "alb8", "Meridian", "meridian-album-cover", comm(87,  "7.5", ["Pop"],     ["Melancholic", "Chill"])),
        track("alb8-t4", "Indigo",             245, 4, a4, "alb8", "Meridian", "meridian-album-cover", comm(119, "8.0", ["R&B"],     ["Romantic", "Dreamy"])),
        track("alb8-t5", "Sundial",            208, 5, a4, "alb8", "Meridian", "meridian-album-cover", comm(76,  "7.6", ["Pop"],     ["Happy", "Peaceful"])),
    ],
    alb9: [
        track("alb9-t1", "Signal Lost",        378, 1, a5, "alb9", "Signal Lost", "signal-lost-cover", comm(74,  "8.7", ["Ambient"],        ["Melancholic", "Dreamy"])),
        track("alb9-t2", "Empty Coordinates",  345, 2, a5, "alb9", "Signal Lost", "signal-lost-cover", comm(61,  "8.3", ["Ambient"],        ["Peaceful", "Dark"])),
        track("alb9-t3", "White Noise Atlas",  422, 3, a5, "alb9", "Signal Lost", "signal-lost-cover", comm(88,  "9.2", ["Ambient", "Post-Rock"], ["Dreamy", "Emotional"])),
        track("alb9-t4", "Dead Satellite",     298, 4, a5, "alb9", "Signal Lost", "signal-lost-cover", comm(53,  "8.0", ["Ambient"],        ["Dark", "Anxious"])),
        track("alb9-t5", "Frequency Zero",     495, 5, a5, "alb9", "Signal Lost", "signal-lost-cover", comm(112, "9.4", ["Ambient", "Post-Rock"], ["Peaceful", "Dreamy"])),
    ],
};

// -- Flat track list (all tracks in order) -------------------------------------

export const allTracks = Object.values(tracksByAlbum).flat();

// -- Lookup helpers -------------------------------------------------------------

export function getAlbumById(albumId) {
    const alb = albums.find(a => a.id === albumId);
    if (!alb) return null;
    return { album: alb, tracks: tracksByAlbum[albumId] ?? [] };
}

export function searchMock(query) {
    const q = query.toLowerCase();

    const matchedArtists = artists.filter(a => a.name.toLowerCase().includes(q));
    const matchedAlbums  = albums.filter(a =>
        a.title.toLowerCase().includes(q) || a.artist.name.toLowerCase().includes(q)
    );
    const matchedTracks  = allTracks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.artist.name.toLowerCase().includes(q) ||
        t.album.title.toLowerCase().includes(q)
    );

    return { artists: matchedArtists, albums: matchedAlbums, tracks: matchedTracks };
}

// -- Social user list (followers / following) -----------------------------------

const socialUsers = [
    { username: "vinyl_hunter",    avatar: img("profile-vinyl-hunter", 60), hasProfile: true },
    { username: "beatseeker99",    avatar: img("profile-beatseeker", 60),    hasProfile: true },
    { username: "lunar_waves",     avatar: img("profile-lunar-waves", 60),   hasProfile: true },
    { username: "wavefront_99",    avatar: img("social-wavefront", 60),      hasProfile: false },
    { username: "tape_hiss",       avatar: img("social-tapehiss", 60),       hasProfile: false },
    { username: "deepfield_echo",  avatar: img("social-deepfield", 60),      hasProfile: false },
    { username: "chorus_and_fade", avatar: img("social-chorusfade", 60),     hasProfile: false },
    { username: "static_bloom",    avatar: img("social-staticbloom", 60),    hasProfile: false },
];

export const MOCK_FOLLOWERS = socialUsers;                       // 8 followers
export const MOCK_FOLLOWING = [1, 2, 3, 5, 6].map(i => socialUsers[i]); // 5 following

// -- Mock reviewers -------------------------------------------------------------

export const mockReviewers = [
    { id: "rv1", username: "vinyl_hunter",   avatar: img("rv-vinyl-hunter", 40) },
    { id: "rv2", username: "beatseeker99",   avatar: img("rv-beatseeker", 40) },
    { id: "rv3", username: "lunar_waves",    avatar: img("rv-lunar-waves", 40) },
    { id: "rv4", username: "the_deep_cut",   avatar: img("rv-deep-cut", 40) },
    { id: "rv5", username: "cassette_ghost", avatar: img("rv-cassette", 40) },
    { id: "rv6", username: "peak_listener",  avatar: img("rv-peak", 40) },
];

const REVIEW_COMMENTS = [
    "An absolute banger — this one's been on repeat all week.",
    "Love the atmosphere here. Really sets a mood.",
    "Production is top-notch. Every layer adds something new.",
    "One of the most underrated tracks on the album.",
    "Not usually my genre but this completely won me over.",
    "The bridge is genuinely stunning. Sends me every time.",
    "Could listen to this on loop for hours. Instant classic.",
    "Solid track, nothing groundbreaking but consistently good.",
    "The mixing here is flawless — headphones highly recommended.",
    "Grows on you with every listen. Took 3 plays to get it.",
    "Perfect for a late drive or early morning session.",
    "That outro is something else entirely.",
];

const ALL_GENRE_TAGS  = ["Pop","Rock","Hip-Hop","R&B","Electronic","Jazz","Indie","Folk","Soul","Ambient","Alternative","Dance"];
const ALL_FEELING_TAGS = ["Energetic","Sad","Happy","Melancholic","Chill","Romantic","Nostalgic","Dark","Uplifting","Dreamy","Peaceful"];

export function getMockReviews(trackId) {
    const seed = trackId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return mockReviewers.slice(0, 4).map((reviewer, i) => {
        const s = seed + i * 31;
        const rating  = ((s * 3) % 5) + 6;                         // 6–10
        const likes   = ((s * 7 + 11) % 48) + 3;
        const dislikes = ((s + 13) % 14);
        const genre1  = ALL_GENRE_TAGS[(s * 2)    % ALL_GENRE_TAGS.length];
        const genre2  = ALL_GENRE_TAGS[(s * 2 + 3) % ALL_GENRE_TAGS.length];
        const feel1   = ALL_FEELING_TAGS[(s * 5)    % ALL_FEELING_TAGS.length];
        const feel2   = ALL_FEELING_TAGS[(s * 5 + 4) % ALL_FEELING_TAGS.length];
        const comment = REVIEW_COMMENTS[s % REVIEW_COMMENTS.length];
        return {
            id: `rev-${trackId}-${i}`,
            user: reviewer,
            rating,
            genre_tags:   genre1 === genre2  ? [genre1]        : [genre1, genre2],
            feeling_tags: feel1  === feel2   ? [feel1]         : [feel1, feel2],
            comment,
            likes,
            dislikes,
        };
    });
}

// -- Mock user profiles (for /user/:username) -----------------------------------

export const mockUserProfiles = [
    {
        username:        "vinyl_hunter",
        avatar:          img("profile-vinyl-hunter", 200),
        joined:          "2023-04-12T00:00:00Z",
        rating_count:    87,
        follower_count:  234,
        following_count: 45,
        bio:             "Collecting records since 2010. Electronic, ambient, and shoegaze enthusiast.",
        ratings: allTracks.slice(3, 15).map((t, i) => ({
            id: `vhrat-${i}`,
            track: t,
            rating: [8, 7, 9, 6, 8, 9, 7, 8, 10, 7, 8, 6][i % 12],
        })),
    },
    {
        username:        "beatseeker99",
        avatar:          img("profile-beatseeker", 200),
        joined:          "2024-02-20T00:00:00Z",
        rating_count:    43,
        follower_count:  91,
        following_count: 128,
        bio:             "Always hunting for the next big thing. Rock and R&B mainly.",
        ratings: allTracks.slice(8, 20).map((t, i) => ({
            id: `bsrat-${i}`,
            track: t,
            rating: [7, 9, 8, 7, 6, 9, 8, 7, 8, 9, 7, 8][i % 12],
        })),
    },
    {
        username:        "lunar_waves",
        avatar:          img("profile-lunar-waves", 200),
        joined:          "2023-09-05T00:00:00Z",
        rating_count:    156,
        follower_count:  512,
        following_count: 67,
        bio:             "Music is medicine. Ambient, post-rock, and dream pop forever.",
        ratings: allTracks.slice(0, 12).map((t, i) => ({
            id: `lwrat-${i}`,
            track: t,
            rating: [9, 8, 10, 8, 7, 9, 8, 9, 7, 8, 9, 10][i % 12],
        })),
    },
];
