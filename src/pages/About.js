import React from "react";
import { Box, Typography } from "@mui/material";

function About({ darkMode }) {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5", // 다크모드 배경
        color: darkMode ? "#FFFFFF" : "#000000", // 다크모드 텍스트 색상
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: darkMode ? "#BB86FC" : "#673AB7", // 다크모드 강조 색상
          fontWeight: "bold",
        }}
      >
        About InspiroAI 👋
      </Typography>
      <Typography
        variant="h6"
        sx={{ mb: 3, color: darkMode ? "#CCCCCC" : "#555" }}
      >
        한줄 엔터프라이즈 인스파이로AI(InspiroAI)에 오신 것을 환영합니다!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          color: darkMode ? "#CCCCCC" : "#555",
          lineHeight: 1.8,
        }}
      >
        InspiroAI는 다양한 주제를 바탕으로 창의적이고 감성적인 한 줄 카피를
        제공하는 AI 서비스입니다. 우리의 목표는 광고, 여행, 브랜딩 등 다양한
        도메인에서 영감을 주고, 사용자가 더 나은 콘텐츠를 생성할 수 있도록 돕는
        것입니다.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mt: 4,
          mb: 2,
          color: darkMode ? "#BB86FC" : "#673AB7",
          fontWeight: "bold",
        }}
      >
        InspiroAI가 제공하는 서비스:
      </Typography>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          color: darkMode ? "#CCCCCC" : "#555",
        }}
      >
        <li style={{ marginBottom: "10px" }}>
          ✅ 여행지 소개를 위한 광고 카피
        </li>
        <li style={{ marginBottom: "10px" }}>✅ 브랜딩 및 로컬 스토리텔링</li>
        <li style={{ marginBottom: "10px" }}>
          ✅ SNS와 공모전을 위한 감성적 문구 생성
        </li>
        <li>✅ 기념일 및 특별 이벤트를 위한 문구 제작</li>
      </ul>
      <Typography
        variant="body1"
        sx={{
          mt: 4,
          color: darkMode ? "#CCCCCC" : "#555",
        }}
      >
        InspiroAI는 창의성과 기술을 결합하여 사용자에게 영감을 불어넣습니다.
        지금 바로 사용해보세요!
      </Typography>
    </Box>
  );
}

export default About;
