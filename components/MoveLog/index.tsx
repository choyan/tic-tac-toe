import { useSelector } from "react-redux";
import { RootState } from "store";

export default function MoveLog() {
  const moveLog = useSelector((state: RootState) => state.game.moveLog);
  return (
      <>
      <h2 className='w-[600px] mt-6 font-semibold text-lg'>Match Log</h2>
        <ul
        role="list"
        className="mt-2 w-[600px] border border-gray-200 rounded-md divide-y divide-gray-200"
        >
        {moveLog.map((logItem, index) => (
            <li
            className=" pl-3 pr-4 py-3 flex items-center justify-between text-sm"
            key={index}
            >
            <div className="w-0 flex-1 flex items-center">
                <span className="ml-2 flex-1 w-0 truncate">
                {logItem.playerName}
                </span>
            </div>
            <div> => </div>
            <div className="ml-4 flex-shrink-0">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                {logItem.location + 1}
                </span>
            </div>
            </li>
        ))}
        </ul>
    </>
  );
}
