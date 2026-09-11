import * as React from "react"
import { cn } from "@/lib/utils"

export type NumberRollProps = Omit<React.ComponentProps<"span">, "children"> & {
  value: number
  locales?: Intl.LocalesArgument
  format?: Intl.NumberFormatOptions
}

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

/**
 * Digits roll to each new value in the direction of change. The formatted value is the
 * accessible text; the rolling columns are decoration. Requires components/effects/effects.css.
 */
export function NumberRoll({ value, locales, format, className, ...props }: NumberRollProps) {
  const text = new Intl.NumberFormat(locales, format).format(value)
  const chars = [...text]
  return <span data-slot="number-roll" className={cn("azure-number-roll", className)} {...props}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true" className="azure-number-roll-track">
      {chars.map((char, index) => {
        // Keyed by place from the right, so columns persist and roll as the value changes.
        const place = chars.length - 1 - index
        return /\d/.test(char)
          ? <span key={`digit-${place}`} data-digit="" style={{ "--digit": char, "--place": place } as React.CSSProperties}>
            <span>{digits.map(digit => <span key={digit}>{digit}</span>)}</span>
          </span>
          : <span key={`mark-${place}`}>{char}</span>
      })}
    </span>
  </span>
}
