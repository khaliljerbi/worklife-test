import { useEffect, useState } from "react";
import { Tiles } from "../types/tiles.type";

export const useFetchTiles = (
  page: number = 1,
  pageContent: number = 20,
  q?: string
) => {
  const [tiles, setTiles] = useState<Tiles[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

      setTiles([]);
  }, [q]);

  useEffect(() => {
    const fetchTiles = async () => {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/nl/collection/?key=${
          import.meta.env.VITE_API_KEY
        }&p=${page}&ps=${pageContent}${q ? `&q=${q}` : ""}`
      );
      const json = await response.json();
      setLoading(false);
      setCount(json.count);
      setTiles((prev) => page === 1 ? json.artObjects : [...prev, ...json.artObjects]);
    };

    fetchTiles();
  }, [page, q]);



  return { tiles, loading, count };
};
