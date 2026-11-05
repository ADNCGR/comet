import type { CSSProperties, ElementType } from "react";
import { cn } from "@/lib/utils";

type LinesProps = {
  as?: ElementType;
  lines: string[];
  className?: string;
  /** extra wait before the first line, in ms */
  delay?: number;
  id?: string;
};

/**
 * A title whose lines slide up from behind a mask, one after the other, as it
 * enters the screen (.lines in index.css, driven by useRevealObserver).
 */
export const Lines = ({ as: Tag = "h2", lines, className, delay, id }: LinesProps) => (
  <Tag id={id} className={cn("lines", className)} style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}>
    {lines.map((line, i) => (
      <span key={i}>
        <span style={{ "--i": i } as CSSProperties}>{line}</span>
      </span>
    ))}
  </Tag>
);
