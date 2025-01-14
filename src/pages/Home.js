import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

function Home() {
  const items = [
    {
      title: "[감성챗봇]한줄생원",
      description: "독창적인 영감을 위한 한 줄을 찾아보세요.",
      actionText: "한 줄 찾기",
      path: "/ai-chatbot",
    },
    {
      title: "AI 카피라이터",
      description: "한 줄로 세상을 움직이는 창의적 메시지를 만들어보세요.",
      actionText: "카피라이터 탐험하기",
      path: "/ai-copywriter",
    },
    {
      title: "로컬 스토리메이커",
      description: "지역의 매력을 한 줄로 표현하는 특별한 경험.",
      actionText: "스토리메이커 열어보기",
      path: "/local-storymaker",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
        gap: 3,
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      {/* 메인 타이틀 */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Insp에 오신 것을 환영하오!
      </Typography>

      {/* 서비스 카드 목록 */}
      {items.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
            backgroundColor: "background.paper",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: "primary.main",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "20px",
                color: "text.secondary",
              }}
            >
              {item.description}
            </Typography>
            <Button
              variant="contained"
              href={item.path}
              sx={{
                backgroundColor: "primary.main",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {item.actionText}
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* 하단 안내 */}
      <Typography
        variant="body2"
        sx={{
          marginTop: "20px",
          color: "text.secondary",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        "%%세상은 한 줄로도 충분히 변할 수 있소.%%"
      </Typography>
    </Box>
  );
}

export default Home;
