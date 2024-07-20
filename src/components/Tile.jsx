
import { FaBomb } from "react-icons/fa";
import { PiFlagPennantFill } from "react-icons/pi";

function Tile({mine,visible,count,flag,onClick,onRightClick}) {
    // Is Visible? Show tile block : hidden block
    // Tile block? Show number of adj mines : Show mine

    function getTileState(visible) {
        return visible ?  "bg-purple-100" : "bg-purple-200";
    }

    function getFontColor(count) {
        switch (count) {
            case 1: {
                return "text-green"
            }
            case 2: {
                return "text-pink"
            }
            case 3: {
                return "text-purple-300"
            }
            case 4: {
                return "text-orange-100"
            }
        }

    }

    const handleContextMenu = (event) => {
        event.preventDefault();
        if (onRightClick) {
            onRightClick();
        }
    };

    return (
        <>
            <div onContextMenu={handleContextMenu} onClick={onClick} className={`w-10 h-10 rounded-md ${getTileState(visible)}`}>
                {
                    <div className="h-full flex justify-center items-center text-[24px] font-alata">
                       { visible && (
                        mine ? (
                            <FaBomb size={20} className="text-red" />
                            ) : (
                                <div className={` ${getFontColor(count)}`}> {count > 0 ? `${count}` : ''} </div>
                            )
                         )
                        }
                        { !visible && flag && (
                            <PiFlagPennantFill  size={20} className="text-red" />
                        )}
                    </div>
                }
             
            </div>
        </>
    )
}

export default Tile
