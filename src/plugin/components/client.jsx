import React, { useMemo, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Calendar } from "calendar";
import styled from "styled-components";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import classNames from "classnames";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
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

  const handlePrevMonth = () => {
    if (month + 1 === 1) return setDate([year - 1, 11])
    setDate([year, month - 1])
  }

  const handleNextMonth = () => {
    if (month + 1 === 12) return setDate([year + 1, 0])
    setDate([year, month + 1])
  }

  const handleCurrentMonth = () => {
    const date = new Date()
    setDate([date.getFullYear(), date.getMonth()])
  }

  return (
    <div className="w-full h-full bg-blueGray-200 text-gray-500 flex flex-col">
      <div className="flex p-3 justify-between items-center">
        <div className="font-bold text-lg ml-3">
          {MONTH_NAMES[month]} {year}
        </div>
        <div className="ml-2 space-x-1 flex text-2xl">
          <button
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            onClick={handlePrevMonth}
          >
            <FiChevronLeft strokeWidth={3} />
          </button>
          <button
            className={classNames(
              "w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-all",
              month === new Date().getMonth() && "opacity-50 pointer-events-none",
            )}
            onClick={handleCurrentMonth}
          >
            <FiCalendar strokeWidth={3} className="text-xl" />
          </button>
          <button
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            onClick={handleNextMonth}
          >
            <FiChevronRight strokeWidth={3} />
          </button>
        </div>
      </div>

      <CalendarContainer
        className="grid flex-grow"
        style={{ gridTemplateRows: `auto repeat(${calendar.length}, 1fr)` }}
      >
        <div />
        {WEEKDAYS.map((day) => (
          <div className="text-gray-400 font-bold text-xs place-self-center p-1" key={day}>
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
                className={classNames("text-xs p-2 border-gray-100 flex flex-col", weekI && 'border-t', dayI && 'border-l')}
                key={day.getTime()}
              >
                <div className="text-right">{day.getDate()}</div>
              </div>
            ))
          )}
        </div>
        {calendar.map(([date]) => {
          const weekNumber = dayjs(date).week()
          return (
            <div className="text-gray-400 font-bold text-xs place-self-center p-1" key={weekNumber}>
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
  grid-template-columns: auto repeat(7, 1fr);
`
