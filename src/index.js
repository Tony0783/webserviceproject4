const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// JSON 요청 본문 파싱
app.use(bodyParser.json());

// /api/register 엔드포인트
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '이메일과 비밀번호를 입력해야 합니다.' });
  }

  console.log(`회원가입 요청: ${email}, ${password}`);

  // 회원가입 성공 응답
  return res.status(201).json({ message: '회원가입 성공', apiKey });
});

// 서버 실행
const PORT = 8082; // 프론트엔드와 동일한 포트 사용 금지
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
