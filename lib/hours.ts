type Days = { days: string; daysShort?: string }
type OpenRow = Days & { opens: string; closes: string }
type ClosedRow = Days & { closed: boolean }
type HoursRow = OpenRow | ClosedRow

interface HoursLabels {
  to: string
  closed: string
  separator: string
}

// '09:00' → '9h'; '08:30' → '8h30' (notação de hora pt-BR)
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  return `${Number(hours)}h${minutes === '00' ? '' : minutes}`
}

const isOpen = (row: HoursRow): row is OpenRow => 'opens' in row

const formatRow = (row: HoursRow, { to, closed }: HoursLabels) =>
  isOpen(row)
    ? `${row.days}: ${formatTime(row.opens)} ${to} ${formatTime(row.closes)}`
    : `${row.days}: ${closed}`

// Versão compacta (faixa de contato): só dias abertos, "Seg–Sex 9h–18h";
// o "–" entre horários é notação de intervalo, como o "h" da hora
const formatShortRow = (row: OpenRow) =>
  `${row.daysShort ?? row.days} ${formatTime(row.opens)}–${formatTime(row.closes)}`

export const formatHours = (rows: HoursRow[], labels: HoursLabels) =>
  rows.map((row) => formatRow(row, labels)).join(labels.separator)

export const formatShortHours = (rows: HoursRow[], separator: string) =>
  rows.filter(isOpen).map(formatShortRow).join(separator)
