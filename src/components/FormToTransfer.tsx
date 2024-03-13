import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const FormToTransfer = () => {
  const [modeTransaction, setModeTransaction] = useState<'sell' | 'buy'>(
    'sell'
  );
  const [amountETH, setAmountETH] = useState(0);
  const [amountUSDT, setAmountUSDT] = useState(0);

  const { sellPrice, buyPrice, setHistoryTransaction } =
    useContext(FinanceContext);

  useEffect(() => {
    let mode = modeTransaction === 'buy' ? buyPrice : sellPrice;

    if (mode) {
      setAmountUSDT(amountETH * mode);
    }
  }, [sellPrice, buyPrice]);

  useEffect(() => {
    let mode = modeTransaction === 'buy' ? buyPrice : sellPrice;

    if (mode) {
      setAmountUSDT(amountETH * mode);
    }
  }, [modeTransaction]);

  const handlerModeOFTransaction = () => {
    if (modeTransaction === 'buy') {
      setModeTransaction('sell');
    } else {
      setModeTransaction('buy');
    }
  };

  const handlerInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    const valueInput = parseFloat(e.target.value);

    if (!valueInput) {
      setAmountETH(0);
      setAmountUSDT(0);
      return;
    }

    let amountETHToUpdate = 0;
    let amountUSDTToUpdate = 0;

    if (modeTransaction === 'sell' && sellPrice) {
      amountETHToUpdate =
        nameInput === 'etn' ? valueInput : valueInput / sellPrice;
      amountUSDTToUpdate =
        nameInput === 'usdt' ? valueInput : valueInput * sellPrice;
    } else if (modeTransaction === 'buy' && buyPrice) {
      amountETHToUpdate =
        nameInput === 'etn' ? valueInput : valueInput / buyPrice;
      amountUSDTToUpdate =
        nameInput === 'usdt' ? valueInput : valueInput * buyPrice;
    }

    setAmountETH(parseFloat(amountETHToUpdate.toFixed(4)));
    setAmountUSDT(parseFloat(amountUSDTToUpdate.toFixed(4)));
  };

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amountETH && !amountUSDT) {
      return toast.error('Fill must not be empty!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

    toast.success('Success transaction', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    const response = await axios.post('transactions', {
      amountETH,
      amountUSDT,
      type: modeTransaction,
    });

    if (response.data) {
      setHistoryTransaction((prev) => {
        if (prev === null) {
          return [response.data];
        } else {
          return [response.data, ...prev];
        }
      });
    }
  };

  return (
    <form
      onSubmit={handlerSubmit}
      className="col-span-3 flex flex-col gap-4 bg-bg2 p-6 rounded-lg shadow-md"
    >
      <label>ETH amount</label>
      <input
        name="etn"
        className="bg-bg1 rounded-md p-2"
        onChange={handlerInputs}
        value={amountETH}
      />

      <label>
        {modeTransaction === 'sell' ? 'You will pay' : 'You will receive'} USDT
      </label>
      <input
        name="usdt"
        className="bg-bg1 rounded-md p-2"
        onChange={handlerInputs}
        value={amountUSDT}
      />

      <div className="flex gap-6">
        <h2 className="text-xl mb-2">You want: </h2>
        <label className="inline-flex items-center mb-5 cursor-pointer">
          {' '}
          <span className="mr-3 text-xl font-medium text-gray-900 dark:text-gray-300">
            sell
          </span>
          <input
            type="checkbox"
            value=""
            onChange={handlerModeOFTransaction}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300">
            buy
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-md py-2 bg-yellow-400 text-2xl text-black font-semibold"
      >
        Transaction
      </button>
    </form>
  );
};

export default FormToTransfer;
