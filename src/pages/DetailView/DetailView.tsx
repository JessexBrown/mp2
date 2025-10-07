import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemon } from "../../api/poke";
import { selectionStore } from "../../store/selectionStore";
import { Pokemon } from "../../types/pokemon";
import styles from "./DetailView.module.css";

const MAX_STAT = 255;

export default function DetailView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const p = await fetchPokemon(id);
      setData(p);
      const list = selectionStore.getList();
      const idx = list.findIndex((x) => String(x) === String(p.id));
      selectionStore.setIndex(idx >= 0 ? idx : 0);
    })();
  }, [id]);

  const art = useMemo(() => {
    if (!data) return "";
    return (
      data.sprites.other?.["official-artwork"]?.front_default ||
      data.sprites.front_default ||
      ""
    );
  }, [data]);

  const goPrev = () => {
    const prev = selectionStore.prevId();
    if (prev) nav(`/pokemon/${prev}`);
  };
  const goNext = () => {
    const next = selectionStore.nextId();
    if (next) nav(`/pokemon/${next}`);
  };

  if (!data) return <div>Loading…</div>;

  return (
    <article className={styles.wrap}>
      <div className={styles.topBar}>
        <button className={styles.navBtn} onClick={goPrev} aria-label="Previous">← Prev</button>
        <h1 className={styles.title}><strong>#{data.id}</strong> {data.name}</h1>
        <button className={styles.navBtn} onClick={goNext} aria-label="Next">Next →</button>
      </div>

      <div className={styles.grid}>
        <div className={styles.mediaPanel}>
          <div className={styles.media}>
            <img src={art} alt={data.name} />
          </div>
        </div>

        <div className={styles.infoCol}>
          {/* About */}
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>About</h2>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutRow}>
                <span className={styles.aboutKey}>Name</span>
                <span className={`${styles.aboutVal} ${styles.cap}`}>
                  {data.name}
                </span>
              </div>
              <div className={styles.aboutRow}>
                <span className={styles.aboutKey}>Types</span>
                <span className={styles.aboutVal}>
                  <span className={styles.pills}>
                    {data.types.map((t) => (
                      <span key={t.type.name} className={styles.pill}>
                        {t.type.name}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
              <div className={styles.aboutRow}>
                <span className={styles.aboutKey}>Height (dm)</span>
                <span className={styles.aboutVal}>{data.height}</span>
              </div>
              <div className={styles.aboutRow}>
                <span className={styles.aboutKey}>Weight (hg)</span>
                <span className={styles.aboutVal}>{data.weight}</span>
              </div>
            </div>
          </section>

          {/* Base Stats */}
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Base Stats</h2>
            <div role="table" aria-label="Base stats" className={styles.statTable}>
              <div className={styles.statHeader} role="row">
                <div role="columnheader" className={styles.colStat}>Stat</div>
                <div role="columnheader" className={styles.colVal}>Value</div>
                <div role="columnheader" className={styles.colBar}>Progress</div>
              </div>

              {data.stats.map((s) => {
                const val = s.base_stat;
                return (
                  <div key={s.stat.name} role="row" className={styles.statRow}>
                    <div role="cell" className={styles.colStatLabel}>
                      <span className={styles.statName}>{s.stat.name}</span>
                    </div>
                    <div role="cell" className={styles.colValNum}>{val}</div>
                    <div role="cell" className={styles.colBarArea}>
                      <progress
                        className={styles.progress}
                        max={MAX_STAT}
                        value={val}
                        aria-label={`${s.stat.name} ${val} of ${MAX_STAT}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
