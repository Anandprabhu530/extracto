const MainContent = () => {
  return (
    <div className="text-white flex flex-col flex-grow items-center justify-center w-full">
      <div className="lg:text-5xl font-semibold text-2xl mt-10 lg:mt-0 md:mt-0">
        Extract your text
      </div>
      <div className="lg:w-[800px] text-center py-10 lg:text-xl px-4 text-lg md:text-xl">
        Quickly extract text from photos, handwritten notes, and screenshots by
        using this image to text converter to convert images.
      </div>
      <div className="lg:w-[600px] md:w-[600px] w-[300px] h-[150px] lg:h-[200px] md:h-[200px] maincontent border border-dashed border-neutral-500 rounded-xl flex items-center justify-center text-xl cursor-pointer">
        Upload Image Here
      </div>
    </div>
  );
};

export default MainContent;
