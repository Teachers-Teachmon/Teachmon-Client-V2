import type { CalendarEvent, CalendarRangeEvent, LegendItem, DayInfo, CalendarProps } from '@/types/calendar'
import { useCalendar, useDragSelect } from '@/hooks/useCalendar'
import { DAYS_OF_WEEK, LEFT_DOUBLE_ARROW, RIGHT_DOUBLE_ARROW, getDayType } from '@/utils/calendar'
import * as S from './style'

export type { CalendarEvent, CalendarRangeEvent, LegendItem, DayInfo, CalendarProps }

export default function Calendar({
  year: controlledYear,
  month: controlledMonth,
  onMonthChange,
  events = [],
  rangeEvents = [],
  legends = [],
  onDateClick,
  onEventClick,
  onRangeSelect,
  showYear = true,
  showLegend = true,
  selectable = false,
  exchangeMode = false,
  currentTeacherId,
  selectedMyEvent,
  onMyEventSelect,
  onTargetEventSelect,
}: CalendarProps) {
  const { year, month, calendarDays, rangeEventRows, handlePrevMonth, handleNextMonth, getEventsForDate, getRangeEventsForDate } = useCalendar({ controlledYear, controlledMonth, onMonthChange, events, rangeEvents })
  const { isDateInDragRange, handleMouseDown, handleMouseEnter, handleMouseUp } = useDragSelect({ enabled: selectable, onRangeSelect })
  const prevMonthNum = month === 1 ? 12 : month - 1
  const nextMonthNum = month === 12 ? 1 : month + 1
  const isInteractive = selectable || exchangeMode || !!onDateClick || !!onEventClick

  const handleEventClick = (event: CalendarEvent) => {
    if (exchangeMode) {
      if (event.teacherId === currentTeacherId) {
        onMyEventSelect?.(event)
      } else {
        onTargetEventSelect?.(event)
      }
    } else {
      onEventClick?.(event)
    }
  }

  return (
    <S.CalendarContainer onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {showYear && <S.YearTitle>{year}년</S.YearTitle>}
      <S.HeaderRow>
        <S.MonthNavigation>
          <S.NavButton onClick={handlePrevMonth}>
            <S.ArrowIcon src={LEFT_DOUBLE_ARROW} alt="이전 월" />
          </S.NavButton>
          <S.MonthText key={`prev-${month}`} isActive={false} onClick={handlePrevMonth}>{prevMonthNum}월</S.MonthText>
          <S.MonthText key={`current-${month}`} isActive={true}>{month}월</S.MonthText>
          <S.MonthText key={`next-${month}`} isActive={false} onClick={handleNextMonth}>{nextMonthNum}월</S.MonthText>
          <S.NavButton onClick={handleNextMonth}>
            <S.ArrowIcon src={RIGHT_DOUBLE_ARROW} alt="다음 월" />
          </S.NavButton>
        </S.MonthNavigation>
        {showLegend && legends.length > 0 && (
          <S.LegendContainer>
            {legends.map((legend) => (
              <S.LegendTag key={legend.id} bgColor={legend.bgColor} textColor={legend.textColor}>{legend.label}</S.LegendTag>
            ))}
          </S.LegendContainer>
        )}
      </S.HeaderRow>
      <S.CalendarGrid>
        <S.WeekHeader>
          {DAYS_OF_WEEK.map((day, index) => (
            <S.WeekDay key={day} dayType={getDayType(index)}>{day}</S.WeekDay>
          ))}
        </S.WeekHeader>
        <S.DaysGridWrapper>
          <S.DaysGrid>
            {calendarDays.map(({ date, isCurrentMonth }, index) => {
              const dayEvents = getEventsForDate(date)
              const dayRangeEvents = getRangeEventsForDate(date)
              const dayType = getDayType(date.getDay())
              const isInDragRange = isDateInDragRange(date)
              return (
                <S.DayCell
                  key={index}
                  isCurrentMonth={isCurrentMonth}
                  isSelected={isInDragRange}
                  isInteractive={isInteractive}
                  onMouseDown={() => handleMouseDown(date)}
                  onMouseEnter={() => handleMouseEnter(date)}
                  onClick={() => !selectable && onDateClick?.(date, { date, isCurrentMonth, events: dayEvents, rangeEvents: dayRangeEvents })}
                >
                  <S.DayNumber dayType={dayType} isCurrentMonth={isCurrentMonth}>{date.getDate()}</S.DayNumber>
                  <S.EventList>
                    {dayEvents.map((event) => {
                      const isMyEvent = event.teacherId === currentTeacherId
                      let isDisabled = false

                      if (exchangeMode) {
                        if (!selectedMyEvent) {
                          isDisabled = !isMyEvent
                        } else {
                          isDisabled = isMyEvent
                        }
                      }

                      return (
                        <S.EventTag
                          key={event.id}
                          bgColor={event.bgColor}
                          textColor={event.textColor}
                          clickable={!!onEventClick || (exchangeMode && !isDisabled)}
                          isSelected={exchangeMode && selectedMyEvent?.id === event.id}
                          isDisabled={isDisabled}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!isDisabled) {
                              handleEventClick(event)
                            }
                          }}
                        >
                          {event.label}
                        </S.EventTag>
                      )
                    })}
                  </S.EventList>
                </S.DayCell>
              )
            })}
            {rangeEventRows.map(({ event, startIndex, span, row, showLabel }, idx) => (
              <S.RangeEventOverlay key={`${event.id}-${row}-${idx}`} bgColor={event.bgColor} textColor={event.textColor} startCol={startIndex} span={span} row={row}>
                {showLabel && event.label}
              </S.RangeEventOverlay>
            ))}
          </S.DaysGrid>
        </S.DaysGridWrapper>
      </S.CalendarGrid>
    </S.CalendarContainer>
  )
}
