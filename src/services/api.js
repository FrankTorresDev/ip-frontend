const API_BASE = "/api"; // proxied to Flask

export async function getFilms() {
  const res = await fetch(`${API_BASE}/films/`);
  if (!res.ok) throw new Error("Failed to fetch films");
  return res.json();
}

//get the top 5 films
export async function getTopFiveFilms() {
  const res = await fetch(`${API_BASE}/films/?topfive=1`);
  if (!res.ok) throw new Error("Failed to fetch films");
  return res.json();
}

//get the top 5 actors
export async function getTopFiveActors() {
  const res = await fetch(`${API_BASE}/films/?topfiveActors=1`);
  if (!res.ok) throw new Error("Failed to fetch actors");
  return res.json();
}

//get actor
export async function getActor(actor) {
  const res = await fetch(`${API_BASE}/films/?actor=${encodeURIComponent(actor)}`);
  if (!res.ok) throw new Error("Failed to fetch actor");
  return res.json();
}


export async function getFilmByTitle(title) {
  const res = await fetch(
    `${API_BASE}/films/by-title/${encodeURIComponent(title)}`
  );
  if (!res.ok) throw new Error("Failed to fetch film");
  return res.json();
}

//this will return the movies that include the actor
export async function getFilmByActor(actor) {
  const res = await fetch(
    `${API_BASE}/films/by-actor/${encodeURIComponent(actor)}`
  );
  if (!res.ok) throw new Error("Failed to fetch film");
  return res.json();
}

//this will return the movie by category
export async function getFilmByCategory(category) {
  const res = await fetch(
    `${API_BASE}/films/by-category/${encodeURIComponent(category)}`
  );
  if (!res.ok) throw new Error("Failed to fetch film");
  return res.json();
}