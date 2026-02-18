import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopFiveFilms, getTopFiveActors } from "../services/api";

export default function Landing() {
  const [films, setFilms] = useState([]); // top 5 films
  const [actors, setActors] = useState([]); // top 5 actors
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
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const styles = {
    page: {
      padding: 24,
      maxWidth: 1100,
      margin: "0 auto",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    },
    header: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 16,
      marginBottom: 8,
    },
    title: { margin: 0, fontSize: 32, letterSpacing: "-0.02em" },
    subtitle: { margin: "6px 0 18px", color: "#555", fontSize: 14 },
    section: { marginTop: 22 },
    sectionTitle: { margin: "0 0 10px", fontSize: 18 },
    gridRow: {
      display: "grid",
      gridTemplateColumns: "repeat(5, minmax(170px, 1fr))",
      gap: 12,
      alignItems: "stretch",
      overflowX: "auto",
      paddingBottom: 6,
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
    rank: {
      width: "fit-content",
      fontSize: 12,
      padding: "4px 10px",
      borderRadius: 999,
      background: "#f3f4f6",
      color: "#111",
      marginBottom: 10,
    },
    link: {
      textDecoration: "none",
      color: "#111",
      fontWeight: 700,
      lineHeight: 1.2,
      display: "inline-block",
      marginBottom: 8,
    },
    meta: { margin: 0, color: "#666", fontSize: 13 },
    error: { color: "crimson", marginTop: 10 },
    loading: { color: "#444", marginTop: 10 },
    divider: {
      border: "none",
      borderTop: "1px solid #eee",
      margin: "18px 0 0",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sakila Movie Store</h1>
      </div>
      

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Top 5 rented films of all time</h2>

        <div style={styles.gridRow}>
          {films.map((f, idx) => (
            <div key={f.film_id} style={styles.card}>
              <div>
                <div style={styles.rank}>#{idx + 1}</div>
                <Link
                  to={`/films/${encodeURIComponent(f.title)}`}
                  style={styles.link}
                >
                  {f.title}
                </Link>
              </div>

              <p style={styles.meta}>{f.rental_count} rentals</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={styles.divider} />

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Top 5 actors in store</h2>

        <div style={styles.gridRow}>
          {actors.map((a, idx) => {
            const fullName = `${a.first_name} ${a.last_name}`;
            return (
              <div key={a.actor_id} style={styles.card}>
                <div>
                  <div style={styles.rank}>#{idx + 1}</div>
                  <Link
                    to={`/actors/${encodeURIComponent(fullName)}`}
                    style={styles.link}
                  >
                    {fullName}
                  </Link>
                </div>

                <p style={styles.meta}>{a.movies_count} movies</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
