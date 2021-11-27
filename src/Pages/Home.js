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
              <h1>Don Jose{user ? user.name : ""}</h1>
              <div className="mt-2 bg-gray-600">
                <p className="text-5xl">Gaojl</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                ducimus, eos facilis voluptatibus non corporis quasi ex sint
                modi sapiente fuga aut hic, consequuntur esse fugiat!
                Perspiciatis non officiis doloribus!
              </p>
              <button onClick={SignIn} className="p-3 m-2 bg-gray-600 text-4xl">
                Login
              </button>
              <button
                onClick={SignOut}
                className="p-3 m-2 bg-gray-600 text-4xl"
              >
                SignOut
              </button>
            </div>
          </>
        ) : (
          <Redirect to={"/dashboard/not"} />
        )
      }
    </AuthContext.Consumer>
  );
};

export default Home;
