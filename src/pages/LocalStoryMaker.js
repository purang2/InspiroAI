import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const LocalStoryMaker = () => {
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState("");
  const [generatedStory, setGeneratedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const generateStory = async () => {
    const prompt = `
      당신은 지역의 매력을 감성적으로 표현하는 스토리텔러입니다.
      아래 정보를 바탕으로 로컬 스토리를 작성하세요:
      
      - 위치: ${location}
      - 테마: ${theme}

      💡 **목표**
      1. 독자가 해당 장소에서 느낄 수 있는 감정을 묘사합니다.
      2. 짧고 강렬한 문장으로 장소의 매력을 전달합니다.
      3. 독자가 방문하고 싶게 만드는 감성적인 스토리를 작성하세요.
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
                content: "당신은 감성적인 로컬 스토리텔러입니다.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 300,
            temperature: 0.7,
            top_p: 0.9,
          }),
        }
      );

      const data = await response.json();
      setGeneratedStory(data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setLoading(false);
    }
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
        로컬 스토리메이커
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
        위치와 테마를 선택하고 로컬 스토리를 만들어보세요.
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
        위치를 입력하세요:
      </Typography>
      <TextField
        fullWidth
        inputRef={inputRef}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{
          maxWidth: "720px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          input: { color: "#000", fontSize: "1.2rem" },
        }}
        placeholder="예: 서울, 제주도"
      />

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
        테마를 선택하세요:
      </Typography>
      <Select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        displayEmpty
        sx={{
          maxWidth: "720px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <MenuItem value="" disabled>
          테마 선택
        </MenuItem>
        <MenuItem value="힐링">힐링</MenuItem>
        <MenuItem value="모험">모험</MenuItem>
        <MenuItem value="역사">역사</MenuItem>
        <MenuItem value="낭만">낭만</MenuItem>
      </Select>

      <Button
        variant="contained"
        onClick={generateStory}
        disabled={loading || !location || !theme}
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
        스토리 생성
      </Button>

      {loading && <CircularProgress sx={{ color: "#ffdd57" }} />}

      {generatedStory && (
        <Box
          sx={{
            marginTop: "24px",
            padding: "24px",
            backgroundColor: "#28293e",
            borderRadius: "10px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            maxWidth: "720px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: "12px",
              color: "#ffdd57",
              fontSize: "1.2rem",
            }}
          >
            생성된 스토리
          </Typography>
          <Typography sx={{ color: "#ffffff", fontSize: "1.1rem" }}>
            {generatedStory}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LocalStoryMaker;
