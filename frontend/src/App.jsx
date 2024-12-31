import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="h-screen font-sans lg:w-screen">
      <Navbar className="navbar z-10" />
      <div className="relative flex flex-col justify-center items-center w-full">
        <MainContent className="maincontent z-10" />
      </div>
    </div>
  );
};

export default App;
