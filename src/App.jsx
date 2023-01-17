import { BrowserRouter } from "react-router-dom";
import MainView from "./components/MainView/Mainview";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="my-flix">
        <NavBar />
        <MainView />
      </div>
    </BrowserRouter>
  );
};

export default App;
