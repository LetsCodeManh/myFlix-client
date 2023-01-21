import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import MainView from "./components/MainView/MainView";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainView />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
