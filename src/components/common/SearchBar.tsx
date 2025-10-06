import styles from "./SearchBar.module.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search Pokémon…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={styles.wrap}>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search Pokémon"
      />
      {/* Clean magnifier: circle + handle; sized and colored via CSS */}
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="16.65" y1="16.65" x2="21" y2="21" />
      </svg>
    </div>
  );
}
