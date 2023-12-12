import React from 'react'
import { themeContext } from './Layout'
import { Link, useSearchParams } from 'react-router-dom'
export default function Watchlist() {
    const [searchParam, setSearchParams] = useSearchParams()
    const { watchlist, setWatchlist } = React.useContext(themeContext)
   
     function removeFromList(id) {
        const watchlistCopy = [...watchlist]
        const filtered = watchlistCopy.filter(data => data[0].imdbID !== id)
         setWatchlist(filtered)
    }
    const movieElem = watchlist ? watchlist.map(movie => {
            return <div key={movie[0].imdbID} className='movie-container'>
                <h1 className='movie-box'>{movie.Title}</h1>
                <Link to={`/${movie[0].imdbID}`} state={searchParam.toString()}><img alt='movie-poster' src={movie[0].Poster} /></Link>
                <span className='released'>Released on {movie[0].Released}</span>
                <span className='runtime'>{movie[0].Runtime}</span>
                <p>{movie.Plot}</p>
                <a className='remove' onClick={()=> removeFromList(movie[0].imdbID)}>Remove from watchlist</a>
            </div>
}) : ''   
    return <div>{watchlist.length > 0 ? <h1>Here's your watchlist:</h1> :
        <span>There's nothing in the watchlist, consider adding to your watchlist from the movies section</span>}
        {movieElem}</div>    
}