import { useState, useRef } from 'react';
import './App.css';


function padTime(e) {
  return e.toString().padStart(2, '0');
}

function App() {

  const [title, setTitle] = useState('Pomodoro');
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handelIncrease = (e) => {
    if (e.detail == 2) {
      setTimeLeft(
        timeLeft => (timeLeft + 600 - 60)
      )
    }
    else {

      setTimeLeft(
        timeLeft => (timeLeft + 60)
      )
    }

  }
  const handelDecrease = (e) => {
    if (timeLeft === 0) return;

    if (e.detail == 2) {
      setTimeLeft(
        timeLeft => (timeLeft - 600 + 60)
      )
    }
    else {
      setTimeLeft(
        timeLeft => (timeLeft - 60)
      )
    }

  }

  const handelStart = () => {
    if (intervalRef.current !== null) return;

    setTitle('Let the begin!!!');

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        handelReset();
        return 0;
      });
    }, 1000);
  }

  const handelStop = () => {
    if (timeLeft === 0) return;
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('pAused...');
    setIsRunning(false);
  }

  const handelReset = () => {

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('reAdy for Another round?');
    setTimeLeft(30 * 60);
    setIsRunning(false)
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <>
      <div className="app">

        <h1 className="text-xl mt-12 sm:mt-16 p-2 text-center font-semibold text-[#297d83] sm:text-4xl">{title}</h1>

        <div
          className="sm:flex align-middle grid place-content-center sm:text-[10rem] text-[7rem] font-bold sm:font-normal text-[#1b575b] mt-16 mb-16">

          <button
            className=" rounded-full w-10 tooltip tooltip-success hover:bg-green-400 ml-14 sm:mr-10 text-green-300 font-semibold text-3xl sm:4xl"
            onClick={handelIncrease} data-tip='Double click(+30min)'>↑</button>

          <span>{minutes}</span>
          <span className='max-sm:hidden'>:</span>
          <span>{seconds}</span>

          <button
            className="rounded-full  w-10 text-2xl hover:bg-red-400 text-red-300 ml-14 sm:ml-10 font-semibold  tooltip max-sm:tooltip-bottom tooltip-error sm:4xl" data-tip='Double click(-30min)'
            onClick={handelDecrease}>↓</button>
        </div>



        <div className="text-[24px] flex space-x-6 place-content-center mt-16 sm:mt-20 text-[#1b575b] ">
          {!isRunning && <button
            className='bg-[#f7fca0] p-2 rounded-md font-mono hover:bg-[#f4fa84] ' onClick={handelStart}>Start</button>}
          {isRunning && <button
            className='bg-[#f7fca0] p-2 rounded-md font-mono hover:bg-[#f4fa84] ' onClick={handelStop}>Stop</button>}
          <button
            className='bg-[#f7fca0] p-2 rounded-md font-mono hover:bg-[#f4fa84] ' onClick={handelReset}>Reset</button>
        </div>


      </div>
    </>
  )
}

export default App
