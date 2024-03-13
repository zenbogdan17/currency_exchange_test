import { useContext, useEffect, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import Loader from './Loader';

const ShowPrice = () => {
  const { sellPrice, buyPrice } = useContext(FinanceContext);

  const [currentSellPrice, setCurrentSellPrice] = useState(sellPrice);
  const [currentBuyPrice, setCurrentBuyPrice] = useState(buyPrice);

  useEffect(() => {
    setCurrentBuyPrice(buyPrice);
  }, [buyPrice]);

  useEffect(() => {
    setCurrentSellPrice(sellPrice);
  }, [sellPrice]);

  return (
    <div className="col-span-2 bg-bg2 p-6 rounded-lg shadow-md h-[180px]">
      <h2 className="text-xl mb-6 font-semibold">
        Current Exchange Rate for USDT/ETH
      </h2>

      <div className="flex justify-between">
        {' '}
        <div>
          {currentBuyPrice ? (
            <>
              <p className="text-lg font-semibold">Buy Price:</p>
              <p className="text-xl">{currentBuyPrice}</p>
            </>
          ) : (
            <Loader />
          )}
        </div>
        <div>
          {currentSellPrice ? (
            <>
              <p className="text-lg font-semibold">Sell Price:</p>
              <p className="text-xl">{currentSellPrice}</p>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPrice;
