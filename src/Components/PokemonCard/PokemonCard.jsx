import { colors } from "../../Utils/colorsPokemonTypes";

const PokemonCard = ({ id, name, img, type }) => {
    return (
        <>
            <div className={`w-96 h-32 bg-sky-200 rounded-md flex items-center shadow-sm ease-in-out duration-200 cursor-pointer hover:shadow-lg`}>
                <div className="w-1/4 bg-white m-4 rounded-full">
                    <img src={`${img}`} alt={`${name}`} />
                </div>
                <div className="flex flex-col justify-between gap-1">
                    <p className="font-poppins font-bold leading-1 text-gray-400">#{id}</p>
                    <p className="font-poppins uppercase font-bold">{name}</p>
                    <p className="font-poppins">
                        <span className={`text-black text-sm font-semibold mr-2 px-2.5 py-0.5 rounded capitalize`} style={{ backgroundColor: colors[type] }}>
                            {type}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default PokemonCard;
