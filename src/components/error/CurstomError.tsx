import errorIcon from "../../assets/icons/warning.png";

type ErrorProps = {
  error: string;
};

const CustomError = ({ error }: ErrorProps) => {
  return (
    <div className="w-full p-24 flex flex-col items-center">
      <img className="w-20 mb-4" src={errorIcon} alt="Error" />
      <p className="text-2xl text-red-600">{error}</p>
    </div>
  );
};

export default CustomError;
