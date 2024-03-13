import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import Loader from './Loader';
import { format } from 'date-fns';

const HistoryTransaction = () => {
  const { historyTransaction } = useContext(FinanceContext);

  if (!historyTransaction) {
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );
  }

  if (historyTransaction.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <h2 className="text-center text-2xl">You not hame transaction</h2>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="font-bold text-center text-2xl">
        Your history transaction
      </h2>

      <div className="flex flex-col gap-3 mt-5 pb-5">
        {historyTransaction.map((item) => (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 bg-bg2 gap-2 px-4 py-6 rounded-xl shadow-xl"
            key={item.id}
          >
            <div>
              <div className="flex gap-2">
                <h3>ETH amount: </h3>
                <p>{item.amountETH}</p>
              </div>

              <div className="flex gap-2">
                <h3>USDT amount: </h3>
                <p>{item.amountUSDT}</p>
              </div>
            </div>

            <div>
              <div className="flex gap-2">
                <p>Transaction type:</p>
                <p>{item.type}</p>
              </div>

              <div className="flex gap-2">
                <p>Data:</p>
                <p>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTransaction;
