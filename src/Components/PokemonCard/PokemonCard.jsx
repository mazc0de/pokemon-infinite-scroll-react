import { colors } from "../../Utils/colorsPokemonTypes";
const PokemonCard = ({ id, name, img, type }) => {
    console.log({ type });
    return (
        <>
            <div className="w-96 h-32 bg-cyan-100 rounded-md flex items-center">
                <div className="w-1/4 bg-white m-4 rounded-full">
                    <img src={`${img}`} alt={`${name}`} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-poppins uppercase font-bold">{name}</p>
                    <p className="font-poppins">
                        <span class={`text-black text-sm font-semibold mr-2 px-2.5 py-0.5 rounded capitalize`} style={{ backgroundColor: colors[type] }}>
                            {type}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default PokemonCard;
