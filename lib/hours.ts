type OpenRow = { days: string; opens: string; closes: string }
type ClosedRow = { days: string; closed: boolean }
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

const formatRow = (row: HoursRow, { to, closed }: HoursLabels) =>
  'opens' in row
    ? `${row.days}: ${formatTime(row.opens)} ${to} ${formatTime(row.closes)}`
    : `${row.days}: ${closed}`

export const formatHours = (rows: HoursRow[], labels: HoursLabels) =>
  rows.map((row) => formatRow(row, labels)).join(labels.separator)
