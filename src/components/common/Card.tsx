import { Link } from "react-router-dom";
import styles from "./Card.module.css";

// Simple helper to join class names safely
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "vertical" | "horizontal";
type MediaSize = "sm" | "md" | "lg";

type Props = {
  to?: string;
  imgSrc?: string | null;
  imgAlt?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;

  /** Layout/style controls */
  variant?: Variant;           // "vertical" (default for Gallery) or "horizontal" (used by List)
  mediaHeight?: MediaSize;     // controls media box size; default "md"
  compact?: boolean;           // smaller paddings for dense rows
};

export default function Card({
  to,
  imgSrc,
  imgAlt = "",
  title,
  subtitle,
  footer,
  onClick,
  className,
  variant = "vertical",
  mediaHeight = "md",
  compact = false,
}: Props) {
  const content = (
    <div
      className={cn(
        styles.card,
        styles[variant],
        styles[`media-${mediaHeight}`],
        compact && styles.compact,
        className
      )}
      onClick={onClick}
    >
      {imgSrc ? (
        <div className={styles.media}>
          <img src={imgSrc} alt={imgAlt} />
        </div>
      ) : null}

      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className={styles.linkWrap} aria-label={String(imgAlt || title)}>
      {content}
    </Link>
  ) : (
    content
  );
}
