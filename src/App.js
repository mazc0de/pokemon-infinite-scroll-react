import { useCallback, useEffect, useRef, useState, useContext } from "react";
import axios from "axios";

import PokemonCard from "./Components/PokemonCard/PokemonCard";
import Loading from "./Components/Loading/Loading";
import Modal from "./Components/Modal/Modal";

import { ReactComponent as PokemonLogo } from "./Assets/pokemon-logo.svg";
import { AppContext } from "./Context/AppContext";

const App = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);

    const { modalShow, setModalShow, detailPokemonData, setDetailPokemonData } = useContext(AppContext);

    const observer = useRef();
    const lastPokemonRef = useCallback(
        (node) => {
            if (loading) {
                return;
            }
            if (observer.current) {
                observer.current.disconnect();
            }
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && nextPage) {
                    fetchAllPokemon(nextPage);
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, nextPage, pokemonData]
    );

    const fetchPokemonData = async (url) => {
        const response = await axios.get(url);
        setDetailPokemonData(response);
        const { id, name, sprites, types } = response.data;
        return { id, name, img: sprites.front_default, type: types[0].type.name };
    };

    const fetchAllPokemon = useCallback(
        async (API_URL) => {
            setLoading(true);
            try {
                const response = await axios.get(API_URL);
                // console.log(response);
                const pokemonResults = response.data.results;
                const { next } = response.data;
                if (next) {
                    setNextPage(next);
                }

                const pokemonDetail = pokemonResults.map(async (pokemon) => {
                    return await fetchPokemonData(pokemon.url);
                });

                await Promise.all(pokemonDetail).then((res) => {
                    setPokemonData([...pokemonData, ...res]);
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        [nextPage, pokemonData]
    );

    useEffect(() => {
        const API_URL = `https://pokeapi.co/api/v2/pokemon/`;
        fetchAllPokemon(API_URL);
    }, []);

    const fetchPokemonDetail = async (name) => {
        setModalShow(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setDetailPokemonData(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full min-h-min flex  justify-center items-center pt-10">
                <PokemonLogo className="w-96 h-20" />
                {/* <Loading /> */}
            </div>
            <div className="w-full min-h-screen p-10 flex justify-center items-center flex-wrap gap-5">
                <Modal />
                {pokemonData.map(({ id, name, img, type }, index) => {
                    return index === pokemonData.length - 1 ? (
                        <div key={index} ref={lastPokemonRef}>
                            <PokemonCard id={id} name={name} img={img} type={type} />
                        </div>
                    ) : (
                        <div
                            key={index}
                            onClick={() => {
                                fetchPokemonDetail(name);
                            }}
                        >
                            <PokemonCard id={id} name={name} img={img} type={type} />
                        </div>
                    );
                })}
            </div>
            <div className="w-full flex justify-center items-center ">{loading && <Loading />}</div>
        </>
    );
};

export default App;
