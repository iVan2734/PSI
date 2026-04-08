import { useEffect, useRef, useCallback } from "react";

/**
 * Returns a ref to attach to a sentinel element.
 * When the sentinel enters the viewport, `onLoadMore` is called.
 */
export function useInfiniteScroll(onLoadMore, enabled) {
    const sentinelRef = useRef(null);
    const onLoadMoreRef = useRef(onLoadMore);
    onLoadMoreRef.current = onLoadMore;

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !enabled) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) onLoadMoreRef.current();
            },
            { rootMargin: "200px" } // trigger 200px before reaching the bottom
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [enabled]);

    return sentinelRef;
}
