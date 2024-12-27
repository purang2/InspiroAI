import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const ideas = [
  {
    id: 1,
    title: "AI 카피라이터 (AI Copywriter)",
    description: "수 초 만에 광고 문구를 제작해주는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a", // 이미지 URL
  },
  {
    id: 2,
    title: "로컬 스토리메이커",
    description: "지역의 매력을 한 문장에 담아내는 인공지능 스토리메이커",
    image: "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed", // 이미지 URL
  },
  {
    id: 3,
    title: "커플 및 결혼 여행 정보",
    description:
      "커플 및 결혼한 사람들에게 소중한 순간을 기억에 남게 하는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1699341381878-4712514e8966", // 이미지 URL
  },
  {
    id: 4,
    title: "미식 여행 정보",
    description: "지역의 맛과 이야기를 담아내는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1631024723408-1d1c95735cef", // 이미지 URL
  },
  {
    id: 5,
    title: "사진 여행지 정보",
    description: "인기 촬영 명소를 추천해주는 인공지능 카피라이터",
    image: "https://images.unsplash.com/photo-1706431593003-77f796098bc3", // 이미지 URL
  },
  {
    id: 6,
    title: "힐링 여행 정보",
    description: "몸과 마음을 치유하는 웰니스 관광지와 스파를 위한 카피라이터",
    image: "https://images.unsplash.com/photo-1733822842270-9fcb181c5f13", // 이미지 URL
  },
];

function Home({ darkMode }) {
  return (
    <Box>
      {/* 상단 네비게이션 */}
      <AppBar
        position="static"
        sx={{ backgroundColor: darkMode ? "#333333" : "#673AB7" }}
      ></AppBar>

      {/* 상단 웰컴 섹션 */}
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: darkMode ? "#FFFFFF" : "#673AB7",
            mt: 3,
          }}
        >
          Welcome 환영합니다 👋
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: darkMode ? "#BDBDBD" : "gray",
            mb: 4,
          }}
        >
          한줄 엔터프라이즈 인스파이로AI(InspiroAI)입니다.
        </Typography>
      </Box>

      {/* 카드 섹션 */}
      <Grid container spacing={4} sx={{ padding: 3 }}>
        {ideas.map((idea) => (
          <Grid item xs={12} sm={6} md={4} key={idea.id}>
            <Card
              sx={{
                backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#000000",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src={idea.image}
                alt={idea.title}
                style={{ width: "100%", height: "360px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {idea.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                  {idea.description}
                </Typography>
                <Button
                  component={Link}
                  to={`/detail/${idea.id}`}
                  variant="contained"
                  sx={{
                    backgroundColor: "#673AB7",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "#5E35B1",
                    },
                  }}
                >
                  자세히 보기
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 하단 이미지 추가 */}
      <Box
        sx={{
          mt: 5,
          textAlign: "center",
          backgroundColor: darkMode ? "#2C2C2C" : "#f5f5f5",
          padding: 2,
          borderRadius: "10px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1554040305-68021c3fc4f1"
          alt="배경 이미지"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: darkMode ? "#BDBDBD" : "gray",
            mt: 1,
          }}
        >
          InspiroAI가 선사하는 새로운 영감의 순간 🌟
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
