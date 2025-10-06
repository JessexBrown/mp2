import { useEffect, useMemo, useState } from "react";
import { fetchFirstGenDetails } from "../../api/poke";
import { selectionStore } from "../../store/selectionStore";
import SearchBar from "../../components/common/SearchBar";
import SortControls from "../../components/common/SortControls";
import Card from "../../components/common/Card";
import { Pokemon } from "../../types/pokemon";
import styles from "./ListView.module.css";

export default function ListView() {
  const [raw, setRaw] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "id">("name");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const full = await fetchFirstGenDetails();
        if (mounted) setRaw(full);
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? raw.filter((p) => p.name.includes(q) || String(p.id) === q) : raw;
    const sorted = [...base].sort((a, b) => {
      const vA = sortKey === "name" ? a.name : a.id;
      const vB = sortKey === "name" ? b.name : b.id;
      if (vA < vB) return direction === "asc" ? -1 : 1;
      if (vA > vB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [raw, query, sortKey, direction]);

  useEffect(() => {
    selectionStore.setList(filtered.map((p) => p.id));
  }, [filtered]);

  if (loading) return <div>Loading…</div>;

  return (
    <section className={styles.wrap}>
      <div className={styles.headerRow}>
        <h1>Pokémon (List)</h1>
        <div className={styles.controls}>
          <SearchBar value={query} onChange={setQuery} />
          <SortControls
            sortKey={sortKey}
            direction={direction}
            onChange={({ sortKey, direction }) => {
              setSortKey(sortKey);
              setDirection(direction);
            }}
          />
        </div>
      </div>

      <div className={styles.list}>
        {filtered.map((p, i) => {
          const art =
            p.sprites.other?.["official-artwork"]?.front_default ||
            p.sprites.front_default || "";

          const subtitle = (
            <div className={styles.metaRow}>
              <span className={styles.meta}><strong>ID:</strong> {p.id}</span>
              <span className={styles.meta}><strong>Types:</strong> {p.types.map(t => t.type.name).join(", ")}</span>
              <span className={styles.meta}><strong>HW:</strong> {p.height}/{p.weight}</span>
            </div>
          );

          return (
            <Card
              key={p.id}
              to={`/pokemon/${p.id}`}
              onClick={() => selectionStore.setIndex(i)}
              imgSrc={art}
              imgAlt={p.name}
              variant="horizontal"
              mediaHeight="sm"
              compact
              title={<span className={styles.rowTitle}>{p.name}</span>}
              subtitle={subtitle}
            />
          );
        })}
      </div>
    </section>
  );
}
