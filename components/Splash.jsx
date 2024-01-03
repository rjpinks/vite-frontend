/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
// Importing Hooks
import { useState } from "react";
import { useMutation } from "@apollo/client";
// Importing authorization stuff
import Auth from "../utils/auth";
// Importing Queries/Mutations
import { SIGNIN } from "../utils/mutations";
import { ADD_USER } from "../utils/mutations";


export default function Splash() {

  // Things associated with signing in
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPw, setSigninPw] = useState("");

  const [login, { error, data }] = useMutation(SIGNIN);

  async function signinHandler(e) {
    e.preventDefault();
    console.log("signinEmail", signinEmail);
    console.log("signinPw", signinPw);

    try {
      const { data } = await login({
        variables: {
          email: signinEmail,
          password: signinPw
        }
      })
      console.log("data", data);
      Auth.login(data.login.token);
      console.log("SUCCESSFUL LOGIN!!");
    } catch (err) {
      console.error(err);
    }
  }

  // Things associated with creating a new account
  const [createUsername, setCreateUsername] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPw, setCreatePw] = useState("");
  const [createRecon, setCreateRecon] = useState("");

  let passCheck = true;
  createPw === createRecon ? passCheck = true : passCheck = false;
  const [addUser, { bad }] = useMutation(ADD_USER);
  bad ? console.log("bad", bad) : console.log("good");

  async function creationHandler(e) {
    e.preventDefault();

    if (createPw === createRecon) {
      try {
        const { data } = await addUser({
          variables: {
            username: createUsername,
            email: createEmail,
            password: createPw
          }
        })
        console.log("data", data)
        console.log("successfully created user");
      } catch (err) {
        console.error(err)
      }
    }
    
    setSigninEmail(createEmail);
    setSigninPw(createPw);
    setCreateEmail("");
    setCreatePw("");
    setCreateUsername("");
    setCreateRecon("");
    alert("click sign in!");
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="signin-email"
                  name="signin-email"
                  value={signinEmail}
                  onChange={(event) => setSigninEmail(event.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="signin-password"
                  value={signinPw}
                  onChange={(event) => setSigninPw(event.target.value)}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={signinHandler}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* This is the code for the create new account */}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="create-email"
                  name="create-email"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="create-username"
                  name="create-username"
                  type="username"
                  value={createUsername}
                  onChange={(e) => setCreateUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="create-password"
                  name="create-password"
                  type="password"
                  value={createPw}
                  onChange={(e) => setCreatePw(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="create-reconfirm" className="block text-sm font-medium leading-6 text-gray-900">
                Reconfirm
              </label>
              <div className="mt-2">
                <input
                  id="create-reconfirm"
                  name="create-reconfirm"
                  type="password"
                  value={createRecon}
                  onChange={(e) => setCreateRecon(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={creationHandler}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}