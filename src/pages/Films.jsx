import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFilms, getFilmByTitle } from "../services/api";
import SearchBar from "../components/SearchBar";
import FilmsTable from "../components/FilmsTable";

export default function Films() {
  const { title } = useParams();

  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState(null);

  // ✅ pagination state lives here
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      try {
        if (title) {
          const data = await getFilmByTitle(title);
          setFilm(data);
          setFilms([]);
        } else {
          const data = await getFilms();
          setFilms(data);
          setFilm(null);
          setPage(0); // nice reset when returning to list
        }
      } catch (e) {
        setError(e?.message || "Error fetching films");
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);

  async function handleSearch(filters) {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`/api/films/search?${params.toString()}`);
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setFilms(data);

      // ✅ reset pagination after search
      setPage(0);
    } catch (e) {
      setError(e?.message || "Error searching films");
    } finally {
      setLoading(false);
    }
  }

  if (title && film) {
    return (
      <div style={{ padding: 24 }}>
        <p>
          <Link to="/films">← Back to Films</Link>
        </p>

        <h1>{film.title}</h1>
        {film.release_year && <p>Release year: {film.release_year}</p>}
        {film.rating && <p>Rating: {film.rating}</p>}
        {film.length && <p>Length: {film.length} min</p>}
        {film.description && <p>{film.description}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Films</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <FilmsTable
        films={films}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      />
    </div>
  );
}
