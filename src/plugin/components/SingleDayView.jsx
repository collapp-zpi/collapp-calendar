import React from "react";
import classNames from "classnames";
import { IoArrowBackSharp, IoArrowForwardSharp, IoArrowUpSharp, IoTodayOutline } from "react-icons/io5";
import dayjs from "dayjs";

export const SingleDayView = ({ date, setDate }) => {
  const { year, month, day } = date
  const today = new dayjs(`${year}-${month + 1}-${day}`)

  const handlePrevDay = () => {
    const date = today.subtract(1, 'day')
    setDate({
      year: date.year(),
      month: date.month(),
      day: date.date(),
    })
  }

  const handleNextDay = () => {
    const date = today.add(1, 'day')
    setDate({
      year: date.year(),
      month: date.month(),
      day: date.date(),
    })
  }

  const handleCurrentDay = () => {
    const date = new dayjs()
    setDate({
      year: date.year(),
      month: date.month(),
      day: date.date(),
    })
  }

  const handleBack = () => {
    setDate({
      year,
      month,
    })
  }

  return (
    <>
      <div className="flex p-3 justify-between items-center">
        <div className="ml-3 flex items-center">
          <button
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-xl mr-2"
            onClick={handleBack}
          >
            <IoArrowUpSharp />
          </button>
          <div className="font-bold flex flex-col">
            <div className="text-sm leading-3">{today.format('dddd')}</div>
            <div className="text-lg">{today.format('D MMMM YYYY')}</div>
          </div>
        </div>
        <div className="ml-2 space-x-1 flex text-xl">
          <button
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            onClick={handlePrevDay}
          >
            <IoArrowBackSharp />
          </button>
          <button
            className={classNames(
              "w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-all",
              dayjs().isSame(today, 'day') && "opacity-50 pointer-events-none",
            )}
            onClick={handleCurrentDay}
          >
            <IoTodayOutline />
          </button>
          <button
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            onClick={handleNextDay}
          >
            <IoArrowForwardSharp strokeWidth={2}/>
          </button>
        </div>
      </div>
    </>
  )
}
