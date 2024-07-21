import ReactDOM from 'react-dom';

function FailedModal({isOpen, onClose}) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-950 bg-opacity-50 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <div className="relative font-baloo text-white px-40 py-4 flex justify-center items-center transform rounded-lg bg-blue-200 border-[18px] border-blue-100 shadow-2xl transition-all h-40 ">
                   <div className="absolute left-0 top-[-45px]">
                        <div className="relative px-2">
                            <img src="/failed-banner.svg" />
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[40px] ">YOU LOSE</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2"> 
                         <img src="/timer.svg" className="w-[60px]" />
                        <p className="text-4xl tracking-wide ">---</p>
                    </div>
                    <button onClick={onClose} className="absolute bg-orange-200 bottom-[-40px] text-2xl px-6 py-2 rounded-lg">PLAY AGAIN</button>
            </div>
            </div>
        </div>
        </div>,
            document.body
      );
}

export default FailedModal
