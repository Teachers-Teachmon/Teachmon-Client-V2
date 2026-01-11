export interface CalendarEvent {
  id: string
  date: Date
  label: string
  bgColor: string
  textColor: string
  teacherId?: number
  supervisionType?: 'self_study' | 'leave_seat'
}

export interface CalendarRangeEvent {
  id: string
  startDate: Date
  endDate: Date
  label: string
  bgColor: string
  textColor: string
}

export interface LegendItem {
  id: string
  label: string
  bgColor: string
  textColor: string
}

export interface DayInfo {
  date: Date
  isCurrentMonth: boolean
  events: CalendarEvent[]
  rangeEvents: CalendarRangeEvent[]
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
}

export interface RangeEventRow {
  event: CalendarRangeEvent
  startIndex: number
  span: number
  row: number
  showLabel: boolean
}

export interface CalendarProps {
  year?: number
  month?: number
  onMonthChange?: (year: number, month: number) => void
  events?: CalendarEvent[]
  rangeEvents?: CalendarRangeEvent[]
  legends?: LegendItem[]
  onDateClick?: (date: Date, dayInfo: DayInfo) => void
  onEventClick?: (event: CalendarEvent) => void
  onRangeSelect?: (startDate: Date, endDate: Date) => void
  showYear?: boolean
  showLegend?: boolean
  selectable?: boolean
  exchangeMode?: boolean
  currentTeacherId?: number
  selectedMyEvent?: CalendarEvent | null
  onMyEventSelect?: (event: CalendarEvent) => void
  onTargetEventSelect?: (event: CalendarEvent) => void
}
