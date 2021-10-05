import { useEffect } from "react";
interface Props {
  index: number;
  value: string;
  handleMove(index: number): void;
}
const Box = (props: Props) => {
  const { index, value, handleMove } = props;
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <button
      className="col-span-1 h-40 w-[200px] border-8 border-green-400 flex"
      onClick={() => handleMove(index)}
    >
      {value}
    </button>
  );
};
export default Box;
