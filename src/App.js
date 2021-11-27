import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContextprovider from "./context/auth";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
function App() {
  return (
    <Router>
      <AuthContextprovider>
        <div>
          <Switch>
            <Route path="/dashboard/:uid">
              <Dashboard />
            </Route>

            <Route exact path="/topics">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </AuthContextprovider>
    </Router>
  );
}

export default App;
