import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { CalendarView } from "./CalendarView";
import { SingleDayView } from "./SingleDayView";
dayjs.extend(weekOfYear)

function Plugin({ useWebsockets }) {
  const { loading, state, send } = useWebsockets();
  const [date, setDate] = useState(() => {
    const date = new Date()
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    }
  })

  if (loading)
    return (
      <div className="w-full h-full bg-gray-100 flex text-gray-500 p-8 select-none">
        <CgSpinner className="animate-spin text-3xl m-auto" />
      </div>
    )

  return (
    <div className="w-full h-full bg-blueGray-200 text-gray-500 flex flex-col">
      {date.day == null ? (
        <CalendarView {...{ date, setDate }} />
      ) : (
        <SingleDayView {...{ date, setDate }} />
      )}
    </div>
  );
}

export default Plugin;
