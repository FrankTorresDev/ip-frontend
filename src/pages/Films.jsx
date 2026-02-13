import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFilms, getFilmByTitle } from "../services/api";
import SearchBar from "../components/SearchBar";

export default function Films() {
  const { title } = useParams(); // /films/:title

  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState(null);

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
        }
      } catch (e) {
        setError(e?.message || "Error fetching films");
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);

  async function handleSearch(filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const res = await fetch(`/api/films/search?${params.toString()}`);
  const data = await res.json();
  setFilms(data);
}


  // DETAILS VIEW
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

  // LIST VIEW
  return (
    <div style={{ padding: 24 }}>
      <h1>Films</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {films.map((f) => (
            <li key={f.film_id}>
              <Link to={`/films/${encodeURIComponent(f.title)}`}>{f.title}</Link>{" "}
              {f.release_year ? `(${f.release_year})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
