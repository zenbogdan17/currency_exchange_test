const Header = () => {
  return (
    <div className="fixed top-0 w-full flex gap-10 p-10 items-center justify-center bg-[#131318] shadow-2xl">
      <h1 className="text-2xl font-bold ">The simplest USDT/ETH exchanger</h1>

      <div className="flex items-center gap-4">
        <img
          className="w-10"
          src="https://cryptologos.cc/logos/tether-usdt-logo.png"
          alt="USDT"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>

        <img
          className="w-10"
          src="https://images.youngplatform.com/coins/eth_light_3.png"
          alt="ETH"
        />
      </div>
    </div>
  );
};

export default Header;
