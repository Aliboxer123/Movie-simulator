import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Movie() {
    const [searchParam, setSearchParams] = useSearchParams()
    const [movieStore, setMovieStore] = React.useState([])
    const [searchResult, setSearchResult] = React.useState('')
    const [page, setPage] = React.useState(1)
    const queryCopy = searchParam.toString().split('type=')[1]
    
    let [defaultTitles, setDefaultTitles] = React.useState(null)
    React.useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=5780420&s=${defaultTitles || queryCopy ? queryCopy : 'nemo'}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setMovieStore(data.Search)
            })
        .catch(err => console.log(err))
    }, [defaultTitles, page])
    
    const movieElem = movieStore ? movieStore.map(movie => {
        if (movie.Poster == 'N/A') {
            return
        }
         return <div key={movie.imdbID} className='movie-container'>
             <h1 className='movie-box'>{movie.Title}</h1>
                <span>{movie.Released}</span>
                <span>{movie.Runtime}</span>
                <Link to={movie.imdbID} state={searchParam.toString()}><img alt='movie-poster' src={movie.Poster} /></Link>
             <p>{movie.Plot}</p>
            </div>
        
    }): <h1>Connecting...</h1>
    function search(e) {
        const { value } = e.target
        setSearchResult(value)
    }
    function SubmitSearch(e) {
            //  e.stopPropagation()
            e.preventDefault()
        setDefaultTitles(e.target[0].value)
        setSearchParams({ type: searchResult })

    }
    const loadingStyle = {
        backgroundColor: 'red',
        height: '100%',
        width: page + '0%'
    }
    return <div><form onSubmit={(e) => SubmitSearch(e)}><label htmlFor='search'>Search for the movie</label>
        <input id='search' type='text' name='search' onChange={(e) => search(e)} />
        <button>Search</button>
        <div className='outer-movie'>{movieElem}</div></form>
        <div className='next-footer'>
        {page != 10 ? <a href='#' onClick={() => setPage(oldValue => oldValue + 1)}>Next page</a> : ''}
        {page > 1 ? <a href='#' onClick={() => setPage(oldValue => oldValue - 1)}>Go back</a> : ''}</div>
        <div className='loading'>
         <span style={loadingStyle}></span>
        </div>
    </div>
}