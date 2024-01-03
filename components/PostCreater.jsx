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
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";

export default function PostCreater(props) {
    console.log("props.currentPage", props.currentPage)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [createPost, { error }] = useMutation(ADD_POST)

    async function crtPostHandler(e) {
        e.preventDefault();
        try {
            const data = await createPost({
                variables: {
                    poster: title,
                    content: content,
                    subFrm: props.currentPage
                }
            })
            setTitle("");
            setContent("");
            alert("New Post made");
            window.location.reload(true)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create Post
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    name="title"
                                    type="title"
                                    autoComplete="title"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input
                                    id="content"
                                    name="content"
                                    type="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    autoComplete="current-content"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={crtPostHandler}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <h3>Description</h3>
                    <p>Stuff about this subsection</p>
                    <h3>Rules:</h3>
                    <ul>
                        <li>rule1</li>
                    </ul>
                </div>
            </div>
        </>
    )
}