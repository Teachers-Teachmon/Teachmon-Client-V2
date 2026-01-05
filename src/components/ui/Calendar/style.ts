import styled from '@emotion/styled'
import { colors, radius } from '@/styles/theme'
import { fadeIn } from '@/styles/animations'

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  flex: 1;
  user-select: none;
`

export const YearTitle = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: ${colors.n04};
  text-align: center;
  margin: 0;
`

export const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
  width: 100%;
  position: relative;
`

export const MonthNavigation = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;

  &:hover {
    opacity: 0.7;
  }
`

export const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
`

export const MonthText = styled.span<{ isActive: boolean }>`
  font-family: 'Paperlogy', sans-serif;
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  font-size: ${({ isActive }) => (isActive ? '28px' : '20px')};
  color: ${({ isActive }) => (isActive ? colors.primary : '#6C757D')};
  letter-spacing: ${({ isActive }) => (isActive ? '1.4px' : '1px')};
  white-space: nowrap;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  animation: ${fadeIn} 0.2s ease-out;

  &:hover {
    opacity: ${({ isActive }) => (isActive ? 1 : 0.7)};
  }
`

export const LegendContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  gap: 13px;
  align-items: center;
`

export const LegendTag = styled.span<{ bgColor: string; textColor: string }>`
  padding: 4px 8px;
  border-radius: ${radius.sm};
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  background: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`

export const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12);
`

export const WeekHeader = styled.div`
  display: flex;
  background: #FAFAFA;
`

export const WeekDay = styled.div<{
  dayType: 'sunday' | 'saturday' | 'weekday'
}>`
  flex: 1;
  padding: 10px;
  background: ${colors.background};
  border: 1px solid #E8E8E8;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 15px;

  color: ${({ dayType }) => {
    switch (dayType) {
      case 'sunday':
        return '#FF5656'
      case 'saturday':
        return '#5751FF'
      default:
        return '#969696'
    }
  }};
`

export const DaysGridWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

export const DaysGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  position: relative;
`

export const DayCell = styled.div<{ isCurrentMonth: boolean; isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc(100% / 7);
  height: calc(100% / 5);
  padding: 10px;
  background: ${({ isCurrentMonth, isSelected }) =>
    isSelected ? 'rgba(0, 133, 255, 0.1)' : isCurrentMonth ? colors.background : '#F8F8F8'};
  border: 1px solid #E8E8E8;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
  z-index: 1;

  &:hover {
    background: ${({ isCurrentMonth, isSelected }) =>
      isSelected ? 'rgba(0, 133, 255, 0.15)' : isCurrentMonth ? '#FAFAFA' : '#F0F0F0'};
  }
`

export const DayNumber = styled.span<{
  dayType: 'sunday' | 'saturday' | 'weekday'
  isCurrentMonth: boolean
}>`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 16px;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.4)};

  color: ${({ dayType, isCurrentMonth }) => {
    if (!isCurrentMonth) return '#000000'
    switch (dayType) {
      case 'sunday':
        return '#FF5656'
      case 'saturday':
        return '#5751FF'
      default:
        return '#000000'
    }
  }};
`

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
`

export const EventTag = styled.span<{ bgColor: string; textColor: string; clickable?: boolean }>`
  display: inline-block;
  width: fit-content;
  padding: 4px 8px;
  border-radius: ${radius.sm};
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  background: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition: opacity 0.15s;

  &:hover {
    opacity: ${({ clickable }) => (clickable ? 0.8 : 1)};
  }
`

export const RangeEventOverlay = styled.div<{
  bgColor: string
  textColor: string
  startCol: number
  span: number
  row: number
}>`
  position: absolute;
  left: calc(${({ startCol }) => startCol} * (100% / 7));
  top: calc(${({ row }) => row} * (100% / 5));
  width: calc(${({ span }) => span} * (100% / 7));
  height: calc(100% / 5);
  background: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 14px;
  pointer-events: none;
  z-index: 2;
`
