<template>
  <div v-if="movie" class="banner" :style="{ backgroundImage: `url(${backdropUrl})` }">
    <div class="banner-content">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      
      <!-- 영화 평점, 개봉일, 장르 정보 추가 -->
      <div v-if="movie.vote_average" class="movie-rating">
        평점: {{ movie.vote_average }} / 10
      </div>
      <div v-if="movie.release_date" class="movie-release-date">
        개봉일: {{ formattedReleaseDate }}
      </div>
      <div v-if="genres && genres.length > 0" class="movie-genres">
        장르: {{ genres.join(', ') }}
      </div>

      <button class="play-btn title-btn">재생</button>
      <button class="info-btn title-btn">상세 정보</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    backdropUrl() {
      return this.movie
        ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
        : "";
    },
    formattedReleaseDate() {
      if (this.movie.release_date) {
        const date = new Date(this.movie.release_date);
        return date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      return null;
    },
    genres() {
      if (this.movie.genres && this.movie.genres.length > 0) {
        return this.movie.genres.map(genre => genre.name);
      }
      return [];
    }
  },
};
</script>

<style scoped>
.banner {
  height: 60vh;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: flex-end;
  margin-top: 50px;
}

.banner-content {
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.banner h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.banner p {
  font-size: 1rem;
  max-width: 500px;
  margin-bottom: 1rem;
}

/* 추가된 영화 평점, 개봉일, 장르 스타일 */
.movie-rating,
.movie-release-date,
.movie-genres {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.play-btn,
.info-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.play-btn {
  background-color: white;
  color: black;
}

.info-btn {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}
</style>
