import React, { useState } from 'react';


function App() {

  const [url, setUrl] = useState('');

  const handleSearch = (e) => {
    window.ipcRenderer.send('open-url-fullscreen', url);

  };



  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

      <div className="flex flex-col justify-center items-center">
        <h1 className='text-white text-5xl font-Orbitron font-medium mt-6 mb-7'>No Cheat Browser</h1>

        <div className="w-2/6 h-full text-wrap  justify-self-center mt-6">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4  px-6 ps-10 text-sm text-white border border-purple-800 rounded-full bg-[#0C162D] focus:border-purple-800 focus:ring-purple-900 text-wrap pe-[7rem]" onChange={(e) => setUrl(e.target.value)} placeholder="Enter exam link..." required />
            <button className="text-white absolute end-2.5 bottom-2.5 bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 " onClick={handleSearch}>Start Exam</button>
          </div>
        </div>
      </div>

    </div>

  );
}

export default App;
