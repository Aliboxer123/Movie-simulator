import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link, useLocation } from "react-router-dom";
import { themeContext } from "./Layout";
export default function Param() {
    const { addToWatchlist, watchlist, setWatchlist } = React.useContext(themeContext)
    const [movieParam, setMovieParam] = React.useState([])
    const { param } = useParams()
    const location = useLocation()
    const searchParam = location.state ? location.state : ''
    const isAlreadyAdded = watchlist.some(
    (movie) => movie[0].imdbID === movieParam[0]?.imdbID
  );
    function removeFromList() {
        const watchlistCopy = [...watchlist]
        const filtered = watchlistCopy.filter(data => data[0].imdbID !== movieParam[0]?.imdbID)
        setWatchlist(filtered)
    }
        React.useEffect(() => {
            fetch(`http://www.omdbapi.com/?apikey=5780420&i=${param}`)
                .then(res => res.json())
                .then(data => {
                    setMovieParam([data])
                })
        }, [])
    
        return movieParam[0] ? <div>
                <div className="outer-wrapper"><div className="inner-wrapper"><h1>{movieParam[0].Title}</h1>
                    <img alt='movie-poster' src={movieParam[0].Poster} />
                    <div className="release-runtime"><span>Released:{movieParam[0].Released}</span>
                    <span>{movieParam[0].Runtime}</span></div></div>
                    <p className="plot">{movieParam[0].Plot}</p></div>
                
            <div className="footer"><Link className="back" to={'/?' + searchParam}>Go back</Link>
            {!isAlreadyAdded ? <a onClick={() => addToWatchlist(movieParam)}>Add it to watchlist  <FontAwesomeIcon icon={faPlus} /></a> : <a onClick={()=> removeFromList()}>Remove it from watchlist <FontAwesomeIcon className="trash" icon={faTrash} /></a>}</div>
        </div>: <h1>...Loading</h1>
    }