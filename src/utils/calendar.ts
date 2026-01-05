export const getDayType = (dayOfWeek: number): 'sunday' | 'saturday' | 'weekday' => {
  if (dayOfWeek === 0) return 'sunday'
  if (dayOfWeek === 6) return 'saturday'
  return 'weekday'
}

export const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
export const LEFT_DOUBLE_ARROW = '/icons/LeftDoubleArrow.svg'
export const RIGHT_DOUBLE_ARROW = '/icons/RightDoubleArrow.svg'
