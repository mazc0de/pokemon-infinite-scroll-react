import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [modalShow, setModalShow] = useState(false);
    const [detailPokemonData, setDetailPokemonData] = useState([]);

    const value = {
        modalShow,
        setModalShow,
        detailPokemonData,
        setDetailPokemonData,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
