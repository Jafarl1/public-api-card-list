import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SyncLoader color="#082f49" />
    </div>
  );
};

export default Loader;
