import React from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'

export const themeContext = React.createContext()
export default function Layout() {
    const [watchlist, setWatchlist] = React.useState([])
    function addToWatchlist(data) {
        if (!watchlist.some(movie => movie[0].imdbID === data[0].imdbID)) {
            setWatchlist(oldValue => [...oldValue, data]);
        } else {
            // Add the movie to the watchlist if it doesn't exist
            setWatchlist(oldValue => [...oldValue, data]);
        }
    }
        return (
            <themeContext.Provider value={{ addToWatchlist, watchlist, setWatchlist }}>
               <nav><NavLink activeClassName='active' className='link home' to={'/'}><h3>Home screen</h3></NavLink>
                <NavLink activeClassName='active' className='link' to={'/watchlist'}><h3>Watchlist</h3></NavLink></nav>
                <Outlet />
            </themeContext.Provider>)
    
}