<template>
  <div class="login-container">
    <h1 class="login-title">Welcome to Our Service</h1>
    <button class="kakao-login-btn" @click="loginWithKakao">Login with Kakao</button>
  </div>
</template>

<script>
import { useAuthStore } from '../../store/auth'; // Pinia store import
import { useRouter } from 'vue-router';

export default {
  name: 'SignIn',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Vue Router instance

    const loginWithKakao = () => {
      if (!window.Kakao.isInitialized()) {
        console.error('Kakao SDK is not initialized');
        return;
      }

      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log('Login successful:', authObj);
          localStorage.setItem('kakaoAccessToken', authObj.access_token);

          // 사용자 정보 요청
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (response) => {
              console.log('User Name:', response.properties.nickname);
              console.log('User ID:', response.id);
              console.log('Connected At:', response.connected_at);
              console.log('Email:', response.kakao_account?.email);
              authStore.login(response); // Pinia 상태 업데이트
              localStorage.setItem('userName', response.properties.nickname);
              router.push('/main'); // Use router instance to navigate
            },
            fail: (err) => {
              console.error('Failed to fetch user info:', err);
              alert('Failed to fetch user information.');
            },
          });
        },
        fail: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please try again.');
        },
      });
    };

    return {
      loginWithKakao,
    };
  },
};
</script>

<style scoped>
/* 배경 화면 스타일 */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7e5f, #feb47b); /* 밝은 배경 그라데이션 */
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
}

/* 로그인 제목 스타일 */
.login-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 텍스트 그림자 */
}

/* 카카오 로그인 버튼 스타일 */
.kakao-login-btn {
  display: block;
  width: 300px;
  height: 60px;
  background-color: #fee500;
  color: #3c1e1e;
  border: none;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 버튼 호버 효과 */
.kakao-login-btn:hover {
  background-color: #ffd900;
  transform: translateY(-3px);
  box-shadow: 0px 12px 15px rgba(0, 0, 0, 0.3);
}
</style>
