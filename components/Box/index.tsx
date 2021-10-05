import { useSelector } from "react-redux";
import { RootState } from "store";

interface Props {
  index: number;
  value: string;
  handleMove(index: number): void;
}

const Box = ({ index, value, handleMove }: Props) => {
  const finished = useSelector((state: RootState) => state.game.finished);

  return (
    <button
      className="col-span-1 flex items-center justify-center text-6xl font-bold h-40 w-[200px] border-8 border-green-400 flex"
      onClick={() => handleMove(index)}
      disabled={finished}
    >
      {!value && <span className="text-gray-200">{index + 1}</span>}
      {value}
    </button>
  );
};
export default Box;
