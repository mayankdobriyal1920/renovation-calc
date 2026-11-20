/**
 * CSV helpers. Protects against spreadsheet formula injection by prefixing
 * cells that begin with =, +, -, or @ with an apostrophe.
 */

const DANGEROUS_PREFIX = /^[=+\-@]/;

export function sanitizeCsvCell(value: string | number): string {
  const str = String(value);
  if (DANGEROUS_PREFIX.test(str)) {
    return `'${str}`;
  }
  return str;
}

export function toCsv(rows: (string | number)[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const s = sanitizeCsvCell(cell);
          if (/[",\n]/.test(s)) {
            return `"${s.replace(/"/g, '""')}"`;
          }
          return s;
        })
        .join(","),
    )
    .join("\n");
}

export function downloadCsv(filename: string, content: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
