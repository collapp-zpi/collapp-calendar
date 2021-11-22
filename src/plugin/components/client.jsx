import React, { useMemo, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { CalendarView } from "./CalendarView";
import { SingleDayView } from "./SingleDayView";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";
dayjs.extend(weekOfYear)
dayjs.extend(utc)

function Plugin({ useWebsockets }) {
  const { loading, state, send } = useWebsockets();
  const [date, setDate] = useState(() => {
    const date = new Date()
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    }
  })

  const events = useMemo(() => {
    const events = {}
    for (const event of state?.events ?? []) {
      const key = dayjs(event.date).utc().format('YYYY-MM-DD')

      if (!events?.[key]) events[key] = []
      events[key].push(event)
    }

    for (const key in events)
      events[key].sort((a, b) => new Date(a.date) - new Date(b.date))

    return events
  }, [state?.events])

  if (loading)
    return (
      <div className="w-full h-full bg-gray-100 flex text-gray-500 p-8 select-none">
        <CgSpinner className="animate-spin text-3xl m-auto" />
      </div>
    )

  const addEvent = (event) => send('add', event)

  return (
    <div className="w-full h-full bg-blueGray-200 text-gray-500 flex flex-col">
      {date.day == null
        ? <CalendarView {...{ date, setDate, events }} />
        : <SingleDayView {...{ date, setDate, events, addEvent }} />}
    </div>
  );
}

export default Plugin;
