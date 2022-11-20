import { useContext } from "react";

import { colors } from "../../Utils/colorsPokemonTypes";

import { ReactComponent as CloseButton } from "../../Assets/close.svg";

import "./Modal.css";

import { AppContext } from "../../Context/AppContext";

const Modal = () => {
    const { modalShow, setModalShow, detailPokemonData } = useContext(AppContext);

    if (!modalShow) {
        return null;
    }

    const closeModal = () => setModalShow(false);

    const RowParagraph = ({ title, body }) => {
        return (
            <p>
                {title} : <span className="font-semibold">{body}</span>
            </p>
        );
    };

    const stats = [];
    for (let i = 0; i < 6; i++) {
        stats.push(<RowParagraph key={i} title={detailPokemonData?.data?.stats[i]?.stat?.name} body={detailPokemonData?.data?.stats[i]?.base_stat} />);
    }

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header flex justify-between">
                        <div className="flex">
                            <div className="w-2/4 m-4 rounded-full" style={{ backgroundColor: colors[detailPokemonData.data.types[0].type.name] }}>
                                <img src={detailPokemonData.data.sprites.front_default} alt="" className="w-40" />
                            </div>
                            <div className="flex">
                                <div className="flex flex-col justify-center gap-1">
                                    <p className="font-poppins font-bold leading-1 text-gray-400">#{detailPokemonData.data.id}</p>
                                    <p className="font-poppins uppercase font-bold">{detailPokemonData?.data?.name}</p>
                                    <p className="font-poppins">
                                        {detailPokemonData?.data?.types.map((item) => {
                                            return (
                                                <span className={`text-black text-sm font-semibold mr-2 px-2.5 py-0.5 rounded capitalize`} style={{ backgroundColor: colors[item.type.name] }}>
                                                    {item.type.name}
                                                </span>
                                            );
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <CloseButton className="w-5 h-5 cursor-pointer" onClick={closeModal} />
                        </div>
                    </div>
                    <div className="modal-body font-poppins flex flex-row gap-10">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h5 className="font-bold text-xl">Profile</h5>
                                <RowParagraph title="Base Exp" body={detailPokemonData?.data?.base_experience} />
                                <RowParagraph title="Weight" body={detailPokemonData?.data?.weight} />
                                <RowParagraph title="Height" body={detailPokemonData?.data?.height} />
                            </div>
                            <div>
                                <h5 className="font-bold text-xl">Stats</h5>
                                {stats}
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold text-xl">Moves</h5>
                            {detailPokemonData?.data?.moves.map((item, index) => {
                                return <p key={index}>{item.move.name}</p>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
