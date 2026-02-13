import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    title: "",
    actor: "",
    category: ""
  });

  function handleChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(filters);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12 }}>
      
      <input
        type="text"
        name="title"
        placeholder="Film Title"
        value={filters.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="actor"
        placeholder="Actor Name"
        value={filters.actor}
        onChange={handleChange}
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        <option value="Action">Action</option>
        <option value="Action">Animation</option>
        <option value="Action">Children</option>
        <option value="Action">Classics</option>
        <option value="Action">Documentary</option>
        <option value="Action">Drama</option>
        <option value="Action">Family</option>
        <option value="Action">Foreign</option>
        <option value="Action">Games</option>
        <option value="Comedy">Horror</option>
        <option value="Action">Music</option>
        <option value="Action">New</option>
        <option value="Drama">Sci-fi</option>
        <option value="Horror">Sports</option>
        <option value="Sci-Fi">Travel</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
}
