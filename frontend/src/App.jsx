import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="h-screen font-sans w-screen">
      <Navbar className="navbar z-10" />
      <div className="relative flex flex-col justify-center items-center w-full">
        <div className="absolute inset-0 bg-[url('/src/assets/background.svg')] bg-cover w-[400px] flex items-center justify-center filter blur-[100px] z-0"></div>
        <MainContent className="maincontent z-10 mt-10" />
        <div className="absolute -inset-y-40 top-40 right-10 bg-[url('/src/assets/background.svg')] bg-cover w-[500px] flex items-center justify-center filter blur-[100px] z-0"></div>
      </div>
    </div>
  );
};

export default App;
