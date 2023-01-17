import { BrowserRouter } from "react-router-dom";
import MainView from "./components/MainView/Mainview";

const App = () => {
  return (
    <BrowserRouter>
      <MainView />
    </BrowserRouter>
  );
};

export default App;
