import React from 'react'
import Videobackground from './Videobackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux';

const MainContainer = () => {
    const movies = useSelector((store)=>store.movies?.nowPlayingMovies);
    if(!movies) return;
    const mainMovie = movies[0];
    console.log(mainMovie);
    const {original_title,overview,id} = mainMovie;

  return (
    <div>
        <VideoTitle title={original_title} overview={overview}/>
      <Videobackground movieId={id}/>
      
    </div>
  )
}

export default MainContainer
