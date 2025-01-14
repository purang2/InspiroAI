import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const Copywriter = () => {
  const [topic, setTopic] = useState("");
  const [generatedCopies, setGeneratedCopies] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const generateCopy = async () => {
    const prompt = `
    당신은 맞춤형 감성 카피를 창작하는 숙련된 카피라이터입니다.
    아래 제공된 주제를 바탕으로 독자의 마음을 울릴 수 있는 짧고 강렬한 한 줄의 카피와 짧은 설명을 작성하세요.

    💡 **목표**
    1. 주제를 감성적으로 묘사하여 공감대를 형성합니다.
    2. 독자가 느낄 수 있는 변화를 철학적이고 창의적으로 표현합니다.
    3. 아래 형식으로만 결과를 작성하세요:
       - **카피**: 주제를 함축한 강렬한 한 줄 메시지.
       - **설명**: 카피의 맥락을 보완하는 감성적인 해설.

    주제: ${topic}
    `;

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: "당신은 창의적이고 감성적인 카피라이터입니다.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 200,
            temperature: 0.75,
            top_p: 0.9,
          }),
        }
      );

      const data = await response.json();
      const newCopy = data.choices[0].message.content.trim();
      const timestamp = new Date();

      setGeneratedCopies((prevCopies) => [
        ...prevCopies,
        { content: newCopy, timestamp },
      ]);
    } catch (error) {
      console.error("Error generating copy:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // Difference in seconds

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        gap: "24px",
        backgroundColor: "#1e1e2f",
        minHeight: "100vh",
        color: "#fff",
        borderRadius: "14px",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#ffdd57",
          fontSize: "2.4rem",
        }}
      >
        AI 카피라이터
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          width: "100%",
          maxWidth: "720px",
          color: "#ffdd57",
          fontSize: "1.5rem",
          marginBottom: "16px",
        }}
      >
        주제를 입력하고 한 줄의 카피라이팅을 만나보세요.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          width: "100%",
          maxWidth: "720px",
          color: "#ffdd57",
          fontSize: "1.2rem",
        }}
      >
        주제를 자유롭게 입력하고 한 줄의 카피라이팅을 만나보세요.
      </Typography>

      <TextField
        fullWidth
        inputRef={inputRef}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") generateCopy();
        }}
        sx={{
          maxWidth: "720px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          input: { color: "#000", fontSize: "1.2rem" },
        }}
        placeholder="예: 삶, 사랑, 도전"
      />

      <Button
        variant="contained"
        onClick={generateCopy}
        disabled={loading || !topic}
        sx={{
          padding: "12px 36px",
          fontSize: "1.2rem",
          backgroundColor: "#ffdd57",
          color: "#1e1e2f",
          fontWeight: "bold",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#ffc107",
          },
        }}
      >
        카피 생성
      </Button>

      {loading && <CircularProgress sx={{ color: "#ffdd57" }} />}

      <Box sx={{ marginTop: "24px", width: "100%", maxWidth: "720px" }}>
        {generatedCopies.map((copy, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: "24px",
              padding: "24px",
              backgroundColor: "#28293e",
              borderRadius: "10px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "12px",
                color: "#ffdd57",
                fontSize: "1.2rem",
              }}
            >
              {formatTime(copy.timestamp)}
            </Typography>
            {copy.content.split("**설명**:").map((part, subIndex) =>
              subIndex === 0 ? (
                <Typography
                  key={subIndex}
                  sx={{
                    color: "#ffdd57",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    fontSize: "1.2rem",
                  }}
                >
                  {part.replace("**카피**:", "").trim()}
                </Typography>
              ) : (
                <Typography
                  key={subIndex}
                  sx={{ color: "#ffffff", fontSize: "1.1rem" }}
                >
                  {part.trim()}
                </Typography>
              )
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Copywriter;
