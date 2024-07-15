
import { FaBomb } from "react-icons/fa";

function Tile({mine,visible,count}) {
    // Is Visible? Show tile block : hidden block
    // Tile block? Show number of adj mines : Show mine

    function getTileState(visible) {
        return visible ?  "bg-purple-100" : "bg-purple-200";
    }


    return (
        <>
            <div className={`w-10 h-10 rounded-md ${getTileState(visible)}`}>
                { visible && (
                    <div className="h-full flex justify-center items-center">
                        {
                        mine ? (
                            <FaBomb size={20} />
                            ) : (
                                count > 0 ? `${count}` : ''
                            )
                        }
                    </div>

                    )
                }
            </div>
        </>
    )
}

export default Tile
