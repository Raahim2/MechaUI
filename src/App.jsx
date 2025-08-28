import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat";
import Dashboard from "./Pages/Dash";
import PreviewPage from "./Pages/PreviewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/preview/:id" element={<PreviewPage />} />

      </Routes>
    </Router>
  );
}

export default App


// npx purgecss --css home.css --content a.html --output ./cleaned
