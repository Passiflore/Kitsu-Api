import { useState } from 'react'
import  '../styles/Favorite.scss'
import { Link } from 'react-router-dom'
import { useQueries } from 'react-query';
import axios from 'axios';

function Favorite(data) {

  const KitsuApi = "https://kitsu.io/api/edge/anime";

  function getFavTable() {
      return JSON.parse(localStorage.getItem('favTable')) || [];
  }
    
  const [favTable, setFavTable] = useState(getFavTable());

  const [animesList, setAnimesList] = useState([]);

  const urls = favTable.map((id) => (`https://kitsu.io/api/edge/anime/${id}`))

  const animeQueries = useQueries(urls.map((url) => ({
    queryKey: ["anime", url],
    queryFn: async () => {
      const res = await axios.get(url)
      const data = res.data.data
      setAnimesList(animesList => ([...animesList, {
        id: data.id,
        posterImg: data.attributes?.posterImage.medium,
        canonicalTitle: data.attributes?.canonicalTitle
      }]))
      return res.data
    }
  })))

  return (
    <div className="favoritePage">
      <header>
        <div className="favoritePageHeader">
          <h3>Mes Favoris</h3>
          <Link to='/'>
              <button className="bnt backButton">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 13L1 7M1 7L7 1M1 7H13C14.5913 7 16.1174 7.63214 17.2426 8.75736C18.3679 9.88258 19 11.4087 19 13C19 14.5913 18.3679 16.1174 17.2426 17.2426C16.1174 18.3679 14.5913 19 13 19H10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      Retourner au catalogue
              </button>
          </Link>
        </div>
        <div className='animeList' >
          {animesList.map((anime) => {
            return (
              <Link 
                to={`/${anime.id}`}
                  state = {{
                  animeId: anime.id
                }}>
                      <div key={anime.id} className='animeListImg'>
                        <img
                          src={anime.posterImg}
                          alt={anime.canonicalTitle}
                        />
                      </div>
                </Link>
            )
          })}
              {/* {animesList.map((anime) => (
              
              ))} */}
        </div>
      </header>
    </div>
  );
  }
    

export default Favorite