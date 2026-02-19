import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTopFiveActors, getActor } from "../services/api";

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [actorFilms, setActorFilms] = useState(null);
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
          setActorFilms(data);
          setActors([]);
        } else {
          const data = await getTopFiveActors();
          setActors(data);
          setActorFilms(null);
        }
      } catch (e) {
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [actor]);

  const styles = {
    page: {
      padding: 24,
      maxWidth: 1100,
      margin: "0 auto",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 6,
    },
    title: { margin: 0, fontSize: 28, letterSpacing: "-0.02em" },
    subtitle: { margin: "6px 0 18px", color: "#555", fontSize: 14 },

    backLink: {
      textDecoration: "none",
      color: "#111",
      fontWeight: 600,
    },

    gridRow: {
      display: "grid",
      gridTemplateColumns: "repeat(5, minmax(170px, 1fr))",
      gap: 12,
      alignItems: "stretch",
      overflowX: "auto",
      paddingBottom: 6,
    },

    gridList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 12,
    },

    card: {
      border: "1px solid #e6e6e6",
      borderRadius: 14,
      padding: 14,
      background: "#fff",
      boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
      minHeight: 110,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    pill: {
      width: "fit-content",
      fontSize: 12,
      padding: "4px 10px",
      borderRadius: 999,
      background: "#f3f4f6",
      color: "#111",
      marginBottom: 10,
      border: "1px solid #eee",
    },

    link: {
      textDecoration: "none",
      color: "#111",
      fontWeight: 800,
      lineHeight: 1.2,
      display: "inline-block",
      marginBottom: 8,
    },

    meta: { margin: 0, color: "#666", fontSize: 13 },
    error: { color: "crimson", marginTop: 10 },
    loading: { color: "#444", marginTop: 10 },

    hero: {
      border: "1px solid #e6e6e6",
      borderRadius: 16,
      padding: 16,
      background: "#fff",
      boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
      marginBottom: 14,
    },

    heroTop: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
    },

    heroTitle: { margin: 0, fontSize: 26, letterSpacing: "-0.02em" },

    divider: {
      border: "none",
      borderTop: "1px solid #eee",
      margin: "14px 0",
    },
  };

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;
  if (error) return <p style={{ padding: 24, color: "crimson" }}>{error}</p>;

  // -------------------------
  // Detail page: /actors/:actor
  // -------------------------
  if (actor) {
    const actorName =
      actorFilms?.length > 0
        ? `${actorFilms[0].first_name} ${actorFilms[0].last_name}`
        : decodeURIComponent(actor);

    const filmCount = actorFilms?.length || 0;

    // If your API returns top films already sorted, this will show them in that order.
    // If not, you can sort here by rented_count desc.
    const filmsSorted = Array.isArray(actorFilms)
      ? [...actorFilms].sort((a, b) => (b.rented_count || 0) - (a.rented_count || 0))
      : [];

    return (
      <div style={styles.page}>
        <div style={styles.headerRow}>
          <Link to="/actors" style={styles.backLink}>
            ← Back to Actors
          </Link>
          <Link to="/" style={styles.backLink}>
            Home
          </Link>
        </div>

        <div style={styles.hero}>
          <div style={styles.heroTop}>
            <h1 style={styles.heroTitle}>{actorName}</h1>
            <div style={styles.pill}>
              {filmCount} {filmCount === 1 ? "film" : "films"} shown
            </div>
          </div>
          <p style={styles.subtitle}>
            Most rented films featuring this actor
          </p>

          <hr style={styles.divider} />

          {filmsSorted.length > 0 ? (
            <div style={styles.gridList}>
              {filmsSorted.map((row, idx) => (
                <div key={row.film_id} style={styles.card}>
                  <div>
                    <div style={styles.pill}>#{idx + 1}</div>
                    <Link
                      to={`/films/${encodeURIComponent(row.title)}`}
                      style={styles.link}
                    >
                      {row.title}
                    </Link>
                  </div>

                  <p style={styles.meta}>
                    Rented <strong>{row.rented_count}</strong> times
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No films found for this actor.</p>
          )}
        </div>
      </div>
    );
  }

  // -------------------------
  // List page: /actors
  // -------------------------
  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Actors</h1>
        <Link to="/" style={styles.backLink}>
          Home
        </Link>
      </div>
      <p style={styles.subtitle}>Top 5 actors in the store (by movies featured).</p>

      <div style={styles.gridRow}>
        {actors.map((a, idx) => {
          const fullName = `${a.first_name} ${a.last_name}`;
          return (
            <div key={a.actor_id} style={styles.card}>
              <div>
                <div style={styles.pill}>#{idx + 1}</div>
                <Link
                  to={`/actors/${encodeURIComponent(fullName)}`}
                  style={styles.link}
                >
                  {fullName}
                </Link>
              </div>

              <p style={styles.meta}>
                <strong>{a.movies_count}</strong> movies
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
