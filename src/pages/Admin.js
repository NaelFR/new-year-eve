import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { auth, googleProvider, db } from '../firebase';
import Card from '../components/Card';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function Admin() {
  const [user, setUser] = useState({});
  const [forfeits, setForfeits] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
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

  const addForfeit = async (title, description) => {
    try {
      await db.collection('forfeits').add({
        label: title,
        description: description,
        creator: user.name,
      });
      getForfeits();
    } catch (e) {
      console.error(e);
    }
  };

  const getForfeits = () => {
    let forfeitsFirestore = [];
    db.collection('forfeits')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          forfeitsFirestore.push({ ...doc.data(), docId: doc.id });
        });
        setForfeits(forfeitsFirestore);
      });
  };

  const removeForfeit = async (id) => {
    try {
      await db.collection('forfeits').doc(id).delete();
      setForfeits(forfeits.filter((f) => f.docId !== id));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      getForfeits();
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (auth.currentUser) {
      const { displayName: name, email, photoURL } = auth.currentUser;
      setUser({ name, email, photoURL });
    }
  }, []);

  return (
    <>
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
            <Formik
              initialValues={{ title: '', description: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.description) {
                  errors.description = 'Required';
                }
                return errors;
              }}
              onSubmit={(
                { title, description },
                { setSubmitting, resetForm },
              ) => {
                addForfeit(title, description).then(() => {
                  setSubmitting(false);
                  resetForm();
                });
              }}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <div className=" relative mb-2 ">
                    <label htmlFor="title">Titre (facultatif)</label>
                    <Field
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="title"
                    />
                  </div>
                  <div className="relative mb-2">
                    <label htmlFor="description">
                      Énoncé
                      <span className="required-dot text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      className={`${
                        errors.description && 'ring-red-500 ring-2'
                      } rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                      name="description"
                      placeholder="Quel est ton gage ?"
                    />
                    {errors.description && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="currentColor"
                        className="absolute right-2 text-red-500 bottom-3"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"></path>
                      </svg>
                    )}
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="-bottom-6 text-red-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="disabled:opacity-50 py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    {isSubmitting && (
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
                </Form>
              )}
            </Formik>
          </div>
        )}
      </Card>
      {user && (
        <Card className="bg-gray-800 text-white">
          <div className="flex flex-col w-full items-center justify-center bg-white rounded-lg shadow text-black">
            <ul className="flex flex-col divide divide-y w-full">
              {forfeits.map(({ creator, label, description, docId }) => (
                <li className="flex flex-row" key={docId}>
                  <div className="select-none flex justify-between items-center p-4 w-full">
                    <div className="flex justify-center items-center mr-4 text-sm">
                      <span>{creator}</span>
                    </div>
                    <div className="pl-1 mr-16">
                      <div className="font-medium">{label}</div>
                      <div className="text-gray-600 text-sm">{description}</div>
                    </div>
                    <div className="text-gray-600 text-xs">
                      <button
                        onClick={() => removeForfeit(docId)}
                        className="flex items-center p-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </>
  );
}
