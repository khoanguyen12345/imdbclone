import React,{useEffect,useState} from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import MovieBoard from './components/MovieBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function App(url) {
 
  let [movieList,setMovieList] = useState(null)
  let [page,setPage] = useState(1)
  let [totalPages,setTotalPages] = useState(30)
  let [urlState,setUrlState] = useState("movie/now_playing")
  let [title,setSearchTitle] = useState(null)
const callMovie = async()=>{
  let url = `https://api.themoviedb.org/3/${urlState}?api_key=7df18e01feebb6c6eec04a10e111222f&language=en-US&page=${page}${title}`
  console.log(url)
  let result = await fetch (url)
  let data = await result.json()
  console.log("DATA", data)
  setTotalPages(data.totalpages)
  setMovieList(data.results)
}
useEffect(()=>{
  callMovie()
},[urlState,page,title])

  if (movieList==null){
    return( 
      <h2>Loading...</h2>
    )
  }

return (
    <div>
          
           <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Cool Movie Website</Navbar.Brand>
             <Nav className="mr-auto">
            <Nav.Link onClick = {()=>{setUrlState("movie/now_playing");setSearchTitle(null);callMovie();}}>Now Playing</Nav.Link>
             <Nav.Link onClick = {()=>{setUrlState("movie/popular");setSearchTitle(null);callMovie();}}>Popular</Nav.Link>
             <Nav.Link onClick = {()=>{setUrlState("movie/top_rated");setSearchTitle(null);callMovie();}}>Top Rated</Nav.Link>
             <Nav.Link onClick = {()=>{setUrlState("movie/upcoming");setSearchTitle(null);callMovie();}}>Upcoming</Nav.Link>
             </Nav>
             <Form inline>
            <FormControl onChange={e => {setUrlState(`search/movie`);setSearchTitle(`&query=${e.target.value}`)}} type="text" placeholder="Search" className="mr-sm-2" />
             <Button onClick ={()=>{callMovie();}} variant="outline-info">Search</Button>
             </Form>
             </Navbar>
          <div>
          <MovieBoard movieList = {movieList}/>
          </div>
          <div className = "footer">
          <Button className = "seeMoreButton" onClick = {()=> {setPage(page+1);callMovie();if(page===totalPages){setPage(1)};}} variant="primary" size="lg" block>
            See More</Button>
          </div>
    </div>
  );
}
export default App;
