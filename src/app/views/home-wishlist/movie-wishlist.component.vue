<template>
  <div class="movie-grid" ref="gridContainer">
    <div :class="['grid-container', currentView]">
      <div
        v-for="(movieGroup, index) in visibleWishlistMovies"
        :key="index"
        class="movie-row"
        :class="{ 'full': movieGroup.length === rowSize }"
      >
        <div
          v-for="movie in movieGroup"
          :key="movie.id"
          class="movie-card"
          @click="toggleWishlist(movie)"
        >
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
          <div class="wishlist-indicator">👍</div>
        </div>
      </div>
    </div>
    <div v-if="wishlistMovies.length === 0" class="empty-wishlist">
      위시리스트가 비어 있습니다.
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { wishlist } from "@/app/util/movie/wishlist.js"; // 수정된 wishlistService 경로
import ResizeObserver from "resize-observer-polyfill";

export default {
  name: "MovieWishlist",
  setup() {
    const gridContainer = ref(null);
    const rowSize = ref(4);
    const moviesPerPage = ref(20);
    const currentPage = ref(1);
    const isMobile = ref(window.innerWidth <= 768);
    const currentView = ref("grid");
    const wishlistMovies = ref([]);
    const visibleWishlistMovies = ref([]);

    let resizeObserver;

    const loadWishlist = () => {
      wishlistMovies.value = wishlist.value || [];
      updateVisibleMovies();
    };

    const calculateLayout = () => {
      if (gridContainer.value) {
        const containerWidth = gridContainer.value.offsetWidth;
        const containerHeight =
          window.innerHeight - gridContainer.value.offsetTop;
        const movieCardWidth = isMobile.value ? 90 : 220;
        const movieCardHeight = isMobile.value ? 150 : 330;
        const horizontalGap = isMobile.value ? 10 : 15;
        const verticalGap = -10;

        rowSize.value = Math.floor(
          containerWidth / (movieCardWidth + horizontalGap)
        );
        const maxRows = Math.floor(
          containerHeight / (movieCardHeight + verticalGap)
        );
        moviesPerPage.value = rowSize.value * maxRows;

        updateVisibleMovies();
      }
    };

    const updateVisibleMovies = () => {
      const startIndex = (currentPage.value - 1) * moviesPerPage.value;
      const endIndex = startIndex + moviesPerPage.value;
      const paginatedMovies = wishlistMovies.value.slice(startIndex, endIndex);

      visibleWishlistMovies.value = paginatedMovies.reduce(
        (resultArray, item, index) => {
          const groupIndex = Math.floor(index / rowSize.value);
          if (!resultArray[groupIndex]) {
            resultArray[groupIndex] = [];
          }
          resultArray[groupIndex].push(item);
          return resultArray;
        },
        []
      );
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        updateVisibleMovies();
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        updateVisibleMovies();
      }
    };

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
      calculateLayout();
    };

    const toggleWishlist = (movie) => {
      if (wishlist.value.includes(movie)) {
        wishlist.value = wishlist.value.filter((m) => m.id !== movie.id);
      } else {
        wishlist.value.push(movie);
      }
      loadWishlist();
    };

    const getImageUrl = (path) => {
      return path
        ? `https://image.tmdb.org/t/p/w300${path}`
        : "/placeholder-image.jpg";
    };

    const totalPages = ref(0);
    watchEffect(() => {
      totalPages.value = Math.ceil(
        wishlistMovies.value.length / moviesPerPage.value
      );
    });

    onMounted(() => {
      loadWishlist();
      handleResize();
      window.addEventListener("resize", handleResize);
      resizeObserver = new ResizeObserver(() => calculateLayout());
      if (gridContainer.value) {
        resizeObserver.observe(gridContainer.value);
      }
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      if (gridContainer.value) {
        resizeObserver.unobserve(gridContainer.value);
      }
      resizeObserver.disconnect();
    });

    return {
      gridContainer,
      rowSize,
      moviesPerPage,
      currentPage,
      isMobile,
      currentView,
      wishlistMovies,
      visibleWishlistMovies,
      totalPages,
      nextPage,
      prevPage,
      handleResize,
      toggleWishlist,
      getImageUrl,
    };
  },
};
</script>

<style scoped>
/* 스타일은 기존 코드와 동일 */
.movie-grid {
  width: 100%;
  height: calc(100vh - 200px);
  margin: 30px 0 40px 0;
  display: flex;
  flex-direction: column;
}
.movie-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.movie-card {
  width: 160px;
  margin: 0 10px;
  position: relative;
  transition: transform 0.3s;
}
.movie-card:hover {
  transform: scale(1.05);
}
.movie-card img {
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
}
.movie-title {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination button {
  padding: 8px 12px;
  border-radius: 4px;
}
.empty-wishlist {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 20px;
}
</style>
