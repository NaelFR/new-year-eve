import { useEffect, useState } from 'react';
import { db } from '../firebase.js';

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
    console.log('forfeits', forfeits);
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
      <div>
        <h3>{label}</h3>
        <p>{description}</p>
      </div>
    );
  }

  useEffect(() => {
    getForfeits();
  }, []);

  return (
    <div>
      {selectedForfeit && forfeitTemplate()}
      <button onClick={getRandomForfeit}>Gage sa mère</button>
    </div>
  );
}
