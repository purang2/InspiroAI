// pages/ChatPage.js 상단의 imports 수정
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress, // 이 줄을 추가
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";

function ChatPage({ darkMode }) {
  const getRandomInitialMessage = () => {
    const initialMessages = [
      `어서 오게. 오늘 아침엔 이런 생각이 떠올랐네: "{{작은 물방울이 바위를 뚫는 건, 끈질긴 열정 때문이네.}}"`,
      `반갑네. 오늘의 한 줄: "{{책 속에는 세상을 밝히는 등불이 숨어 있네.}}" 자네는 책을 좋아하는가?`,
      `자네와 나누고 싶은 문장이 떠오르는군: "{{길 위의 모든 발자국이 이야기가 되지.}}" 오늘 자네의 이야기를 들려주겠나?`,
    ];
    const randomIndex = Math.floor(Math.random() * initialMessages.length);
    return initialMessages[randomIndex];
  };

  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            role: "assistant",
            content: getRandomInitialMessage(),
          },
        ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copywritingResults, setCopywritingResults] = useState(() => {
    const savedCopies = sessionStorage.getItem("copywritingResults");
    return savedCopies ? JSON.parse(savedCopies) : [];
  });
  const inputRef = useRef(null);

  const userNickname = "모험가(User)";
  const assistantNickname = "한줄생원";

  // 입력창 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 대화 및 카피라이팅 기록 저장
  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    sessionStorage.setItem(
      "copywritingResults",
      JSON.stringify(copywritingResults)
    );
  }, [messages, copywritingResults]);

  const callOpenAIAPI = async (userMessage) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `
  
당신은 조선시대 과거에 급제한 후 한 줄의 매력을 전하는 데 일생을 바친 "한줄생원"입니다.

성격:
1. 선비의 품격과 해학을 겸비했으며, 부드러운 선비체 반말을 사용합니다.
2. 동양 고전(사서삼경, 논어, 맹자 등)과 조선의 선현들(율곡, 퇴계, 다산, 추사 등)의 지혜를 자주 인용합니다.
3. 한시(漢詩)와 시조에 조예가 깊어 적절한 순간에 인용합니다.

대화 방식:
1. 매 대화마다 다음 중 하나를 자연스럽게 인용:
   - 조선 선현들의 명언과 시구
   - 한시나 시조의 한 구절
   - 사서삼경의 지혜
   - 동양 철학의 정수
   예) "퇴계 선생께서 말씀하시길 {{고요할 때를 살피고 움직일 때를 살핌이 학문의 요체라}} 하셨는데..."

2. 사용자의 한 줄에 대한 반응:
   "오호! 자네의 이 한 줄은 마치 매월당 김시습의 '수우거'와도 같은 풍격이 있구려!"
   "이 문장에서 추사 선생의 '세한도'와 같은 고고한 정신이 느껴지는군."

3. 교육적 요소:
   - 한자성어를 활용한 설명
   - 동양적 미학 관점에서의 분석
   - 선현들의 일화를 통한 비유


   평범한 대화 속에서도:
   - 사용자의 문장에서 가치 있는 한 줄을 즉시 발견하여 {{발견한 문장}}으로 표시
   - 발견된 한 줄의 매력을 세 가지 관점에서 깊이 있게 분석
   - 비슷한 명문장이나 시구를 연결하여 문장의 가치를 더욱 빛나게 함
   - 사용자가 더 좋은 문장을 만들 수 있도록 구체적인 피드백 제공
   

대화 예시:
한줄생원: "어서 오시게나. 오늘 아침 《논어》를 읽다가 이런 구절을 발견했네. {{학이시습지 불역열호(學而時習之 不亦說乎)}} - 배우고 때때로 익히면 또한 기쁘지 아니한가. 공자님의 이 말씀이 자네의 하루에 빛이 되길 바라는 마음이구려."

사용자: "봄이 오니 꽃길이 설레네요."

한줄생원: "오호! {{꽃길 위에 설렘이 피어나니, 봄바람이 내 마음을 훔쳐가는구려.}} - 자네의 이 한 줄이 마치 송강 정철의 '관동별곡'처럼 정감 있구려. 봄이란 계절을 이리 아름답게 담아내다니. 황진이의 시조 한 수가 떠오르는데..."

"오호! 자네의 이 말 {{인생은 기다림의 예술이로다}} - 이는 마치 퇴계 선생의 풍모가 느껴지는 걸작이야. 어쩌면 이리 쉽게 좋은 문장을 떠올리는가?"
"자네, 이청준의 '누구나 한 번쯤은 어디에선가 자신의 미래를 만난다'라는 문장을 아는가? 내게는 이렇게 {{미래는 우리가 꿈꾸는 모든 순간에 존재하네}} 라고 다가오는데, 자네는 어떤가?"


특별 화법:
1. "~이었으매", "~하였으니", "~하구려", "~가매", "~할진저" 등 고풍스러운 어투
2. "어허", "오호", "아니 이를 어찌" 등의 감탄사
3. "~하옵니다", "~하나이다"와 같은 아주높임말은 피하고 격식있는 반말 사용

주의사항:
- 너무 어려운 한자어는 피하되, 이해하기 쉬운 한자성어는 적절히 사용
- 동양적 지혜를 전할 때도 현대인이 공감할 수 있게 전달
- 사용자의 말에서 한 줄이 될 만한 문장을 발견하면 매우 기뻐하며 칭찬
- 때로는 조선시대 선비의 풍류와 해학도 보여줌
  `,
            },
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("API 호출 실패");
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (err) {
      console.error("OpenAI API 호출 오류:", err);
      return "미안하네, 지금은 답을 줄 수 없네.";
    }
  };

  // evaluateCopywriting 함수를 완전히 교체
  const evaluateCopywriting = async (text) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
              당신은 문장의 예술성을 평가하는 전문가입니다.
              다음 기준으로 0-100점 사이의 정수 점수만 반환하세요:
              
              1. 독창성 (30점)
              - 기존에 없던 새로운 표현
              - 참신한 관점과 은유
              
              2. 문장의 힘 (40점)
              - 감정적 울림
              - 전달력과 설득력
              - 함축성과 깊이
              
              3. 세련미 (30점)
              - 리듬감과 운율
              - 단어 선택의 적절성
              - 전체적인 세련됨
              
              점수만 숫자로 반환하세요.
            `,
            },
            { role: "user", content: text },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("평가 API 호출 실패");
      }

      const data = await response.json();
      const score = parseInt(data.choices[0].message.content.trim());
      return isNaN(score) ? 70 : score; // 숫자가 아닐 경우 기본값 반환
    } catch (err) {
      console.error("점수 평가 실패:", err);
      return 70; // 기본 점수
    }
  };

  // GPT-4를 사용한 Quote 분석 함수
  const analyzeQuote = async (userMessage) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const endpoint = "https://api.openai.com/v1/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `다음 문장에서 명언이나 철학적 표현을 감지하라. 감지된 부분을 {{quote}}로 감싸서 반환하라. 감지할 수 없는 경우 "NULL"을 반환하라.`,
            },
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await response.json();
      const quote = data.choices[0].message.content.trim();
      return quote !== "NULL" ? quote : null;
    } catch (err) {
      console.error("Quote 분석 오류:", err);
      return null;
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // Step 1: AI 응답 생성 및 Quote 분석 통합
      const assistantMessage = await callOpenAIAPI(userMessage);
      const filteredQuotes = [...assistantMessage.matchAll(/\{\{(.+?)\}\}/g)];
      const detectedQuote = await analyzeQuote(userMessage);

      // Step 2: Quote 처리
      if (filteredQuotes.length > 0) {
        filteredQuotes.forEach((match) => {
          setCopywritingResults((prev) => [
            ...prev,
            { title: "새 카피라이팅", content: match[1] },
          ]);
        });

        // AI 응답에 Quote가 포함되어 있다면 메시지에 강조 추가
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: assistantMessage.replace(
              /\{\{(.+?)\}\}/g,
              (match, p1) => `<blockquote>${p1}</blockquote>`
            ),
          },
        ]);
      } else if (detectedQuote) {
        // 사용자가 입력한 메시지에서 Quote 감지

        const addCopywriting = async (newCopy) => {
          const score = await evaluateCopywriting(newCopy.content); // 점수 평가 호출

          setCopywritingResults(
            (prev) =>
              [
                ...prev,
                { ...newCopy, score }, // 새로운 카피와 점수를 함께 추가
              ].sort((a, b) => b.score - a.score) // 점수 기준 내림차순 정렬
          );
        };

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `이런 문장이 명언처럼 보이는군: <blockquote>${detectedQuote.replace(
              /{{|}}/g,
              ""
            )}</blockquote>. 이를 저장할까?`,
          },
        ]);

        // Quote를 자동으로 카피라이팅 기록에 저장
        setCopywritingResults((prev) => [
          ...prev,
          {
            title: "새 카피라이팅",
            content: detectedQuote.replace(/{{|}}/g, ""),
          },
        ]);
      } else {
        // 일반 대화 처리
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantMessage },
        ]);
      }
    } catch (err) {
      console.error("AI 응답 생성 오류:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "죄송합니다, 현재 응답할 수 없습니다다.",
        },
      ]);
    }

    setIsLoading(false);
  };

  const startNewConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: getRandomInitialMessage(),
      },
    ]);
    setCopywritingResults([]);
    sessionStorage.removeItem("chatMessages");
    sessionStorage.removeItem("copywritingResults");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#FFFFFF",
        color: darkMode ? "#FFFFFF" : "#000000",
        position: "relative",
      }}
    >
      {/* 새 대화 시작 버튼 */}
      <Button
        variant="outlined"
        onClick={startNewConversation}
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: darkMode ? "#3A3A3A" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#000000",
          border: "1px solid",
          borderColor: darkMode ? "#BB86FC" : "#673AB7",
          "&:hover": {
            backgroundColor: darkMode ? "#5E35B1" : "#E0E0E0",
          },
        }}
      >
        새 대화 시작
      </Button>

      {/* 좌측 카피라이팅 기록 */}

      {/* 좌측 카피라이팅 기록 */}
      <Box
        sx={{
          width: "20%",
          backgroundColor: darkMode ? "#333333" : "#F5F5F5",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: "10px",
            color: darkMode ? "#FFFFFF" : "#000000",
          }}
        >
          카피라이팅 기록
        </Typography>
        {copywritingResults.length > 0 ? (
          copywritingResults.map((item, index) => (
            <Paper
              key={index}
              sx={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: darkMode ? "#444444" : "#FFFFFF",
                color: "#000000",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.5s ease", // 순위 변화 시 애니메이션 효과
              }}
            >
              <Typography variant="subtitle1">
                {index + 1}위: {item.title} ({item.score}점)
              </Typography>
              <Typography variant="body2">{item.content}</Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2">아직 저장된 카피가 없습니다.</Typography>
        )}
      </Box>

      {/* 대화창 */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            height: "70%",
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            borderRadius: "10px",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <Paper
              key={index}
              sx={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor:
                  message.role === "user"
                    ? darkMode
                      ? "#673AB7"
                      : "#BB86FC"
                    : darkMode
                    ? "#333333"
                    : "#F5F5F5",
                color: message.role === "user" ? "#FFFFFF" : "#000000",
              }}
            >
              <Typography>
                <b>
                  {message.role === "user" ? userNickname : assistantNickname}:
                </b>{" "}
                {message.content.split(/{{|}}/).map((part, idx) =>
                  idx % 2 === 1 ? (
                    <span
                      key={idx}
                      style={{
                        display: "block",
                        margin: "10px 0",
                        padding: "10px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        backgroundColor: darkMode ? "#2E2E2E" : "#F0F0F0",
                        borderLeft: `4px solid ${
                          darkMode ? "#BB86FC" : "#673AB7"
                        }`,
                        paddingLeft: "10px",
                      }}
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={idx}>{part}</span>
                  )
                )}
              </Typography>
            </Paper>
          ))}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>

        {/* 입력창 */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <TextField
            fullWidth
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            inputRef={inputRef}
            sx={{
              flex: 1,
              backgroundColor: darkMode ? "#333333" : "#FFFFFF", // 다크모드: 어두운 배경
              color: darkMode ? "#FFFFFF" : "#000000", // 다크모드: 밝은 텍스트
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#BB86FC" : "#673AB7", // 테두리 색상
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#AA75FB" : "#5E35B1", // 호버 시 테두리 색상
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? "#BB86FC" : "#673AB7", // 포커스 시 테두리 색상
                },
              },
              "& .MuiInputBase-input": {
                color: darkMode ? "#FFFFFF" : "#000000", // 텍스트 색상
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              backgroundColor: darkMode ? "#BB86FC" : "#673AB7", // 버튼 배경
              color: "#FFFFFF", // 항상 흰색 텍스트
              "&:hover": {
                backgroundColor: darkMode ? "#AA75FB" : "#5E35B1", // 호버 시 배경
              },
            }}
          >
            전송
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatPage;
