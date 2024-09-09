import React from "react";
import "./css/styles.css";


import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./pages/parts/navbar.js";
import Home from "./pages/home.js";
import Jokes from "./pages/jokes.js";
import SignIn from "./pages/signin.js";
import SignUp from "./pages/signup.js";
import SignOut from "./pages/signout.js";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
  }, []);

  return (
      <Router>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/jokes/:category" element={<Jokes />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/signout" element={<SignOut />} />
             
          </Routes>
      </Router>
  );
}

export default App;