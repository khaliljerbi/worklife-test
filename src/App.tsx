import { useState } from "react";
import Header from "./components/header/Header";
import { useFetchTiles } from "./hooks/useFetchTiles";
import { Tiles } from "./types/tiles.type";

import "./App.scss";

function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const { tiles, count, loading } = useFetchTiles(page, 20, q);

  const handleLoadMoreData = () => {
    setPage((page: number) => page + 1);
  };

  const handleSearch = () => {
    setQ(search);
  };

  return (
    <div>
      <Header />
      <main className="container">
        <div className="main">
          <div className="search">
            <input
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="button" onClick={handleSearch}>
              Search
            </button>
          </div>
          {tiles.length ? (
            <div className="tile-list">
              {tiles.map((tile: Tiles) => (
                <div className="tile" key={tile.id}>
                  <img
                    className="tile-img"
                    loading="lazy"
                    src={tile.webImage?.url ?? "/no_image.png"}
                    alt={tile.title}
                    onError={(e) => {
                      e.currentTarget.src = "/no_image.png";
                    }}
                  />
                  <span className="tile-overview">{tile.longTitle}</span>
                </div>
              ))}
            </div>
          ) : null}
          {loading && <p>loading...</p>}
          {count === tiles.length || !(tiles.length < 20) && (
            <button className="button" style={{ marginTop: '2rem' }} onClick={handleLoadMoreData}>
              Load more
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
