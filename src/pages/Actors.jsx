import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTopFiveActors, getActor} from "../services/api";

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [actorShit, setActorShit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const { actor } = useParams(); // /actors/:actor


  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
        try {
            if (actor) {
            const data = await getActor(actor);
            setActorShit(data);
            setActors([]); 

            } else {
            const data = await getTopFiveActors();
            setActors(data);
            setActorShit(null); 

            }
      } catch (e) {
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [actor]);

if (loading) return <p style={{ padding: 24 }}>Loading...</p>;
if (error) return <p style={{ padding: 24, color: "crimson" }}>{error}</p>;

  if (actor) {
    const actorName =
      actorShit?.length > 0
        ? `${actorShit[0].first_name} ${actorShit[0].last_name}`
        : decodeURIComponent(actor);

    return (
      <div style={{ padding: 24 }}>
        <p>
          <Link to="/actors">← Back to Actors</Link>
        </p>

        <h1>{actorName}</h1>

        {actorShit?.length > 0 ? (
          <ol>
            {actorShit.map((row) => (
              <li key={row.film_id}>
                {row.title} — rented {row.rented_count} times
              </li>
            ))}
          </ol>
        ) : (
          <p>No films found for this actor.</p>
        )}
      </div>
    );
  }








  else{
  return (
    <div style={{ padding: 24 }}>
      <h1>Sakila Store</h1>

        <>
          <p>Top 5 Actors in store</p>
          <ol>
            {actors.map((a) => (
              <li key={a.actor_id} style={{ marginBottom: 8 }}>
                <Link
                  to={`/actors/${encodeURIComponent(
                    `${a.first_name} ${a.last_name}`
                  )}`}
                >
                  {a.first_name} {a.last_name}
                </Link>{" "}
                — {a.movies_count} movies
              </li>
            ))}
          </ol>
        </>
      
    </div>
  );
    }
}
