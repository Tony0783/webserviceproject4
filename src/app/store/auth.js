import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false, // 로그인 상태
    user: null, // 사용자 정보
    tmdbApiKey: null, // TMDB API 키
  }),
  actions: {
    initializeAuth() {
      const kakaoToken = localStorage.getItem('kakaoAccessToken');
      if (kakaoToken) {
        this.isLoggedIn = true;
        window.Kakao.Auth.setAccessToken(kakaoToken);

        // Kakao 사용자 정보 복원
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (response) => {
            this.user = response;

            // TMDB API 키 설정 (로그인 성공 시)
            this.tmdbApiKey = process.env.VUE_APP_TMDB_API_KEY;
          },
          fail: (err) => {
            console.error('Failed to restore user info:', err);
            this.logout(); // 사용자 정보 복원 실패 시 로그아웃 처리
          },
        });
      } else {
        this.logout(); // 토큰 없으면 로그아웃
      }
    },
    login(userInfo) {
      this.isLoggedIn = true;
      this.user = userInfo;

      // TMDB API 키 활성화
      this.tmdbApiKey = process.env.VUE_APP_TMDB_API_KEY;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;

      // TMDB API 키 비활성화
      this.tmdbApiKey = null;

      // LocalStorage에서 토큰 제거
      localStorage.removeItem('kakaoAccessToken');
    },
  },
});
