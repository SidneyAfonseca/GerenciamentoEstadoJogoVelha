
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Game from "./components/Game";
import "bootstrap/dist/css/bootstrap.min.css";
import { gameReducer } from "./redux/reducers";

const store = createStore(gameReducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
);
