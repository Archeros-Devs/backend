import dayjs from 'dayjs'

export const dateToMs = (data: Date) => {
  return dayjs(data).valueOf()
}
