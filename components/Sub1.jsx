import React from "react";
import Taskbar from "./Taskbar";
import { useQuery } from "@apollo/client";
import { SUB_INFO } from "../utils/queries";
import PostCreater from "./PostCreater";

export default function Sub0(props) {
    const currentPage = props.currentPage;

    const { loading, error, data } = useQuery(SUB_INFO);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (data) console.log("me data", data);

    const usersPosted = data.allUsers.filter((item) => item.posts.length !== 0);
    const onlySub1 = [];
    for (let i = 0; i < usersPosted.length; i++) {
        for (let j = 0; j < usersPosted[i].posts.length; j++) {
            if (usersPosted[i].posts[j].subFrm === "Sub1") {
                onlySub1.push(usersPosted[i].posts[j]);
            }
        }
    }
    console.log("onlySub1", onlySub1)

    return (
        <>
            <div>
                <div>
                    {/* <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{usersPosted[0].username}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{data.allUsers[0].username}</p>
                    </div> */}
                    <div className="mt-6 border-t border-gray-100">
                        {onlySub1.map((item) => {
                            console.log(item);
                            return (
                                <dl key={item._id} className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{item.poster}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{item.content}</dd>
                                    </div>
                                </dl>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
            <div>
                <PostCreater currentPage={currentPage} />
            </div>
        </>
    )
}