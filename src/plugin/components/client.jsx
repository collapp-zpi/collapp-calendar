import React, { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";

// * Props:
// * useWebsockets - hook to communicate in real time with an App
// * ids - array of applicable ids for this specific plugin, psace and user
// * size - current width, height and position on the grid (top and left)
// * users - list of users connected inside the space with avatar images

function Plugin({ useWebsockets, ids, size, users }) {
  //? If your plugin does not require real time communication, do NOT invoke useWebsockets hook
  const { loading, connected, socket, state, send, errors, room, functions } =
    useWebsockets();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="w-full h-full bg-blueGray-800 text-white text-center py-12 flex justify-center justify-items-center flex-col space-y-8">
      {!loading ? (
        <div className="space-y-6">
          <h1 className="text-3xl text-emerald-400 text-center m-auto font-extrabold">
            Connected
          </h1>
          <h3 className="text-sm text-white">State: {JSON.stringify(state)}</h3>
        </div>
      ) : (
        <CgSpinner className="animate-spin text-gray-500 text-3xl m-auto" />
      )}
    </div>
  );
}

export default Plugin;
