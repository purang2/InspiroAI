import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Home from "./pages/Home";
import About from "./pages/About";
import Detail from "./pages/Detail";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Box
        sx={{
          backgroundColor: darkMode ? "#121212" : "#FFFFFF",
          minHeight: "100vh",
        }}
      >
        {/* 상단바 */}
        <AppBar
          position="static"
          sx={{ backgroundColor: darkMode ? "#333333" : "#673AB7" }}
        >
          <Toolbar>
            {/* 좌측 로고 */}
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              component={Link}
              to="/"
            >
              InspiroAI
            </Typography>
            {/* 우측 메뉴 */}
            <Box>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/about"
                sx={{
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                About
              </Button>
              <Button
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* 라우팅 */}
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/detail/:id" element={<Detail darkMode={darkMode} />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
