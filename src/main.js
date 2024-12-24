import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia';
import { useAuthStore } from './app/store/auth'; // Pinia store import


// Kakao SDK 초기화
if (!window.Kakao.isInitialized()) {
    const kakaoKey = process.env.VUE_APP_KAKAO_JS_KEY;
    if (kakaoKey) {
        window.Kakao.init(kakaoKey);
        console.log('Kakao SDK initialized with key:', kakaoKey);
    } else {
        console.error('Kakao JavaScript Key is missing.');
    }
}

// Vue 애플리케이션 설정
const app = createApp(App);
const pinia = createPinia();
app.use(pinia); // Pinia 초기화
app.use(router);
app.use(Toast);

const authStore = useAuthStore(); // Pinia store 사용

// 로그인 상태 복원
const token = localStorage.getItem("kakaoAccessToken");

if (token) {
    window.Kakao.Auth.setAccessToken(token);
    window.Kakao.API.request({
        url: '/v2/user/me',
        success: (response) => {
            authStore.login(response); // 로그인 상태 복원
            console.log('Login state restored:', response);
        },
        fail: (err) => {
            console.error('Failed to restore login state:', err);

            // 토큰 유효하지 않은 경우 처리
            localStorage.removeItem("kakaoAccessToken");
            authStore.logout(); // 로그아웃 상태로 초기화
        },
    });
} else {
    authStore.logout(); // 초기 상태를 로그아웃으로 설정
}

app.mount("#app");
