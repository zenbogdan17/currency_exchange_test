import axios from 'axios';
import FormToTransfer from './components/FormToTransfer';
import Header from './components/Header';
import HistoryTransaction from './components/HistoryTransaction';
import ShowPrice from './components/ShowPrice';

const App = () => {
  axios.defaults.baseURL = 'https://65f17595034bdbecc762af0f.mockapi.io/';

  return (
    <>
      <Header />
      <div className="mx-auto w-[70vw]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-3 lg:gap-4 pt-44">
          <ShowPrice />
          <FormToTransfer />
        </div>

        <HistoryTransaction />
      </div>
    </>
  );
};

export default App;
