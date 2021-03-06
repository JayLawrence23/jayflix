import { useEffect, useState } from 'react';

import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
// bde73581

const API_URL = 'https://www.omdbapi.com?apikey=bde73581';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    },[]);
    
    return(
        <div className='app'>
            <h1>Jayflix</h1>
            
            <div className='search'>
                <input 
                    type="text" 
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }} />
                <img 
                    src={SearchIcon} 
                    alt="search"
                    onClick={() => {
                        searchMovies(searchTerm)
                    }} />
            </div>

            {movies?.length > 0
                ? (
                <div className='container'>
                    { movies.map((movie) => (
                        <MovieCard movies={movie}/>
                    ))}
                </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
};

export default App;