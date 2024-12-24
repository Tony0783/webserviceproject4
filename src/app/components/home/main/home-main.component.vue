<template>
  <div class="home">
    <!-- Banner 컴포넌트: featuredMovie가 로드되었을 때만 렌더링 -->
    <Banner v-if="featuredMovie" :movie="featuredMovie" />
    <div v-else class="loading-banner">로딩 중...</div>

    <!-- MovieRow 컴포넌트에 key 속성 추가 -->
    <MovieRow key="popular" title="인기 영화" :fetchUrl="getUniqueUrl(popularMoviesUrl)" />
    <MovieRow key="romanceMovies" title="로맨스 영화" :fetchUrl="getUniqueUrl(romanceMoviesUrl)" />
    <MovieRow key="actionMovies" title="액션 영화" :fetchUrl="getUniqueUrl(actionMoviesUrl)" />
    <MovieRow key="comedy" title="코미디 영화" :fetchUrl="getUniqueUrl(comedyMoviesUrl)" />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Banner from '../../../views/home-main/banner.component.vue';
import MovieRow from '../../../views/home-main/movie-row.component.vue';

export default {
  name: 'HomeMain',
  components: {
    Banner,
    MovieRow
  },
  setup() {
    // 로컬 스토리지에서 API 키 가져오기
    const apiKey = process.env.VUE_APP_TMDB_API_KEY;
    if (!apiKey) {
      console.error('API 키가 없습니다. 로그인 후 다시 시도해 주세요.');
      return {};
    }

    const featuredMovie = ref(null);

    // URL 설정
    const popularMoviesUrl = ref(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`);
    const romanceMoviesUrl = ref(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&language=ko-KR`);
    const actionMoviesUrl = ref(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&language=ko-KR`);
    const comedyMoviesUrl = ref(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&language=ko-KR`);

    // 고유한 URL을 생성하는 함수 (캐시 회피)
    const getUniqueUrl = (url) => `${url}&t=${new Date().getTime()}`;

    // 인기 영화 데이터 로드
    const loadFeaturedMovie = async () => {
      try {
        const response = await fetch(getUniqueUrl(popularMoviesUrl.value));
        const data = await response.json();
        featuredMovie.value = data.results[0]; // 첫 번째 영화 설정
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    };

    // 스크롤 이벤트 리스너
    const scrollListener = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    // 컴포넌트 마운트 시 호출
    onMounted(() => {
      loadFeaturedMovie();
      window.addEventListener('scroll', scrollListener);
    });

    // 컴포넌트 언마운트 시 호출
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollListener);
    });

    return {
      featuredMovie,
      popularMoviesUrl,
      romanceMoviesUrl,
      actionMoviesUrl,
      comedyMoviesUrl,
      getUniqueUrl
    };
  }
};
</script>

<style scoped>
.home {
  background-color: #1a1a1a; /* 더 깊은 어두운 색으로 조정 */
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  padding-bottom: 40px;
}

.banner {
  position: relative;
  height: 60vh; /* 배너 높이를 줄였습니다. */
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 4%;
}

.banner-content {
  position: absolute;
  z-index: 10;
  padding: 15px;
  max-width: 35%; /* 최대 너비를 조금 넓혔습니다. */
  background: rgba(0, 0, 0, 0.7); /* 더 진한 반투명 배경 */
  border-radius: 8px; /* 더 둥근 모서리 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); /* 더 부드러운 그림자 */
}

.banner-content h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.banner-content p {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.banner-buttons {
  display: flex;
  gap: 10px;
}

.play-button {
  background-color: #e50914;
  border: none;
  color: white;
  padding: 8px 20px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.play-button:hover {
  background-color: #f40612;
  transform: scale(1.05); /* 호버 시 크기 확대 효과 */
}

.info-button {
  padding: 10px 25px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 30px; /* 더 둥근 버튼 모서리 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* 버튼에 그림자 추가 */
  transition: all 0.3s ease;
}

.info-button:hover {
  background-color: #f0f0f0;
  color: #333;
  transform: scale(1.05); /* 호버 시 크기 확대 효과 */
}

/* 배너 이미지 더 부드러운 효과 추가 */
.banner-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5) blur(2px); /* 약간의 블러 효과 추가 */
}

.movie-sliders {
  padding: 15px 4%;
}

.movie-sliders h2 {
  font-size: 1.6rem;
  margin-bottom: 15px;
}

.movie-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 10px;
}

/* 영화 카드 디자인 개선 */
.movie-card {
  flex: 0 0 auto;
  width: 120px; /* 영화 카드 크기를 약간 확대 */
  text-align: center;
  color: white;
  transition: transform 0.3s, box-shadow 0.3s; /* 그림자와 크기 모두에 대한 애니메이션 추가 */
}
.movie-card:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.6); /* 호버 시 그림자 추가 */
}

.movie-card img {
  width: 100%;
  border-radius: 8px; /* 모서리를 더 둥글게 */
  transition: transform 0.3s;
}

.movie-card img:hover {
  transform: scale(1.05); /* 이미지 호버 시 살짝 확대 */
}
.movie-card p {
  font-size: 0.75rem;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 로딩 메시지 스타일 */
.loading-banner {
  text-align: center;
  font-size: 18px;
  color: #888;
  margin: 30px 0;
}
.movie-sliders h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #e6e6e6; /* 섹션 제목의 색을 더 밝게 */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
</style>
