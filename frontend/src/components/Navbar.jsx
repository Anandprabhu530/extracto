const Navbar = () => {
  return (
    <div className="p-4 border-b border-neutral-300 w-full">
      <div className="flex items-center justify-between font-sans px-8">
        <div className="tracking-wide font-bold text-3xl">EXTRACTO</div>
        <a
          href="https://github.com/Anandprabhu530/extracto"
          target="__blank"
          className="p-2 border border-neutral-400 rounded-lg"
        >
          Give a Star
        </a>
      </div>
    </div>
  );
};

export default Navbar;
