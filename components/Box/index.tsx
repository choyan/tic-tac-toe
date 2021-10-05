interface Props {
  index: number;
  value: string;
  handleMove(index: number): void;
}

const Box = ({ index, value, handleMove }: Props) => {
  return (
    <button
      className="col-span-1 flex items-center justify-center text-6xl font-bold h-40 w-[200px] border-8 border-green-400 flex"
      onClick={() => handleMove(index)}
    >
      {value}
    </button>
  );
};
export default Box;
