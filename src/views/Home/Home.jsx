import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import * as act from "../../redux/actions";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const gameOffer = useSelector(state => state.gameOffer);
  const search = useSelector(state => state.search);
  const gamesNewReleases = useSelector(state => state.gamesNewReleases);
  const gamesTopSellers = useSelector(state => state.gamesTopSellers);
  const games = useSelector(state => state.games);
  const [name, setName] = useState("");
  //console.log(games);
  
  useEffect(() => {
    dispatch(act.getGames());
    // dispatch(act.getGamesOffer());
    // dispatch(act.getGamesNewReleases());
    // dispatch(act.getGamesComingSoon());
    // dispatch(act.getGamesTopSellers());
    dispatch(act.clearSearch());
    // dispatch(act.preload());
  }, [dispatch]);


  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleButton = (e) => {
    if (name.trim() !== "") {
      dispatch(act.getByName(name));
      history.push(`/search?name=${encodeURIComponent(name)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButton();
    }
  };

  // Verificar si el array de juegos tiene al menos 14 elementos
  const selectedGames = games.length >= 18 ? games.slice(0, 18) : games;
  const frees = games.filter(game => game.is_free === true);
  const type = games.filter(game => game.type === "demo" || game.type === "dlc");
  const controllerSupport = games.filter(game => game.controller_support === "full");

  console.log(selectedGames)
  return (
    <div className={style.homeContainer}>
      <Carousel />
      <div>

        <div className={style.searchcontainer}>
          <input
            className={style.search}
            placeholder="search..."
            type="text"
            onChange={e => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            className={style.buttonsearch}
            onClick={name.trim() !== "" ? handleButton : undefined}
            icon={faSearchengin}
            size="xl"
          />
        </div>

        <h3 className={style.title}>All Games</h3>
        <CardsContainer gameComingSoon={selectedGames} />
      </div>
      <h3 className={style.title}>Free</h3>
        <CardsContainer gameComingSoon={frees} />
        <h3 className={style.title}>Demos y DLCs</h3>
        <CardsContainer gameComingSoon={type} />
        <h3 className={style.title}>Controllers</h3>
        <CardsContainer gameComingSoon={controllerSupport} />
      {/* <h3 className={style.title}>Top Sells</h3>
      <CardsContainer gameComingSoon={gamesTopSellers} />
      <h3 className={style.title}>Game Offers</h3>
      <CardsContainer gameComingSoon={gameOffer} />
      <h3 className={style.title}>New Releases</h3>
      <CardsContainer gameComingSoon={gamesNewReleases} /> */}
    </div>
  );
};

export default Home;