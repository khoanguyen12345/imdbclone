import React from 'react'
import MovieCard from './MovieCard'

export default function MovieBoard(props) {
    let movieList = props.movieList;
    return (
        <div>
        <div className = "movieBoard">
            {movieList.map(item=>{return(
                <div><MovieCard movie ={item}></MovieCard></div>
            )})}
        </div>
        </div>
    )
}
