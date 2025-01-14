import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
  Modal,
} from "@mui/material";

import Button from "@mui/material/Button"; // Button 컴포넌트를 별도로 가져옵니다.
import HomeIcon from "@mui/icons-material/Home";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PlaceIcon from "@mui/icons-material/Place";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Layout({ children, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleMenuClick = (item) => {
    if (item.comingSoon) {
      setModalContent(
        `${item.text} 기능은 현재 준비 중입니다. 곧 찾아뵙겠습니다!`
      );
      setModalOpen(true);
    } else {
      navigate(item.path);
    }
  };

  const menuItems = [
    { text: "홈", icon: <HomeIcon />, path: "/" },
    { text: "한줄생원", icon: <ModeEditOutlineIcon />, path: "/ai-chatbot" },
    { text: "AI 카피라이터", icon: <TextFieldsIcon />, path: "/ai-copywriter" },
    {
      text: "로컬 스토리메이커",
      icon: <PlaceIcon />,
      path: "/local-storymaker",
    },
    { text: "문장 리듬 분석기", icon: <AutoGraphIcon />, comingSoon: true },
    { text: "영감의 한 줄 찾기", icon: <LightbulbIcon />, comingSoon: true },
    { text: "시각화된 문장 생성기", icon: <ImageIcon />, comingSoon: true },
    {
      text: "지역 기반 글쓰기 챌린지",
      icon: <LocationOnIcon />,
      comingSoon: true,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#FFFFFF",
        fontFamily: "Pretendard, sans-serif",
        color: darkMode ? "#FFFFFF" : "#000000",
      }}
    >
      {/* 좌측 사이드바 */}
      <Box
        sx={{
          width: "250px",
          backgroundColor: darkMode ? "#1F1F1F" : "#673AB7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            Insp | 매일 한 줄로 시작하는 영감
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleMenuClick(item)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor:
                    location.pathname === item.path
                      ? darkMode
                        ? "#BB86FC"
                        : "#5E35B1"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: darkMode ? "#333333" : "#5E35B1",
                  },
                }}
              >
                <IconButton
                  sx={{
                    color:
                      location.pathname === item.path ? "#FFFFFF" : "#CCCCCC",
                  }}
                >
                  {item.icon}
                </IconButton>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color:
                      location.pathname === item.path ? "#FFFFFF" : "#CCCCCC",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              marginRight: "10px",
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            다크 모드
          </Typography>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            sx={{
              "& .MuiSwitch-thumb": {
                color: darkMode ? "#BB86FC" : "#673AB7",
              },
            }}
          />
        </Box>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* 콘텐츠 박스 */}
        <Box
          sx={{
            width: "80%",
            maxWidth: "800px",
            height: "90vh",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          {children}
        </Box>
      </Box>

      {/* 모달 팝업 */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: darkMode ? "#333333" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
            padding: "24px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            {modalContent}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setModalOpen(false)}
            sx={{
              backgroundColor: darkMode ? "#BB86FC" : "#673AB7",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: darkMode ? "#AA75FB" : "#5E35B1",
              },
            }}
          >
            확인
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Layout;
