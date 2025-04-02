import React from "react";
import { Volume2, LoaderCircle } from "lucide-react";
import {
  getSoundboards,
  playSoundboard,
} from "./utilities/soundboardRequest.js";
import useSWR from "swr";

function App() {
  const { data, error } = useSWR(
    `${import.meta.env.VITE_API_VOICEMOD}/voicemod/`,
    getSoundboards
  );

  const handleClick = async (id) => {
    console.log(`Button clicked: ${id}`);
    await playSoundboard(id);
  };

  if (error)
    return (
      <>
        <div className="min-h-screen min-w-screen bg-gray-900 p-8">
          <div className=" w-full h-full flex justify-center bg-center text-white">
            <div>failed to load</div>
          </div>
        </div>
      </>
    );
  if (!data) {
    console.log(data);
    return (
      <div className="h-screen overflow-hidden flex items-center justify-center">
        <LoaderCircle className="w-14 h-14 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Soundboards</h1>
        <p className="text-gray-400">Click on any sound to play it</p>
      </header>

      <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10 gap-4">
        {data.sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => handleClick(sound.id)}
            className="relative group bg-gray-800 rounded-xl p-2 transition-all duration-300 hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-2">
              <img
                src={sound.imageURL}
                alt={sound.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white text-xs md:text-sm lg:text-md font-small truncate">
                {sound.name}
              </span>
              <Volume2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-blue-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
