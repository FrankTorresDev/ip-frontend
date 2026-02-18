import { useEffect, useMemo, useState } from "react";
import { getCustomers } from "../services/api";
import CustomersTable from "../components/CustomersTable";
import CustomerSearchBar from "../components/CustomerSearchBar";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // search
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCustomers();
        console.log("CUSTOMERS FROM API:", data);

        const arr = Array.isArray(data) ? data : data?.customers ?? [];

        
        const normalized = arr.map((c) => {
          const first = c.first_name ?? c.firstName ?? "";
          const last = c.last_name ?? c.lastName ?? "";
          const name = `${first} ${last}`.trim();

          return {
            ...c,

            // add common aliases
            first_name: first,
            last_name: last,
            firstName: first,
            lastName: last,
            name,

            // keep a consistent id key if table expects id
            id: c.customer_id ?? c.id,
          };
        });

        setCustomers(normalized);
      } catch (e) {
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = (value) => {
    setQuery(value ?? "");
    setPage(0);
  };

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter((c) => {
      const first = (c.first_name ?? "").toLowerCase();
      const last = (c.last_name ?? "").toLowerCase();
      const name = (c.name ?? "").toLowerCase();
      const email = (c.email ?? "").toLowerCase();
      const id = String(c.customer_id ?? c.id ?? "");

      return (
        first.includes(q) ||
        last.includes(q) ||
        name.includes(q) ||
        email.includes(q) ||
        id.includes(q)
      );
    });
  }, [customers, query]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Customers</h1>

      <CustomerSearchBar onSearch={handleSearch} />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <CustomersTable
          customers={filteredCustomers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      )}
    </div>
  );
}
