import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { options } from "../utils/constants";

const useMovieTrailer = (movieId)=>{
    const dispatch = useDispatch();
    const getMovieVideos = async()=>{
        let data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US',options)
        let json = await data.json();
        // console.log(json.results[33]);
        const filterData = json.results.filter(video => video.type == 'Trailer')
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer))
      }
      useEffect(()=>{
        getMovieVideos();
      },[])
}

export default useMovieTrailer;