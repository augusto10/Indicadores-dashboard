// Utility formatters and safe math helpers

export function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  if (denominator === 0 || !isFinite(denominator) || isNaN(denominator)) return fallback;
  if (!isFinite(numerator) || isNaN(numerator)) return fallback;
  return numerator / denominator;
}

export function clampPercent(value: number, min = 0, max = 200): number {
  if (!isFinite(value) || isNaN(value)) return 0;
  return Math.min(Math.max(value, min), max);
}

export function formatPercent(value: number, digits: number = 1): string {
  if (!isFinite(value) || isNaN(value)) return '0%';
  return `${value.toFixed(digits)}%`;
}

export function formatCurrencyBRL(value: number): string {
  if (!isFinite(value) || isNaN(value)) return 'R$ 0,00';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatNumber(value: number, digits?: number): string {
  if (!isFinite(value) || isNaN(value)) return '0';
  const opts: Intl.NumberFormatOptions = {};
  if (typeof digits === 'number') {
    opts.minimumFractionDigits = digits;
    opts.maximumFractionDigits = digits;
  }
  return value.toLocaleString('pt-BR', opts);
}
