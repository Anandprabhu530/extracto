const Navbar = () => {
  return (
    <div className="w-full pt-4 lg:pt-10 lg:px-10 text-white">
      <div className="navbar lg:p-4 rounded-lg">
        <div className="flex items-center justify-between font-sans px-8">
          <div className="tracking-wide font-bold text-xl lg:text-3xl">
            EXTRACTO
          </div>
          <a
            href="https://github.com/anandprabhu530/extracto"
            target="__blank"
            className="p-2 border border-neutral-400 rounded-lg"
          >
            Give a Star
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
