import React, { useMemo } from "react";
import { Calendar } from "calendar";
import classNames from "classnames";
import { IoArrowBackSharp, IoArrowForwardSharp, IoTodayOutline } from "react-icons/io5";
import dayjs from "dayjs";
import styled from "styled-components";
import { WEEKDAYS } from "./consts";

const CalendarContainer = styled.div`
  grid-template-columns: 1.5em repeat(7, 1fr);
`

export const CalendarView = ({ date, setDate, events }) => {
  const { year, month } = date
  const key = `${year}-${month + 1}`
  const today = new dayjs(key)

  const calendar = useMemo(() => {
    return new Calendar(1).monthDates(year, month)
  }, [month, year])

  const handlePrevMonth = () => {
    const date = today.subtract(1, 'month')
    setDate({
      year: date.year(),
      month: date.month(),
    })
  }

  const handleNextMonth = () => {
    const date = today.add(1, 'month')
    setDate({
      year: date.year(),
      month: date.month(),
    })
  }

  const handleCurrentMonth = () => {
    const date = new dayjs()
    setDate({
      year: date.year(),
      month: date.month(),
    })
  }

  const handleSelectDate = (d) => () => {
    const date = new dayjs(d)
    setDate({
      year: date.year(),
      month: date.month(),
      day: date.date(),
    })
  }

  return (
    <>
      <div className="flex p-3 justify-between items-center">
        <div className="font-bold text-lg ml-3">
          {today.format('MMMM YYYY')}
        </div>
        <div className="ml-2 space-x-1 flex text-2xl">
          <button
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            onClick={handlePrevMonth}
          >
            <IoArrowBackSharp strokeWidth={2}/>
          </button>
          <button
            className={classNames(
              "w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-all",
              dayjs().isSame(today, 'month') && "opacity-50 pointer-events-none",
            )}
            onClick={handleCurrentMonth}
          >
            <IoTodayOutline strokeWidth={2} className="text-xl"/>
          </button>
          <button
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            onClick={handleNextMonth}
          >
            <IoArrowForwardSharp strokeWidth={2}/>
          </button>
        </div>
      </div>

      <CalendarContainer
        className="grid flex-grow"
        style={{gridTemplateRows: `auto repeat(${calendar.length}, 1fr)`}}
      >
        <div/>
        {WEEKDAYS.map((day) => (
          <div className="text-gray-400 font-bold text-xs place-self-center p-1" key={day}>
            {day}
          </div>
        ))}

        <div
          className="bg-white row-start-2 col-start-2 col-span-full row-span-full rounded-tl-3xl shadow-2xl grid grid-cols-7"
          style={{gridTemplateRows: `repeat(${calendar.length}, 1fr)`}}
        >
          {calendar.map(
            (week, weekI) => week.map((day, dayI) => {
              const isToday = dayjs(day).isSame(dayjs(), 'day')

              return (
                <div
                  className={classNames(
                    "text-xs p-1 border-gray-100 flex flex-col cursor-pointer hover:bg-blueGray-100 transition-colors",
                    weekI && 'border-t', dayI && 'border-l',
                  )}
                  key={day.getTime()}
                  onClick={handleSelectDate(day)}
                >
                  <div
                    className={classNames(
                      "text-right px-1 py-0.5 ml-auto",
                      isToday && 'font-bold text-white bg-blueGray-500 rounded-md',
                    )}
                  >
                    {day.getDate()}
                  </div>
                  <div className="flex-grow relative">
                    <div className="overflow-hidden absolute w-full h-full left-0 top-0 flex flex-col">
                      {(events?.[`${key}-${day.getDate()}`] ?? []).map(({ date, title }) => (
                        <div key={date} className="text-xs flex">
                          <div className="font-bold mr-1">{dayjs(date).utc().format('H:mm')}</div>
                          <div className="flex-grow truncate">{title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
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
    </>
  )
}
