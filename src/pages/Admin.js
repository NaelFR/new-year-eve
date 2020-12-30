import { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import Card from '../components/Card';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function Admin() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const login = async () => {
    setIsLoginLoading(true);
    try {
      const { user } = await auth.signInWithPopup(googleProvider);
      const { displayName: name, email, photoURL } = user;
      setIsLoginLoading(false);
      setUser({ name, email, photoURL });
    } catch (e) {
      console.error(e);
      setIsLoginLoading(false);
    }
  };

  const addForfeit = async () => {
    setIsLoading(true);
    try {
      await db.collection('forfeits').add({
        label: 'Test',
        description: 'Ceci est un gage de test et non un gage de qualité',
        creator: user.name,
      });
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      const { displayName: name, email, photoURL } = auth.currentUser;
      setUser({ name, email, photoURL });
      console.log(name);
    }
  }, []);
  return (
    <Card className="bg-gray-800 text-white">
      {!user && (
        <div>
          <p>
            Afin de pouvoir ajouter des gages, merci de t'identifier via ton
            compte Google
          </p>
          <GoogleSignInButton onClick={login} />
        </div>
      )}
      {user && (
        <div>
          <p className="mb-4">
            Salut {user.name}, tu peux ajouter un gage (dans la limite du
            raisonnable)
          </p>
          <form action="">
            <div className=" relative mb-2 ">
              <label htmlFor="title">Titre (facultatif)</label>
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="description"
              />
            </div>
            <div className=" relative mb-2">
              <label htmlFor="description">
                Énoncé
                <span className="required-dot text-red-500">*</span>
              </label>
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="description"
                placeholder="Quel est ton gage ?"
              />
            </div>
            <button
              type="button"
              disabled={isLoading}
              className="disabled:opacity-50 py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={addForfeit}
            >
              {isLoading && (
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              )}
              Valider
            </button>
          </form>
        </div>
      )}
    </Card>
  );
}
