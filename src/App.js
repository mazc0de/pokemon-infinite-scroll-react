import { useEffect, useState } from "react";
import axios from "axios";

import PokemonCard from "./Components/PokemonCard/PokemonCard";
import Loading from "./Components/Loading/Loading";

import { ReactComponent as PokemonLogo } from "./Assets/pokemon-logo.svg";

const App = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = `https://pokeapi.co/api/v2/pokemon/`;

    const fetchPokemonDetail = async (url) => {
        const response = await axios.get(url);

        // console.log(response);
        const { id, name, sprites, types } = response.data;
        return { id, name, img: sprites.front_default, type: types[0].type.name };
    };
    const fetchAllPokemon = async () => {
        try {
            const response = await axios.get(API_URL);
            // console.log(response);
            const pokemonResults = response.data.results;

            const pokemonDetail = pokemonResults.map((pokemon) => fetchPokemonDetail(pokemon.url));
            await Promise.all(pokemonDetail).then((res) => {
                setPokemonData([...pokemonData, ...res]);
            });
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    // console.log(pokemonData);

    useEffect(() => {
        fetchAllPokemon();
    }, []);
    return (
        <>
            <div className="w-full min-h-min flex justify-center items-center pt-10">
                <PokemonLogo className="w-96 h-20" />
                {/* <Loading /> */}
            </div>
            <div className="w-full min-h-screen p-10 flex justify-center items-center flex-wrap gap-5">
                {loading && <Loading />}
                {!loading &&
                    pokemonData.map(({ id, name, img, type }) => {
                        return <PokemonCard key={id} name={name} img={img} type={type} />;
                    })}
                {/* <Loading /> */}
            </div>
        </>
    );
};

export default App;
