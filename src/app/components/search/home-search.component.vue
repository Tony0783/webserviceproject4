<template>
  <div class="container-search" v-if="isLoggedIn">
    <div class="container-search-bar">
      <!-- 장르 필터 -->
      <select v-model="selectedGenre" @change="applyFilters" class="filter-select">
        <option value="0">장르 (전체)</option>
        <option v-for="(code, name) in genreCode" :key="name" :value="code">
          {{ name }}
        </option>
      </select>
      
      <!-- 평점 필터 -->
      <select v-model="selectedVoteAverage" @change="applyFilters" class="filter-select">
        <option value="">평점 (전체)</option>
        <option v-for="score in voteAverages" :key="score" :value="score">
          {{ score }} 이상
        </option>
      </select>

      <!-- 초기화 버튼 -->
      <button @click="resetFilters" class="reset-button">초기화</button>
    </div>
    
    <div class="content-search">
      <!-- MovieInfiniteScroll 컴포넌트 사용 -->
      <MovieInfiniteScroll
        :apiKey="apiKey"
        :genreCode="selectedGenre"
        :voteAverage="selectedVoteAverage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import MovieInfiniteScroll from '../../views/views/movie-infinite-scroll.component.vue';

export default {
  name: 'HomeSearch',
  components: {
    MovieInfiniteScroll,
  },
  setup() {
    const router = useRouter();

    // 로그인 여부 확인
    const isLoggedIn = ref(false);

    // API 키 로컬 스토리지에서 가져오기
    const apiKey = process.env.VUE_APP_TMDB_API_KEY;

    // API 키가 없는 경우 로그인 페이지로 이동
    onMounted(() => {
      if (!apiKey.value) {
        router.push('/signin'); // 로그인 페이지로 리다이렉트
      } else {
        isLoggedIn.value = true; // 로그인 되어 있는 경우에만 페이지 접근 허용
      }

      // 저장된 필터 옵션을 불러옴
      const savedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
      if (savedOptions) {
        selectedGenre.value = savedOptions.genreId || '0';
        selectedVoteAverage.value = savedOptions.voteAverage || '';
      }
    });

    const selectedGenre = ref('0');
    const selectedVoteAverage = ref('');

    // 장르 코드 매핑
    const genreCode = {
      'Action': 28,
      'Adventure': 12,
      'Comedy': 35,
      'Crime': 80,
      'Drama': 18,
      'Family': 10751,
      'Fantasy': 14,
      'Horror': 27,
      'Romance': 10749,
      'Science Fiction': 878,
      'Thriller': 53,
    };

    // 평점 리스트 (5점부터 9점까지)
    const voteAverages = [5, 6, 7, 8, 9];

    // 필터 적용 함수
    const applyFilters = () => {
      localStorage.setItem(
        'selectedOptions',
        JSON.stringify({
          genreId: selectedGenre.value,
          voteAverage: selectedVoteAverage.value,
        })
      );
    };

    // 초기화 버튼 함수
    const resetFilters = () => {
      selectedGenre.value = '0';
      selectedVoteAverage.value = '';
      applyFilters();
    };

    return {
      isLoggedIn,
      apiKey,
      selectedGenre,
      selectedVoteAverage,
      genreCode,
      voteAverages,
      applyFilters,
      resetFilters,
    };
  },
};
</script>

<style scoped>
.container-search {
  margin-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container-search-bar {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 10px;
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
}

.filter-select {
  padding: 10px 15px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.filter-select:focus {
  outline: none;
  background: #444;
  transform: scale(1.05);
}

.reset-button {
  padding: 10px 20px;
  background: #ff4c4c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: transform 0.3s;
}

.reset-button:hover {
  background: #ff6666;
  transform: scale(1.05);
}

.content-search {
  width: 100%;
  margin-top: 20px;
  background: #111;
  padding: 20px;
  border-radius: 10px;
}

</style>

