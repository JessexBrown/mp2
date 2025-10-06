import { useEffect, useMemo, useState } from "react";
import { fetchFirstGenDetails } from "../../api/poke";
import { selectionStore } from "../../store/selectionStore";
import FilterChips from "../../components/common/FilterChips";
import Card from "../../components/common/Card";
import { Pokemon } from "../../types/pokemon";
import styles from "./GalleryView.module.css";

export default function GalleryView() {
  const [raw, setRaw] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    let mounted = true;
    (async () => {
      const full = await fetchFirstGenDetails();
      if (mounted) setRaw(full);
    })();
    return () => { mounted = false; };
  }, []);

  const allTypes = useMemo(() => {
    const s = new Set<string>();
    raw.forEach(p => p.types.forEach(t => s.add(t.type.name)));
    return Array.from(s).sort();
  }, [raw]);

  const filtered = useMemo(() => {
    if (!selected.size) return raw;
    return raw.filter(p => {
      const types = p.types.map(t => t.type.name);
      return types.some(t => selected.has(t));
    });
  }, [raw, selected]);

  useEffect(() => {
    selectionStore.setList(filtered.map(p => p.id));
  }, [filtered]);

  const toggle = (name: string) => {
    const ns = new Set(selected);
    if (ns.has(name)) ns.delete(name); else ns.add(name);
    setSelected(ns);
  };

  return (
    <section className={styles.wrap}>
      <h1>Pokémon (Gallery)</h1>

      <div className={styles.filters}>
        <FilterChips options={allTypes} selected={selected} onToggle={toggle} />
      </div>

      <div className={styles.grid}>
        {filtered.map((p, i) => {
          const art =
            p.sprites.other?.["official-artwork"]?.front_default ||
            p.sprites.front_default || "";
          const badges = (
            <div className={styles.badgeRow}>
              {p.types.map(t => (
                <span key={t.type.name} className={styles.badge}>{t.type.name}</span>
              ))}
            </div>
          );
          return (
            <Card
              key={p.id}
              to={`/pokemon/${p.id}`}
              onClick={() => selectionStore.setIndex(i)}
              imgSrc={art}
              imgAlt={p.name}
              title={<div className={styles.titleCenter}><strong>#{p.id}</strong> {p.name}</div>}
              footer={badges}
              mediaHeight="md"
            />
          );
        })}
      </div>
    </section>
  );
}
