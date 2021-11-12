export const parseDate = (date: string) => {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  const newDate = new Date(date)
  const day = newDate.getDay()
  const month = months[newDate.getMonth()]
  const year = newDate.getFullYear()

  return `${day} ${month} ${year}` || 'Date not valid'
}
