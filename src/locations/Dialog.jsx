import React, { useState, useEffect } from 'react';
import { Paragraph, EntityList, Spinner } from '@contentful/f36-components';
import { useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';
import credential from '../credential'

const Dialog = () => {
  const sdk = useSDK();
  useAutoResizer();

  const [movies, setMovies] = useState([]);

  const fetchMovie = async (movieName) => {
    const API_KEY = credential.API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`);
    const results = await response.json();
    setMovies(await results.results);
  }

  useEffect(()=> {
    fetchMovie(sdk.parameters.invocation.movieName);
  },[])

  if(!movies) {
    return <Spinner />
  }

  return (
    <EntityList>
      {
        movies.map((movie)=>(
          <EntityList.Item
          key={movie.original_title}
            title={movie.original_title}
            description={movie.overview}
            thumbnailUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            onClick={()=>{
              sdk.close({movie})
            }}
          />
        ))
      }
    </EntityList>
  );
};

export default Dialog;
