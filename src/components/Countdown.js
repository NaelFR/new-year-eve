import { useState, useEffect } from 'react';

export default function Countdown() {
  const [countdownDate, setCountdownDate] = useState(
    new Date('01/01/2021').getTime(),
  );
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => updateCountdown(), 1000);
  }, []);

  const updateCountdown = () => {
    if (countdownDate) {
      // Get the current time
      const currentTime = new Date().getTime();

      // Get the time remaining until the countdown date
      const distanceToDate = countdownDate - currentTime;

      // Calculate days, hours, minutes and seconds remaining
      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      // For visual appeal, add a zero to each number that's only one digit
      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      // Set the state to each new time
      setState({ days: days, hours: hours, minutes, seconds });
    }
  };

  return (
    <div className="flex flex-col md:flex-row text-white flex-wrap w-1/2 justify-center">
      <div className="flex flex-col items-center md:mr-10">
        <span className="text-5xl">{state.days || 'OO'}</span>
        <span className="uppercase text-gray-400 text-sm">Jours</span>
      </div>
      <div className="flex flex-col items-center md:mr-10">
        <span className="text-5xl">{state.hours || 'OO'}</span>
        <span className="uppercase text-gray-400 text-sm">Heures</span>
      </div>
      <div className="flex flex-col items-center md:mr-10">
        <span className="text-5xl">{state.minutes || 'OO'}</span>
        <span className="uppercase text-gray-400 text-sm">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-5xl">{state.seconds || 'OO'}</span>
        <span className="uppercase text-gray-400 text-sm">Secondes</span>
      </div>
    </div>
  );
}
