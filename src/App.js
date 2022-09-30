import Header from "./components/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FeedbackList from "./components/FeedBackList";
import { useContext } from "react";

import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedBackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import Post from "./components/Post";

function App() {
  return (
    <Router>
      <Header />

      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            }
          ></Route>
          <Route path="/about" element={<AboutPage />} />

          <Route path="/post/*" element={<Post />} />
        </Routes>

        <AboutIconLink />
      </div>
    </Router>
  );
}

export default App;
