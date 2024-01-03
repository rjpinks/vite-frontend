// Will need to add the interactivity to make the bar do the cool things I want (They gave me everything I need);

import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import User from './User';
import Sub0 from './Sub0';
import Sub1 from "./Sub1";
import Sub2 from "./Sub2";


const navigation = [
  // [i].current = true -> box is endarkened
  { name: "Sub0", href: "#", current: false },
  { name: "Sub1", href: "#", current: false },
  { name: "Sub2", href: "#", current: false },
  { name: "Your Profile", href: "#", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Taskbar() {

  const [dashboard, setDashboard] = useState("Your Profile");

  function styleHandler(e) {
    e.preventDefault();
    setDashboard(e.target.text);
  }

  function renderHandler() {
    if (dashboard === "Your Profile") { return <User />};
    if (dashboard === "Sub0") { return <Sub0 currentPage={dashboard} />};
    if (dashboard === "Sub1") { return <Sub1 currentPage={dashboard} /> };
    if (dashboard === "Sub2") { return <Sub2 currentPage={dashboard} /> };
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {/* Image here for corner logo */}
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={styleHandler}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{dashboard}</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
      <div>
        {renderHandler()}
      </div>
    </>
  )
}