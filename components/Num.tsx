import React from "react";

/**
 * Renders a number, grade or amount as left-to-right monospace tabular text.
 * In Arabic sentences the bidi algorithm would otherwise reorder "17.85 / 20.00" or "1,425.000".
 * Digits stay Western (0-9), which is the convention in Tunisia.
 * Supports either `<Num>12.50</Num>` or `<Num value="12.50" />`.
 */
export function Num({
  value,
  children,
  className = "",
}: {
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <bdi dir="ltr" className={`font-mono tabular-nums ${className}`}>
      {value ?? children}
    </bdi>
  );
}
