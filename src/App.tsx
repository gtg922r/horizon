import { FaCompassDrafting } from "react-icons/fa6";
import "./App.css";
import { FaGithub, FaPlane } from "react-icons/fa";
import MapComponent from "./components/MapComponent";
import { useEffect, useState } from "react";

function App() {
  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>({ lat: 37.3688, lng: -122.0363 });
  const [rangeValue, setRangeValue] = useState(1); // Initialize range value to 1 hour
  const [cityName, setCityName] = useState<string>('Loading...');

  const handleGlobeClick = (coords: { lat: number; lng: number }, event: MouseEvent) => {
    setClickedCoords(coords);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(event.target.value)); // Update range value state
  };

  useEffect(() => {
    const fetchCityName = async () => {
      setCityName('Loading...');
      if (clickedCoords) {
        const name = await getCityName(clickedCoords);
        setCityName(name);
      } else {
        setCityName("Error...");
      }
    };
    fetchCityName();
  }, [clickedCoords]);

  const getCityName = async (coords: { lat: number; lng: number }): Promise<string> => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`);
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || 'Unknown location';
  };

  return (
    <div
      id="windowMain"
      className="flex flex-col items-center justify-center h-screen w-screen bg-base-100">
      <div
        id="header"
        className="w-4/5 min-w-[512px] max-w-[768px] font-light text-sm pl-1 text-gray-300 flex flex-row pb-1">
        <div className="flex-grow-0 flex flex-row items-center text-gray-300 hover:text-gray-500 transition-colors">
          <FaPlane className="" />
          <FaCompassDrafting className="mx-1" />
          <i>horizon</i>
        </div>
        <div className="flex-grow"></div>
        <div className="flex-grow-0 flex flex-row items-center text-gray-300 hover:text-gray-500 transition-colors">
          <a href="https://github.com/gtg922r">github | RyanC</a>
          <a href="https://github.com/gtg922r">
            <FaGithub className="ml-2" />
          </a>
        </div>
      </div>
      <div
        id="appMain"
        className="bg-base-200 w-4/5 h-5/6 min-w-[512px] min-h-[512px] max-w-[768px] max-h-[1024px] rounded-xl shadow-lg relative overflow-hidden">
        <div
          id="overlayMain"
          className="w-full h-full grid grid-cols-[1fr_12rem] grid-rows-[max-content_max-content_1fr_max-content] absolute top-0 left-0 z-[1000] gap-6 p-6 pointer-events-none">
          <div
            id="rangePanel"
            className="bg-base-100 col-start-2 shadow-md pointer-events-auto p-4 rounded flex flex-col gap-2">
            <div className="flex flex-col gap-0">
            <div className="text-2xl text-center flex flex-row justify-center gap-2 pr-8 select-none">
                <div className="font-semibold flex-1 text-right">{rangeValue}</div>
                <div className="font-light text-neutral-500 flex-1 text-left"> {rangeValue > 1 ? "hours" : "hour"}</div>
            </div>
            <div className="text-xs text-center flex flex-row justify-center gap-1 pr-10 select-none">
                <div className="font-semibold flex-1 text-right text-neutral-500">{(rangeValue*500).toLocaleString()}</div>
                <div className="font-light text-neutral-500 flex-grow-0 text-left"> miles</div>
            </div>
            </div>
            <div className="">
              <input
                type="range"
                min={1}
                max={9}
                value={rangeValue}
                onChange={handleRangeChange} // Add onChange handler
                className="range pointer-events-auto"
                step="1"
              />
              <div className="flex w-full justify-between px-2 text-xs select-none">
                <span>1hr</span>
                <span>3hr</span>
                <span>5hr</span>
                <span>7hr</span>
                <span>9hr</span>
              </div>
            </div>            
          </div>
          <div
            id="infoPanel"
            className="bg-base-100 p-2 col-span-2 col-start-1 row-start-4 shadow-md rounded-lg pointer-events-auto flex flex-row gap-4">
            <div id="Info 1" className="flex flex-col flex-1">
              <label className="input flex items-center gap-2">
                <input
                  type="text"
                  className="grow text-2xl font-medium text-center"
                  placeholder="Search"
                  value={cityName} // Display city name here
                  readOnly // Make the input read-only
                />
              </label>
            </div>
          </div>
        </div>
        <MapComponent onGlobeClick={handleGlobeClick} markerCoords={clickedCoords} rangeInMiles={rangeValue * 500}/>
      </div>
    </div>
  );
}

export default App;
