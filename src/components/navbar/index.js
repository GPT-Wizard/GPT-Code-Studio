import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import MenuIcon from "../../assets/images/menu-icon.svg";
import XMarkIcon from "../../assets/images/x-mark-icon.svg";

function Navbar(props) {
  const { currentPage, changePage, navbarItems } = props;

  const [showSidebar, setShowSidebar] = useState(false);

  const handlePageChange = (newPage) => {
    setShowSidebar(false);
    changePage(newPage);
  };

  return (
    <>
      <Transition.Root show={showSidebar} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowSidebar}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden font-inter">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-wave-blue shadow-xl">
                      <div className="overflow-y-auto py-8 px-4 sm:px-6 pb-12">
                        <div className="flex items-center justify-between">
                          <div className="flex">
                            <img
                              src="https://images.ctfassets.net/a0typynlh1op/25MWkRF186uhl9pIB1tDPV/2969b9f28c9ad8ca39fa888dd7514994/code-studio-high-resolution-logo-color-on-transparent-background__2_.png"
                              className="h-8 border-r-mist-gray"
                              alt="Thoughtworks GPT Code Studio"
                            />
                          </div>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setShowSidebar(false)}
                            >
                              <img
                                src={XMarkIcon}
                                className="h-4"
                                alt="Close"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      {navbarItems &&
                        Object.keys(navbarItems).map((navbarItemKey) => (
                          <button
                            className={` px-6 transition-all duration-200 text-left ${
                              navbarItems[navbarItemKey] === currentPage &&
                              "navbar-selected"
                            }`}
                            onClick={() =>
                              handlePageChange(navbarItems[navbarItemKey])
                            }
                          >
                            <h2 className="py-4">
                              {navbarItems[navbarItemKey]}
                            </h2>
                          </button>
                        ))}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex justify-between py-6 pt-7 font-inter items-center">
        <div className="flex">
          <img
            src="https://images.ctfassets.net/a0typynlh1op/25MWkRF186uhl9pIB1tDPV/2969b9f28c9ad8ca39fa888dd7514994/code-studio-high-resolution-logo-color-on-transparent-background__2_.png"
            className="h-10 border-r-mist-gray"
            alt="Thoughtworks GPT Code Studio"
          />
        </div>
        <button type="button" onClick={() => setShowSidebar(true)}>
          <img src={MenuIcon} className="h-10" alt="Menu" />
        </button>
      </div>
    </>
  );
}

export default Navbar;
