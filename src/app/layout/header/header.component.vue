<template>
  <div id="container">
    <header class="app-header" :class="{ 'scrolled': isScrolled }">
      <div class="header-left">
        <div class="logo">
          <router-link to="/main">
            <font-awesome-icon :icon="['fas', 'ticket']" style="height: 100%; color: #E50914;"></font-awesome-icon>
          </router-link>
        </div>
        <nav class="nav-links desktop-nav">
          <ul>
            <li><router-link to="/main">홈</router-link></li>
            <li><router-link to="/popular">대세 콘텐츠</router-link></li>
            <li><router-link to="/wishlist">내가 찜한 리스트</router-link></li>
            <li><router-link to="/search">찾아보기</router-link></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <!-- 로그인 상태에 따라 렌더링 -->
        <div v-if="isLoggedIn">
          <span class="user-info">Welcome, {{ userName }}</span>
          <button class="icon-button" @click="handleLogout">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon> Logout
          </button>
        </div>
        <router-link v-else to="/sign-in" class="icon-button">
          <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon> Sign In
        </router-link>
        <button class="icon-button mobile-menu-button" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
        </button>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <button class="close-button" @click="toggleMobileMenu">
        <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
      </button>
      <nav>
        <ul>
          <li><router-link to="/main" @click="toggleMobileMenu">홈</router-link></li>
          <li><router-link to="/popular" @click="toggleMobileMenu">대세 콘텐츠</router-link></li>
          <li><router-link to="/wishlist" @click="toggleMobileMenu">내가 찜한 리스트</router-link></li>
          <li><router-link to="/search" @click="toggleMobileMenu">찾아보기</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faUser, faTicket, faBars, faTimes);

export default {
  name: 'HeaderComponent',
  components: { FontAwesomeIcon },
  setup() {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();

    // 로그인 여부와 사용자 이름을 반응형으로 가져옴
    const isLoggedIn = computed(() => authStore.isLoggedIn);
    const userName = computed(() => authStore.user?.properties?.nickname || 'Guest');

    // 로그아웃
    const handleLogout = () => {
      localStorage.removeItem('kakaoAccessToken'); // 토큰 제거
      authStore.logout(); // Pinia 상태 초기화
      console.log('Is Logged In:', authStore.isLoggedIn); // 로그아웃 상태 출력
      router.push('/sign-in'); // Sign-in 페이지로 리다이렉트
    };

    // 모바일 메뉴 토글
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    // 스크롤 이벤트 관리
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled,
      isMobileMenuOpen,
      isLoggedIn,
      userName,
      handleLogout,
      toggleMobileMenu,
    };
  },
};
</script>

<style scoped>
/* 헤더 디자인 복원 */
.app-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 4%;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.app-header.scrolled {
  background-color: #141414;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 25px;
  justify-items: center;
  align-items: center;
}

.nav-links ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #b3b3b3;
}

.user-info {
  color: #e5e5e5;
  font-size: 0.85rem;
  margin-right: 15px;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.icon-button:hover {
  opacity: 0.7;
}

.mobile-menu-button {
  display: none;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 50%;
  height: 100%;
  background-color: #141414;
  z-index: 1001;
  transition: right 0.3s ease;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav ul {
  list-style-type: none;
  padding: 0;
  margin-top: 60px;
}

.mobile-nav li {
  margin: 20px 0;
}

.mobile-nav a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding: 10px 20px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .icon-button {
    font-size: 0.75rem;
    margin-left: 10px;
  }
}
</style>
