import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ListenListContext = createContext(null);

const STORAGE_KEY = "urate_listen_list";

export function ListenListProvider({ children }) {
    const [list, setList] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
    }, [list]);

    const add = useCallback((track) => {
        setList(prev => prev.some(t => t.id === track.id) ? prev : [...prev, track]);
    }, []);

    const remove = useCallback((trackId) => {
        setList(prev => prev.filter(t => t.id !== trackId));
    }, []);

    const toggle = useCallback((track) => {
        setList(prev =>
            prev.some(t => t.id === track.id)
                ? prev.filter(t => t.id !== track.id)
                : [...prev, track]
        );
    }, []);

    const has = useCallback((trackId) => list.some(t => t.id === trackId), [list]);

    return (
        <ListenListContext.Provider value={{ list, add, remove, toggle, has }}>
            {children}
        </ListenListContext.Provider>
    );
}

export function useListenList() {
    return useContext(ListenListContext);
}
