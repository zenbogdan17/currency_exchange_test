import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#f7fe19"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass="-mt-10"
      />
    </div>
  );
};

export default Loader;
