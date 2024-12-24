# My Vue Project

이 프로젝트는 Vue.js를 사용하여 생성된 웹 애플리케이션입니다. FontAwesome, axios, Pinia 등을 활용하며, 간단한 사용자 인터페이스와 데이터를 효과적으로 관리할 수 있는 기능들을 제공합니다.

## 요구 사항

- Node.js (버전 12 이상 권장)
- npm (Node.js에 포함되어 있음)

## 설치 방법

먼저 이 프로젝트를 클론하세요.

```bash
git clone <repository-url>
cd my-vue-project
```

그런 다음 npm으로 필요한 패키지를 설치합니다.

```bash
npm install
```

필요한 경우, `package-lock.json` 파일을 사용하여 의존성을 정확하게 설치하려면 다음 명령어를 사용하세요:

```bash
npm ci
```

## 실행 방법

개발 서버를 실행하려면 다음 명령어를 사용하세요:

```bash
npm run serve
```

위 명령어를 실행하면 기본적으로 [http://localhost:8080](http://localhost:8080)에서 애플리케이션을 확인할 수 있습니다.

## 빌드 방법

프로덕션 배포를 위한 빌드를 수행하려면 다음 명령어를 사용하세요:

```bash
npm run build
```

이 명령어는 최적화된 빌드 파일들을 `dist` 디렉토리에 생성합니다.

## 배포 방법

프로젝트를 GitHub Pages에 배포하려면 다음 명령어를 실행하세요:

```bash
npm run deploy
```

GitHub Actions의 워크플로우 설정을 통해 자동 배포가 가능합니다. `.github/workflows/deploy.yml` 파일을 참고하여 자동화된 배포 설정이 되어 있음을 확인하세요.

배포 후, 설정된 GitHub Pages 링크에서 애플리케이션을 사용할 수 있습니다.

## 코드 스타일 검사

코드 스타일을 검사하려면 다음 명령어를 사용하세요:

```bash
npm run lint
```

## 환경 변수 설정

프로젝트에서 필요한 환경 변수를 설정하기 위해 `.env` 파일을 만들어야 할 수 있습니다. `.env.example` 파일을 참고하여 적절한 환경 변수를 설정해주세요.

## 프로젝트 구조

- `src/main.js`: 애플리케이션의 진입점입니다. 여기에서 Pinia 스토어, Vue Router 및 Toastification을 설정합니다.
- `package.json`: 프로젝트에 필요한 의존성 및 실행 스크립트를 정의한 파일입니다.
- `src/app/components`: 재사용 가능한 UI 요소들을 정의한 컴포넌트들이 모여 있습니다.
  - `home/main/home-main.component.vue`: 홈 화면의 주요 섹션을 구성합니다.
  - `sign-in.component.vue`: 로그인 기능을 처리하는 컴포넌트입니다.
- `src/app/views`: 앱에서 사용되는 주요 뷰를 정의한 파일들입니다.
  - `home-main/banner.component.vue`: 메인 배너를 보여주는 컴포넌트입니다.
  - `movie-row.component.vue`: 영화 리스트를 보여주는 컴포넌트입니다.
- `src/app/store`: Pinia 스토어 모듈로 인증 관련 상태를 관리합니다.
- `src/app/util`: 영화 정보와 관련된 유틸리티 함수들이 모여 있습니다.
  - `auth.service.js`: 인증 관련 유틸리티 함수입니다.
  - `wishlist.js`: 사용자의 위시리스트 관리를 위한 유틸리티입니다.

## 외부 라이브러리

- **FontAwesome**: 아이콘을 사용하기 위한 라이브러리입니다.
- **axios**: API 호출을 위한 HTTP 클라이언트 라이브러리입니다.
- **Pinia**: Vuex의 대체 스토어 관리 라이브러리로, 상태 관리를 더 쉽게 할 수 있도록 합니다.
- **vue-toastification**: 사용자에게 알림을 띄워주는 라이브러리로, 주로 성공 또는 오류 메시지를 표시합니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
