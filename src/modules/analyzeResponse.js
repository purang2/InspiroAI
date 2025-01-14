// analyzeResponse.js
export async function analyzeResponse(gptResponse) {
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
            content:
              "다음 텍스트가 카피라이팅인지 아닌지 분석해주세요. 카피라이팅이라면 'true', 아니면 'false'로 응답하고 이유를 간략히 덧붙여주세요.",
          },
          { role: "user", content: gptResponse },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("분석 LLM API 호출 실패");
    }

    const data = await response.json();
    const result = data.choices[0].message.content.trim();

    // 결과를 파싱하여 반환
    const isCopywriting = result.includes("true");
    const reason = result.split(":").slice(1).join(":").trim();

    return { isCopywriting, reason };
  } catch (error) {
    console.error("분석 API 오류:", error);
    return { isCopywriting: false, reason: "분석 실패" };
  }
}
