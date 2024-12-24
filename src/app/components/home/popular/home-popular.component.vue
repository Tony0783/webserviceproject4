<template>
  <div class="popular-container">
    <!-- 뷰 토글 버튼 -->
    <div class="view-toggle">
      <button @click="setView('grid')" :class="{ active: currentView === 'grid' }">Grid View</button>
      <button @click="setView('list')" :class="{ active: currentView === 'list' }">List View</button>
    </div>

    <!-- Movie Grid 컴포넌트 -->
    <MovieGrid v-if="currentView === 'grid'" :fetchUrl="fetchURL" :apiKey="apiKey" />

    <!-- Movie Infinite Scroll 컴포넌트 -->
    <MovieInfiniteScroll v-if="currentView === 'list'" :apiKey="apiKey" genreCode="28" />
  </div>
</template>

<script>
import { ref } from "vue";
import MovieGrid from "../../../views/views/movie-grid.component.vue";
import MovieInfiniteScroll from "../../../views/views/movie-infinite-scroll.component.vue";
import { getURL4PopularMovies } from "../../../util/movie/URL";

export default {
  name: "HomePopular",
  components: {
    MovieGrid,
    MovieInfiniteScroll,
  },
  setup() {
    const currentView = ref("grid");

    // 로컬 스토리지에서 API 키 가져오기
    const apiKey = process.env.VUE_APP_TMDB_API_KEY;
    if (!apiKey) {
      console.error('API 키가 없습니다. 로그인 후 다시 시도해 주세요.');
      return;
    }

    // API URL 생성
    const fetchURL = getURL4PopularMovies(apiKey);

    const setView = (view) => {
      currentView.value = view;
    };

    return {
      currentView,
      setView,
      fetchURL,
      apiKey,
    };
  },
};
</script>

<style scoped>
.view-toggle {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}

.view-toggle button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #535bf2;
}
</style>