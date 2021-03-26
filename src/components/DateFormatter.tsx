import { parseISO, format } from 'date-fns'

interface Props {
  dateString: string
}

export default function DateFormatter({ dateString }: Props) {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className="text-sm text-gray-400">
      {format(date, 'LLLL	d, yyyy')}
    </time>
  )
}
