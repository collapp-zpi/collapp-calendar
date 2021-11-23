import React, { useRef, useState } from "react";
import classNames from "classnames";
import {
  IoArrowBackSharp,
  IoArrowForwardSharp,
  IoArrowUpSharp,
  IoEllipsisVerticalSharp,
  IoTodayOutline
} from "react-icons/io5";
import dayjs from "dayjs";
import { FiPlus } from "react-icons/fi";

export const SingleDayView = ({ date, setDate, events, createEvent, updateEvent, removeEvent }) => {
  const { year, month, day } = date
  const key = `${year}-${month + 1}-${day}`
  const today = new dayjs(key)
  const [modal, setModal] = useState(false)
  const formRef = useRef()

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

  const handleClose = () => {
    setModal(false)
    formRef.current.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const time = e.target.time.value
    const title = e.target.title.value
    const description = e.target.description.value

    const date = dayjs(`${key} ${time}`).utc().format()
    if (modal === true) createEvent({ date, title, description })
    else updateEvent({ id: modal, date, title, description })

    handleClose()
  }

  const todayEvents = events?.[key] ?? []

  const handleOpenEdit = ({ id, title, date, description }) => () => {
    setModal(id)

    formRef.current.time.value = dayjs(date).format('HH:mm')
    formRef.current.title.value = title
    formRef.current.description.value = description
  }

  const handleRemoveEvent = () => {
    removeEvent(modal)
    handleClose()
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
      <div className="flex-grow relative">
        <div className="absolute left-0 top-0 w-full h-full overflow-y-auto p-4">
          {!todayEvents?.length ? (
            <div className="text-gray-400 text-center mx-auto mt-4">There are no events</div>
          ) : todayEvents.map(({ id, date, title, description }) => (
            <div key={id} className="flex flex-col p-6 rounded-3xl bg-white shadow-2xl mb-4 relative group">
              <div
                className="absolute right-0 top-0 m-2 p-2 bg-red-600 bg-opacity-0 hover:bg-opacity-10 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
                onClick={handleOpenEdit({ id, date, title, description })}
              >
                <IoEllipsisVerticalSharp />
              </div>
              <div className="font-bold">{dayjs(date).format('H:mm')}</div>
              <div className="font-bold text-xl">{title}</div>
              <div className="text-xs">{description}</div>
            </div>
          ))}
        </div>
        <div
          className="h-12 w-12 bg-white rounded-2xl shadow-xl absolute bottom-4 right-4 ml-auto flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => setModal(true)}
        >
          <FiPlus className="text-3xl" />
        </div>
        <div className={classNames("absolute left-0 top-0 w-full h-full flex flex-col justify-center transition-opacity", !modal && 'opacity-0 pointer-events-none')}>
          <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm bg-gray-200 bg-opacity-50" onClick={handleClose} />
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl p-6 flex flex-col shadow-2xl bg-white relative m-8 mb-16"
            ref={formRef}
          >
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
            <div className="flex justify-end mt-4">
              {modal && modal !== true && (
                <button
                  type="button"
                  className="mt-2 mr-auto px-6 py-2 rounded-lg focus:outline-none bg-red-500 bg-opacity-0 hover:bg-opacity-10 text-red-600 transition-colors"
                  onClick={handleRemoveEvent}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="mt-2 ml-auto px-6 py-2 rounded-lg focus:outline-none font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-40 transition"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-2 ml-2 bg-blue-500 px-6 py-2 text-white rounded-lg focus:outline-none font-bold hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
