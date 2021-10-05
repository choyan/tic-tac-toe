import { useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { setPlayers, setCurrentMove } from "store/game";
import { RootState } from "store";

const Home: NextPage = () => {
  const [players] = useSelector((state: RootState) => [state.game.players]);
  const dispatch = useDispatch();
  const router = useRouter();

  function savePlayers(e) {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) {
      alert("We need two players");
    } else {
      const newPlayers = [e.target[0].value, e.target[1].value];
      dispatch(setPlayers(newPlayers));
      dispatch(setCurrentMove(e.target[0].value));
      router.push("/game");
    }
  }

  useEffect(() => {
    if (players.length > 0) {
      router.push("/game");
    }
  }, [players]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tic-Tac-Toe
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={savePlayers}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="player-1" className="sr-only">
                Player 1
              </label>
              <input
                id="player-1"
                name="player-1"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Player 1"
              />
            </div>
            <div>
              <label htmlFor="player-2" className="sr-only">
                Player 2
              </label>
              <input
                id="player-2"
                name="player-2"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Player 2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Start
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
