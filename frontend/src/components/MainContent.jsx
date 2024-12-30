const MainContent = () => {
  return (
    <div className="text-white flex flex-col flex-grow items-center justify-center w-full">
      <div className="text-5xl font-semibold">Extract your text</div>
      <div className="w-[800px] text-center py-10 text-xl">
        Quickly extract text from photos, handwritten notes, and screenshots by
        using this image to text converter to convert images.
      </div>
      <div className="w-[600px] h-[200px] maincontent border border-dashed border-neutral-500 rounded-xl flex items-center justify-center text-xl cursor-pointer">
        Upload Image Here
      </div>
    </div>
  );
};

export default MainContent;
