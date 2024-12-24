const AuthService = {
  users: JSON.parse(localStorage.getItem("users")) || [],

  tryLogin(email, password) {
    return new Promise((resolve, reject) => {
      // 입력한 이메일과 비밀번호로 사용자 검색
      const user = this.users.find((u) => u.email === email && u.password === password);
      
      if (user) {
        // API 키를 로컬 스토리지에 저장
        localStorage.setItem("TMDb-Key", user.apiKey);
        resolve({
          message: "로그인 성공",
          apiKey: user.apiKey, // API 키 반환
        });
      } else {
        reject(new Error("아이디 또는 비밀번호가 잘못되었습니다."));
      }
    });
  },

  tryRegister(email, password) {
    return new Promise((resolve, reject) => {
      // 이미 존재하는 이메일인지 확인
      if (this.users.some((u) => u.email === email)) {
        reject(new Error("이미 존재하는 아이디입니다."));
      } else {
        // 새 사용자 등록 및 랜덤 API 키 생성
        const apiKey = `key-${Math.random().toString(36).substr(2, 16)}`;
        const newUser = { email, password, apiKey };
        this.users.push(newUser);
        // 로컬 스토리지에 업데이트된 사용자 목록 저장
        localStorage.setItem("users", JSON.stringify(this.users));
        resolve({
          message: "회원가입 성공",
          apiKey: apiKey, // 새로 생성된 API 키 반환
        });
      }
    });
  },
};

export default AuthService;
