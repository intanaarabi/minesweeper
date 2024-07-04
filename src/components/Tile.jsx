

function Tile({mine,visible,count}) {

    function getState(mine) {
        return mine ?  "bg-red-200" : "bg-slate-200";
    }

    return (
        <div className={`w-8 h-8 border-solid border-2 border-slate-300 ${getState(mine)}`}>
            { count > 0 ? count : ''}
        </div>
    )
}

export default Tile
