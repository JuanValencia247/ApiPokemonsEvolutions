import { Button } from "./components/Button";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import "./sass/App.scss";
import { useState } from "react";
import { Card } from "./components/Card";
import axios from "axios";
import { useEffect } from "react";

export const App = () => {
  const url = "https://pokeapi.co/api/v2/evolution-chain";
  const [pokemon, setPokemon] = useState(1);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
  const [cargar, setCargar] = useState(true)

  useEffect(() => {
    mostrarPokemon(pokemon);
  }, [pokemon]);

  const mostrarPokemon = async (id) => {
      const res = await axios.get(`${url}/${id}`);

    let pokemonEvolutionArray = [];

    let pokemonLv1 = res.data.chain.species.name;
    let pokemonLv1Img = await mostrarPokemonImg(pokemonLv1);
    pokemonEvolutionArray.push([pokemonLv1, pokemonLv1Img]);

    if (res.data.chain.evolves_to.length !== 0) {
      let pokemonLv2 = res.data.chain.evolves_to[0].species.name;
      let pokemonLv2Img = await mostrarPokemonImg(pokemonLv2);
      pokemonEvolutionArray.push([pokemonLv2, pokemonLv2Img]);

      if (res.data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonLv3 =
          res.data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLv3Img = await mostrarPokemonImg(pokemonLv3);
        pokemonEvolutionArray.push([pokemonLv3, pokemonLv3Img]);
      }
    }
    setPokemonEvolutions(pokemonEvolutionArray);
    setCargar(false)
  };

  const url2 = "https://pokeapi.co/api/v2/pokemon";
  const mostrarPokemonImg = async (name) => {
    const res = await axios.get(`${url2}/${name}`);
    return res.data.sprites.other["official-artwork"].front_default;
  };

  const previous = () => {
    if (pokemon > 1) {
      setPokemon(pokemon - 1);
    }
  };

  const next = () => {
    setPokemon(pokemon + 1);
  };
  //  
  return (
    <div className="app">
      <h1>Pokemon  Evolutions</h1>
      {
            cargar ? (
              <div className="articulos__container-cargar">
                <div className="lds-hourglass"></div>
              </div>
            ) : (
              <>
      <div className="container-card">

              

        {pokemonEvolutions.map((poke) => (
          <Card key={poke[0]} name={poke[0]} img={poke[1]} />
        ))}

      </div>
      <div className="container-buttons">
        <Button icon={<TiChevronLeftOutline />} handleClick={previous} />
        <Button icon={<TiChevronRightOutline />} handleClick={next} />
      </div>
      </>
            )}
    </div>
  );
};
