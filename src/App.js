import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AICopywriterPage from "./pages/AICopywriter";
import LocalStoryMakerPage from "./pages/LocalStoryMaker";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";
function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <ChatProvider>
        <Router>
          <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-chatbot" element={<ChatPage />} />
              <Route path="/ai-copywriter" element={<AICopywriterPage />} />
              <Route
                path="/local-storymaker"
                element={<LocalStoryMakerPage />}
              />
              <Route path="/rhythm-analyzer" element={<ChatPage />} />
              <Route path="/inspiration" element={<ChatPage />} />
              <Route path="/visualize" element={<ChatPage />} />
              <Route path="/local-challenge" element={<ChatPage />} />
            </Routes>
          </Layout>
        </Router>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
