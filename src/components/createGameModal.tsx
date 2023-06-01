import { createGame } from "../database";

function CreateGameModal({ uid, className, closeModal }) {
  async function handleClick() {
    const nameEl = document.getElementById("createGameName") as HTMLInputElement;
    const gameName = nameEl.value;
    
    if(!gameName) {
      //TODO: Check for if game name already exists
      nameEl.placeholder = "Please enter a game name"
      return
    }

    try {
      await createGame(uid, gameName);
      closeModal();
    }
    catch (err: any) {
      throw new Error(err.message);
    }
    // Clearing the game name value so that if user re-opens modal before page
    // refresh, the field is clear.
    nameEl.value = "";
    closeModal();
  }
  
  return (
    <div className={className}>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Create A New Game
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-pink-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-800 sm:ml-3 sm:w-auto"
                  onClick={handleClick}
                >
                  Create
                </button>
                <input
                  type="text"
                  id="createGameName"
                  placeholder="Game Name"
                  maxLength={60}
                  className="inline-flex w-full justify-center rounded-md bg-white border-black px-3 py-2 mt-2 md:mt-0 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 sm:ml-3 sm:w-auto"
                />
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGameModal;