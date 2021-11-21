import React, { useMemo, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Calendar } from "calendar";
import styled from "styled-components";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import classNames from "classnames";
dayjs.extend(weekOfYear)

const WEEKDAYS = [
  "Mon",
  "Tue",
  "Wen",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
]

function Plugin({ useWebsockets }) {
  const { loading, state, send } = useWebsockets();
  const [[year, month], setDate] = useState(() => {
    const date = new Date()
    return [date.getFullYear(), date.getMonth()]
  })

  const calendar = useMemo(() => {
    return new Calendar(1).monthDates(year, month)
  }, [month, year])

  if (loading)
    return (
      <div className="w-full h-full bgcalendar-gray-100 flex text-gray-500 p-8 select-none">
        <CgSpinner className="animate-spin text-3xl m-auto" />
      </div>
    )

  const handleNextMonth = () => {
    if (month + 1 === 12) return setDate([year + 1, 1])
    setDate([year, month + 1])
  }

  const handlePrevMonth = () => {
    if (month + 1 === 1) return setDate([year - 1, 12])
    setDate([year, month - 1])
  }
  console.log(calendar)

  return (
    <div className="w-full h-full bg-gray-300 text-gray-500 text-center flex flex-col">
      <CalendarContainer
        className="grid flex-grow"
        style={{ gridTemplateRows: `2em repeat(${calendar.length}, 1fr)` }}
      >
        <div></div>
        {WEEKDAYS.map((day) => (
          <div className="font-bold text-sm place-self-center" key={day}>
            {day}
          </div>
        ))}
        <div
          className="bg-white row-start-2 col-start-2 col-span-full row-span-full rounded-tl-3xl shadow-2xl grid grid-cols-7"
          style={{ gridTemplateRows: `repeat(${calendar.length}, 1fr)` }}
        >
          {calendar.map(
            (week, weekI) => week.map((day, dayI) => (
              <div
                className={classNames("text-xs p-2 border-gray-100", weekI && 'border-t', dayI && 'border-l')}
                key={day.getTime()}
              >
                {day.getDate()}
              </div>
            ))
          )}
        </div>
        {calendar.map(([date]) => {
          const weekNumber = dayjs(date).week()
          return (
            <div className="font-bold text-xs place-self-center" key={weekNumber}>
              {weekNumber}
            </div>
          );
        })}
      </CalendarContainer>
    </div>
  );
}

export default Plugin;

const CalendarContainer = styled.div`
  grid-template-columns: 2em repeat(7, 1fr);
`
