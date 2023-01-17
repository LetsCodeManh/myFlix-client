import MainView from "./components/MainView/Mainview";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div className="my-flix">
      <NavBar/>
      <MainView />
    </div>
  );
};

export default App;
