import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopFiveFilms, getTopFiveActors } from "../services/api";

export default function Landing() {
  const [films, setFilms] = useState([]);   //for the top 5 films
  const [actors, setActors] = useState([]); //for the top 5 actors 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    (async () => {
      try {
        const data = await getTopFiveFilms();
        setFilms(data);
        const moreData = await getTopFiveActors();
        setActors(moreData);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Sakila Movie Store</h1>
      <p>Top 5 rented films of all time</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ol>
        {films.map((f) => (
          <li key={f.film_id} style={{ marginBottom: 8 }}>
            <Link to={`/films/${encodeURIComponent(f.title)}`}>
              {f.title}
            </Link>{" "}
            — {f.rental_count} rentals
          </li>
        ))}
      </ol>
      <p>
        Top 5 Actors in store
      </p>
      <ol>
        {actors.map((a) => (
          <li key={a.actor_id} style={{ marginBottom: 8 }}>
            <Link to={`/actors/${encodeURIComponent(a.first_name + ' ' + a.last_name)}`}>
              {a.first_name} {a.last_name}
            </Link>{" "}
            — {a.movies_count} movies
          </li>
        ))}
      </ol>
    </div>
  );
}
