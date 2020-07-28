import React,{useEffect,useState} from 'react'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from '@u-wave/react-youtube';

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
    let date = item.release_date
    let genreArray = []
    let movieId= item.id;
    let [videoId,setVideoId] = useState("oHg5SJYRHA0");
    let [modalOpen,setModalOpen] = useState(false)
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    
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

    useEffect(()=>{
        const callVideo = async()=>{
            let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7df18e01feebb6c6eec04a10e111222f&language=en-US`
            console.log(url)    
            let result = await fetch (url)
            let data = await result.json()
            if (data.results.length > 0){
            setVideoId (data.results[0].key)
            }
            console.log(videoId)
        }
        callVideo()
      },[movieId,videoId])

    for (let i = 0;i<genreArray.length;i++){
        genreArray[i]=countGenre(genreArray,i)
    }

    if (modalOpen === true){
        return (
        <div>
        <Modal show={modalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{item.title} Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <YouTube video={videoId}
        autoplay/>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick = {()=>setModalOpen(false)} variant="secondary" onClick={handleClose}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
            <Card style={{ width: '18rem',margin: '5px' }}>
            <div className = "container">
            <Card.Img className = "image" variant="top" src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`} />
            <div className ="overlay">
                <div className = "text">{item.overview}</div>
            </div>
            </div>
            <Card.Body>
            {genreArray}
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{date}</Card.Text>
            <Card.Text>Rating: {Math.floor(item.vote_average*10)}</Card.Text>
            </Card.Body>
            <Button variant="secondary" size="lg" block onClick={handleShow}>Trailer</Button>
            </Card>
        </div>
    )
    }else {
        return (
                <div>
                <Card style={{ width: '18rem',margin: '5px' }}>
                <div className = "container">
                <Card.Img className = "image" variant="top" src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`} />
                <div className ="overlay">
                    <div className = "text">{item.overview}</div>
                </div>
                </div>
                <Card.Body>
                {genreArray}
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{date}</Card.Text>
                <Card.Text>Rating: {Math.floor(item.vote_average*10)}</Card.Text>
                </Card.Body>
                <Button variant="secondary" size="lg" block onClick={handleShow}>Trailer</Button>
                </Card>
            </div>
        )
    }
}
