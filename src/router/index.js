import { createRouter, createWebHistory } from 'vue-router';

// 페이지 컴포넌트 import
import HomeMain from '../app/components/home/main/home-main.component.vue';
import HomePopular from '../app/components/home/popular/home-popular.component.vue';
import HomeWishlist from '../app/components/home/wishlist/home-wishlist.component.vue';
import HomeSearch from '../app/components/search/home-search.component.vue';
import SignIn from '../app/components/sign-in/sign-in.component.vue';

// 로그인 상태 확인 함수
const isLoggedIn = () => {
  const token = localStorage.getItem('kakaoAccessToken');
  return !!token; // 토큰이 있으면 true, 없으면 false
};

const routes = [
  // 기본 경로를 '/sign-in'으로 리다이렉트
  { path: '/', redirect: '/sign-in' },
  // '/main'을 메인 페이지로 설정
  { path: '/main', name: 'HomeMain', component: HomeMain, meta: { requiresAuth: true } },
  { path: '/popular', name: 'HomePopular', component: HomePopular, meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'HomeWishlist', component: HomeWishlist, meta: { requiresAuth: true } },
  { path: '/search', name: 'HomeSearch', component: HomeSearch, meta: { requiresAuth: true } },
  { path: '/sign-in', name: 'SignIn', component: SignIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 전역 가드 추가: 로그인 여부 확인
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path);
  console.log('Is Logged In:', isLoggedIn());

  if (to.meta.requiresAuth && !isLoggedIn()) {
    console.log('Redirecting to Sign In...');
    next({ path: '/sign-in', query: { redirect: to.fullPath } });
  } else {
    console.log('Access granted to:', to.path);
    next();
  }
});

export default router;
