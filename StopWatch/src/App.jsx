import React, { useEffect, useState } from 'react'

const App = () => {
  const [time,setTime] = useState(() => {
    const savedTime = localStorage.getItem("stopwatchTime");
    return savedTime !== null ? Number(savedTime) : 0
  })
  const [running,setRunning] = useState(false)

  useEffect(()=> {
    if (!running) return; 
      
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10)
    }, 10);

    return () => clearInterval(interval)
    
  },[running])

  useEffect(() => {
    localStorage.setItem("stopwatchTime",time)
  },[time])

  const handleReset = () => {
    setRunning(false)
    setTime(0)

    localStorage.setItem("stopwatchTime", 0)
  }
  return (
    <div className='flex flex-col items-center justify-center m-10'>
      <h2 className='font-bold text-4xl'>Stopwatch</h2>
    <div className='flex items-center font-mono text-2xl font-bold tabular-nums text-gray-800'>
        <span className='inline-block min-w-6 text-right mt-8'>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
        <span className='mt-8'>:</span>
        <span className='inline-block min-w-6 text-right mt-8'>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        <span className='mt-8'>:</span>
        <span className='inline-block min-w-6 text-right mt-8'>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className='mt-8 flex gap-3'>
        {running ? (
          <button
            className='rounded-lg bg-red-500 px-5 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
            onClick={() => setRunning(false)}
          >
            Stop
          </button>
        ) : (
          <button
            className='rounded-lg bg-green-500 px-5 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2'
            onClick={() => setRunning(true)}
          >
            Start
          </button>
        )}
        <button
          className='rounded-lg bg-gray-600 px-5 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      
    </div>
  )
}

export default App