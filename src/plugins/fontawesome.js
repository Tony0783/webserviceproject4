import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";

// FontAwesome 라이브러리에 아이콘 추가
library.add(faTh, faBars);

export default (app) => {
  app.component("fa-icon", FontAwesomeIcon);
};
