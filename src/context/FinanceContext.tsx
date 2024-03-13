import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface FinanceContextType {
  buyPrice: null | number;
  sellPrice: null | number;
  historyTransaction: historyTransactionInterface[] | [] | null;
  setHistoryTransaction: React.Dispatch<
    React.SetStateAction<historyTransactionInterface[] | [] | null>
  >;
}

interface FinanceContextProviderProps {
  children: ReactNode;
}

interface historyTransactionInterface {
  createdAt: string;
  amountETH: number;
  amountUSDT: number;
  type: string;
  id: string;
}

export const FinanceContext = createContext<FinanceContextType>({
  buyPrice: null,
  sellPrice: null,
  historyTransaction: null,
  setHistoryTransaction: () => {},
});

export function FinanceContextProvider({
  children,
}: FinanceContextProviderProps) {
  const [buyPrice, setBuyPrice] = useState<null | number>(null);
  const [sellPrice, setSellPrice] = useState<null | number>(null);
  const [historyTransaction, setHistoryTransaction] = useState<
    historyTransactionInterface[] | [] | null
  >(null);

  useEffect(() => {
    axios
      .get('/transactions')
      .then(({ data }) => {
        setHistoryTransaction(data);
      })
      .catch(() => {
        toast.error('Something went wrong', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      });
  }, []);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@depth');

    ws.onopen = () => {
      toast.success('Successfully connected to Binance WebSocket!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      setBuyPrice(parseFloat(message.b));
      setSellPrice(parseFloat(message.a));
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <FinanceContext.Provider
      value={{ buyPrice, sellPrice, historyTransaction, setHistoryTransaction }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
