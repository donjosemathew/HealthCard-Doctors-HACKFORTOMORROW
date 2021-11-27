import React from "react";
import { AuthContext } from "../context/auth";
import { Redirect } from "react-router-dom";
const Home = () => {
  return (
    <AuthContext.Consumer>
      {({ user, SignIn, SignOut }) =>
        !user ? (
          <>
            <div className="home">
              <nav className="nav  p-10 pl-10 pr-10 bg-white flex flex-row justify-between items-center">
                <h1 className="text-5xl font-bold">
                  Health<span className="font-medium">Carrd</span>
                </h1>
                <div className=" flex flex-row items-center justify-center"></div>
              </nav>
              <header className="header relative">
                <div className="header__gradient absolute top-0 left-0 z-50 w-full h-full">
                  <div className="absolute w-full h-full   flex flex-col items-center justify-center ">
                    <h1 className="text-7xl font-bold">
                      Health<span className="font-medium">Carrd</span>
                    </h1>
                    <p className="bg-transparent mt-3 text-center font-medium w-3/6  head-txt  input-text text-4xl outline-none ml-3 text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quo du
                    </p>
                    <div className="flex mt-4 p-5 bg-white bg-opacity-20">
                      {" "}
                      <button
                        onClick={SignIn}
                        className={
                          "p-4 rounded btn font-medium pl-7 pr-7 text-3xl tracking-tight	bg-blue-50"
                        }
                      >
                        Join as Doctor
                      </button>
                    </div>
                  </div>
                </div>
              </header>
            </div>
          </>
        ) : (
          <Redirect to={"/dashboard/dashboard"} />
        )
      }
    </AuthContext.Consumer>
  );
};

export default Home;
