import { FaCompassDrafting } from "react-icons/fa6";
import "./App.css";
import { FaGithub, FaPlane } from 'react-icons/fa';

function App() {
  return (
    <div id="windowMain" className="flex flex-col items-center justify-center h-screen w-screen bg-base-100">
      <div className="w-4/5 min-w-[512px] max-w-[768px] font-light text-sm pl-1 text-gray-300 flex flex-row pb-1">
        <div className='flex-grow-0 flex flex-row items-center text-gray-300 hover:text-gray-500 transition-colors'><FaPlane className='' /><FaCompassDrafting className='mx-1' /><i>horizon</i></div>
        <div className='flex-grow'></div>
        <div className='flex-grow-0 flex flex-row items-center text-gray-300 hover:text-gray-500 transition-colors'><a href="https://github.com/gtg922r">github | RyanC</a><a href="https://github.com/gtg922r"><FaGithub className='ml-2' /></a></div>
      </div>
      <div id="appMain" className="bg-base-200 w-4/5 h-5/6 min-w-[512px] min-h-[512px] max-w-[768px] max-h-[1024px] rounded-xl shadow-lg relative overflow-hidden">       
        <div id="overlayMain" className="w-full h-full grid grid-cols-[1fr_12rem] grid-rows-[12rem_max-content_1fr_max-content] absolute top-0 left-0 z-[1000] gap-6 p-6 pointer-events-none">
          <div id="compassPanel" className="bg-base-100 col-start-2 shadow-md pointer-events-auto rounded-full overflow-hidden p-4">
            Panel 1
          </div>
          <div id="datePickerPanel" className="bg-base-100 col-start-2 rounded-lg shadow-md pointer-events-auto p-2">
            Panel 2
          </div>
          <div id="infoPanel" className="bg-base-100 p-4 col-span-2 col-start-1 row-start-4 shadow-md rounded-lg pointer-events-auto">
            Panel 3
          </div>
        </div>        
      </div>
    </div>
  )
}

export default App;
