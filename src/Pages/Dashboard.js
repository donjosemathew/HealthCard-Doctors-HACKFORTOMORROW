import React from "react";
import DashboardSection from "../Components/Dashboard/dashboardSections";
import Nav from "../Components/Nav/nav";
import "../styles/style.scss";
import { AuthContext } from "../context/auth";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  let location = useLocation();

  return (
    <AuthContext.Consumer>
      {({ user, load, SignIn, SignOut }) =>
        !load ? (
          user ? (
            <div className="home relative">
              <Nav image={user.photo} SignOut={SignOut} />
              <DashboardSection image={user.photo} name={user.name} />
            </div>
          ) : (
            <Redirect to={location} />
          )
        ) : (
          ""
        )
      }
    </AuthContext.Consumer>
  );
};

export default Dashboard;
