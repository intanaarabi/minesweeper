import { MdOutlineRestartAlt } from "react-icons/md";



function Restart({onClick}) {
    return (
        <div onClick={onClick} className="rounded-md bg-purple-200 text-[#ECE2F2] flex p-1 items-center">
            <MdOutlineRestartAlt size={35} />
        </div>
    )
}

export default Restart
