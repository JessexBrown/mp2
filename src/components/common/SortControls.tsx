import styles from "./SortControls.module.css";

type SortKey = "name" | "id";
type Direction = "asc" | "desc";

export default function SortControls({
  sortKey,
  direction,
  onChange,
}: {
  sortKey: SortKey;
  direction: Direction;
  onChange: (next: { sortKey: SortKey; direction: Direction }) => void;
}) {
  const toggleDir = () =>
    onChange({ sortKey, direction: direction === "asc" ? "desc" : "asc" });

  return (
    <div className={styles.wrap} role="group" aria-label="Sorting controls">
      <label className={styles.label}>
        <span className={styles.srOnly}>Sort by</span>
        <select
          className={styles.select}
          value={sortKey}
          onChange={(e) => onChange({ sortKey: e.target.value as SortKey, direction })}
          aria-label="Sort by"
        >
          <option value="name">Name</option>
          <option value="id">ID</option>
        </select>
      </label>

      <button
        type="button"
        className={styles.dirButton}
        onClick={toggleDir}
        aria-label={`Sort direction: ${direction === "asc" ? "ascending" : "descending"}`}
      >
        {direction === "asc" ? "Asc ↑" : "Desc ↓"}
      </button>
    </div>
  );
}
