import React from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const ideas = [
  {
    id: 1,
    title: "AI 카피라이터 (AI Copywriter)",
    description: "수 초 만에 광고 문구를 제작해주는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
  },
  {
    id: 2,
    title: "로컬 스토리메이커",
    description: "지역의 매력을 한 문장에 담아내는 인공지능 스토리메이커",
    image: "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed",
  },
  {
    id: 3,
    title: "커플 및 결혼 여행 정보",
    description:
      "커플 및 결혼한 사람들에게 소중한 순간을 기억에 남게 하는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1699341381878-4712514e8966",
  },
  {
    id: 4,
    title: "미식 여행 정보",
    description: "지역의 맛과 이야기를 담아내는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1631024723408-1d1c95735cef",
  },
  {
    id: 5,
    title: "사진 여행지 정보",
    description: "인기 촬영 명소를 추천해주는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1706431593003-77f796098bc3",
  },
  {
    id: 6,
    title: "힐링 여행 정보",
    description: "몸과 마음을 치유하는 웰니스 관광지와 스파를 위한 카피라이터",
    image: "https://images.unsplash.com/photo-1733822842270-9fcb181c5f13",
  },
];

function Detail({ darkMode }) {
  const { id } = useParams();
  const idea = ideas.find((idea) => idea.id === parseInt(id));

  if (!idea) {
    return (
      <Box
        sx={{
          textAlign: "center",
          padding: 4,
          color: darkMode ? "#FFFFFF" : "#673AB7",
          fontWeight: "bold",
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          minHeight: "100vh",
        }}
      >
        존재하지 않는 아이디어입니다.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
        color: darkMode ? "#FFFFFF" : "#000000",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: darkMode ? "#FFFFFF" : "#673AB7",
          mt: 3,
          mb: 2,
        }}
      >
        {idea.title}
      </Typography>
      <img
        src={idea.image}
        alt={idea.title}
        style={{
          maxWidth: "80%",
          borderRadius: "15px",
          boxShadow: darkMode
            ? "0 4px 10px rgba(255, 255, 255, 0.2)"
            : "0 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontStyle: "italic",
          mb: 3,
          color: darkMode ? "#BDBDBD" : "#555",
        }}
      >
        {idea.description}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          backgroundColor: "#673AB7",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "20px",
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "#5E35B1",
          },
        }}
      >
        뒤로 가기
      </Button>
    </Box>
  );
}

export default Detail;
