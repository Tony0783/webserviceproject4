<template>
  <div class="movie-table-view">
    <div class="movie-grid">
      <div
        v-for="movie in paginatedMovies"
        :key="movie.id"
        class="movie-card"
        @click="handleToggleWishlist(movie)"
      >
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
        <!-- 좋아요 표시 아이콘 추가 및 상태에 따른 렌더링 -->
        <div v-if="checkIsInWishlist(movie.id)" class="wishlist-indicator">👍</div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { toggleWishlist, isInWishlist } from "../../util/movie/wishlist.js"; // 위시리스트 관련 유틸리티 불러오기

export default {
  props: ["fetchUrl", "apiKey"],
  setup(props) {
    const currentPage = ref(1);
    const totalPages = ref(1);
    const movies = ref([]);

    const fetchMovies = async (page = 1) => {
      try {
        const response = await axios.get(props.fetchUrl, {
          params: {
            page,
          },
        });
        movies.value = response.data.results;
        totalPages.value = response.data.total_pages;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const paginatedMovies = computed(() => movies.value);

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchMovies(currentPage.value);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchMovies(currentPage.value);
      }
    };

    // 영화가 위시리스트에 있는지 여부를 확인하는 함수
    const checkIsInWishlist = (movieId) => isInWishlist(movieId);

    // 영화 위시리스트에 추가 또는 삭제하는 함수
    const handleToggleWishlist = (movie) => {
      toggleWishlist(movie);
    };

    onMounted(() => {
      fetchMovies(currentPage.value);
    });

    return {
      paginatedMovies,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      getImageUrl: (path) => {
        return path ? `https://image.tmdb.org/t/p/w300${path}` : "/assets/default-movie-poster.jpg";
      },
      checkIsInWishlist,
      handleToggleWishlist,
    };
  },
};
</script>

<style scoped>
.movie-table-view {
  overflow: hidden;
  padding: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  background: #222;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer; /* 클릭 가능하도록 커서 추가 */
  transition: transform 0.2s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.movie-title {
  color: white;
  font-weight: bold;
}

.wishlist-indicator {
  font-size: 20px;
  color: #f39c12;
  margin-top: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}
</style>
