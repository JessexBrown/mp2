import styles from "./FilterChips.module.css";

export default function FilterChips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (name: string) => void;
}) {
  return (
    <div className={styles.wrap} role="group" aria-label="Filters">
      {options.map((opt) => {
        const on = selected.has(opt);
        return (
          <button
            key={opt}
            type="button"
            className={`${styles.chip} ${on ? styles.on : ""}`}
            onClick={() => onToggle(opt)}
            aria-pressed={on}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
