import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import { PreviewPage } from "./Pages/Preview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/preview/:id" element={<PreviewPage />} />

      </Routes>
    </Router>
  );
}

export default App


// npx purgecss --css home.css --content a.html --output ./cleaned
