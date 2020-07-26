import React from 'react'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const movieGenres = [{"id":28,"name":"Action"},
{"id":12,"name":"Adventure"},
{"id":16,"name":"Animation"},
{"id":35,"name":"Comedy"},
{"id":80,"name":"Crime"},
{"id":99,"name":"Documentary"},
{"id":18,"name":"Drama"},
{"id":10751,"name":"Family"},
{"id":14,"name":"Fantasy"},
{"id":36,"name" :"History"},
{"id":27,"name":"Horror"},
{"id":10402,"name":"Music"},
{"id":9648,"name":"Mystery"},
{"id":10749,"name":"Romance"},
{"id":878,"name":"Science Fiction"},
{"id":10770,"name":"TV Movie"},
{"id":53,"name":"Thriller"},
{"id":10752,"name":"War"},
{"id":37,"name":"Western"}]

function countGenre (genreArray,i){ 
    return <Badge variant="success">{genreArray[i]}</Badge>
}

export default function MovieCard(props) {
    let item = props.movie
    let genres = item.genre_ids
    let genreArray = []
    let date = item.release_date
    for (let i = 0;i < movieGenres.length;i++){
        let j = 0
        while (j<genres.length){
            if (genres[j]===movieGenres[i].id){
                genreArray.push(movieGenres[i].name)
                j++
            }else{
                j++
            }
        } 
    }

    for (let i = 0;i<genreArray.length;i++){
        genreArray[i]=countGenre(genreArray,i)}
    return (
        <div>
            <Card style={{ width: '18rem',margin: '5px' }}>
            <div class = "container">
            <Card.Img class = "image" variant="top" src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`} />
            <div class ="overlay">
                <div class = "text">{item.overview}</div>
            </div>
            </div>
            <Card.Body>
            {genreArray}
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{date}</Card.Text>
            <Card.Text>Rating: {Math.floor(item.popularity)}</Card.Text>
            </Card.Body>
            </Card>
        </div>
    )
}
