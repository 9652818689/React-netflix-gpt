import { useDispatch } from "react-redux";
import { Movie_url, options } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch()

  const moviesList = async () => {



    let data = await fetch(Movie_url, options)
    const json = await data.json();
    console.log(json.results);
    dispatch(addNowPlayingMovies(json.results))
  }

  useEffect(() => {
    moviesList();
  }, [])
}

export default useNowPlayingMovies;