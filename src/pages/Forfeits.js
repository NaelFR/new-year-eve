import { useEffect, useState } from 'react';
import { db } from '../firebase.js';
import Card from '../components/Card';

export default function Forfeits() {
  const [forfeits, setForfeit] = useState([]);
  const [selectedForfeit, setSelectedForfeit] = useState(null);

  function getForfeits() {
    let forfeitsFirestore = [];
    db.collection('forfeits')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          forfeitsFirestore.push(doc.data());
        });
        setForfeit(forfeitsFirestore);
      });
  }

  function getRandomForfeit() {
    const maxRange = forfeits.length - 1;
    const minRange = 0;
    const random = Math.floor(
      Math.random() * (maxRange - minRange + 1) + minRange,
    );
    setSelectedForfeit(forfeits[random]);
  }

  function forfeitTemplate() {
    const { label, description, creator } = selectedForfeit;
    return (
      <div className="bg-white - w-72 shadow-lg mx-auto rounded-xl p-4">
        <p className="text-black text-sm mb-4">{label}</p>
        <p className="text-gray-600">
          <span className="font-bold text-indigo-500 text-lg">“</span>
          {description}
          <span className="font-bold text-indigo-500 text-lg">”</span>
        </p>
        <div className="flex items-center mt-4">
          <div className="flex flex-col ml-2 justify-between">
            <span className="font-semibold text-indigo-500 text-sm">
              {creator}
            </span>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    getForfeits();
  }, []);

  return (
    <Card className="bg-gray-800 text-white">
      {selectedForfeit && forfeitTemplate()}
      <div className="flex justify-center mt-4">
        <button
          onClick={getRandomForfeit}
          className="flex items-center px-6 py-2 transition ease-in duration-200 uppercase rounded-full bg-white text-black hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
          La mort ou Tchi Tchi ?
        </button>
      </div>
    </Card>
  );
}
