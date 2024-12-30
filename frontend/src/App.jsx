import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="h-screen font-sans lg:w-screen">
      <Navbar className="navbar z-10" />
      <div className="relative flex flex-col justify-center items-center w-full">
        <div className="hidden lg:flex lg:absolute inset-0 bg-[url('/src/assets/background.svg')] bg-cover w-[400px]  items-center justify-center filter blur-[100px] z-0"></div>
        <MainContent className="maincontent z-10" />
        <div className="flex absolute top-96 -right-10  -inset-y-40 lg:top-40 lg:right-10 md:top-40 md:right-10 bg-[url('/src/assets/background.svg')] bg-cover w-[500px] items-center justify-center filter blur-[100px] z-0"></div>
      </div>
    </div>
  );
};

export default App;
