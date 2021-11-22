import React from "react";
import classNames from "classnames";
import { IoArrowBackSharp, IoArrowForwardSharp, IoArrowUpSharp, IoTodayOutline } from "react-icons/io5";
import dayjs from "dayjs";

export const SingleDayView = ({ date, setDate, events, addEvent }) => {
  const { year, month, day } = date
  const key = `${year}-${month + 1}-${day}`
  const today = new dayjs(key)

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

  const handleAddEvent = (e) => {
    e.preventDefault()
    const time = e.target.time.value
    const title = e.target.title.value
    const description = e.target.description.value

    const date = dayjs(`${key} ${time}`).utc().format()
    addEvent({ date, title, description })
    e.target.reset()
  }

  const todayEvents = events?.[key] ?? []

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
      <div className="overflow-y-auto p-4 pb-8">
        <div>
          {todayEvents.map(({ date, title, description }) => (
            <div key={date} className="flex flex-col p-6 rounded-3xl bg-white shadow-2xl mb-4">
              <div className="font-bold">{dayjs(date).utc().format('H:mm')}</div>
              <div className="font-bold text-xl">{title}</div>
              <div className="text-xs">{description}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddEvent} className="rounded-3xl p-6 flex flex-col border-2 border-dashed border-blueGray-400 bg-blueGray-200">
          <div className="flex mb-2">
            <input
              type="time"
              name="time"
              required
              className="px-4 py-2 bg-blueGray-100 border border-blueGray-300 rounded-xl focus:outline-none"
            />
            <input
              type="text"
              name="title"
              required
              className="flex-grow ml-2 px-4 py-2 bg-blueGray-100 border border-blueGray-300 rounded-xl focus:outline-none"
              placeholder="Title"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description..."
            className="px-4 py-2 bg-blueGray-100 border border-blueGray-300 rounded-xl focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 ml-auto bg-blue-500 px-4 py-2 text-white rounded-lg focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </>
  )
}
