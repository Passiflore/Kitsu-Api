import { useEffect, useState } from 'react'
import  '../styles/Details.scss'
import ImgPlaceHolder from "../assets/image3.jpg";
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';



function Details(props) {
    const location = useLocation();
    const [parsedData, setParsedData] = useState({});
    const { id } = useParams();
    let favTable = JSON.parse(localStorage.getItem('favTable')) || [];

    const {data, isLoading, error, refetch} = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const url = new URL("/api/edge/anime","https://kitsu.io");
            if (location.state !== null) {
                url.pathname += `/${location.state.animeId}`
            } else {
                url.pathname += `/${id}`
            }
            const res = await axios.get(url.href);


            return res.data.data
        }
    }) 

    useEffect (() => {
        if (!isLoading) {
            setParsedData({
                coverImg : data.attributes.coverImage?.original,
                posterImg : data.attributes.posterImage.original,
                title : data.attributes.canonicalTitle,
                rank : data.attributes.popularityRank,
                description : data.attributes.synopsis,
                id: data.id
            })
        }
    }, [isLoading])


    useEffect(() => {
        refetch();
    }, [id])


    // stock element
    function addToFav(slug, e) {
        if (favTable.includes(slug)) {
            favTable = favTable.filter((favSlug) => favSlug !== slug);
        } else {
            favTable.push(slug);
        }
        localStorage.setItem('favTable', JSON.stringify(favTable));
    }

    const [isFav, setIsFav] = useState(favTable.includes(parsedData.id));
    useEffect(() => {
        setIsFav(favTable.includes(parsedData.id));
    }, [favTable, parsedData.id]);



    // FavButton color
    function ColorButton(){

        return(
            <>
                {isFav? 
                    (
                        <button
                        className="favBntaddClicked"
                        onClick={() => addToFav(parsedData.id)}
                        >
                            Ajouté aux favoris
                            <svg
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >   
                                <path
                                d="M15 4.27273C15 2.46545 13.3674 1 11.3538 1C9.84878 1 8.55611 1.81891 8 2.98764C7.44389 1.81891 6.15122 1 4.64544 1C2.63333 1 1 2.46545 1 4.27273C1 9.52364 8 13 8 13C8 13 15 9.52364 15 4.27273Z"
                                fill="#FFFFFF" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    ):(
                        <button
                        className="favBntadd"
                        onClick={() => addToFav(parsedData.id)}
                        >
                            Ajouter aux favoris
                            <svg
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >   
                                <path
                                d="M15 4.27273C15 2.46545 13.3674 1 11.3538 1C9.84878 1 8.55611 1.81891 8 2.98764C7.44389 1.81891 6.15122 1 4.64544 1C2.63333 1 1 2.46545 1 4.27273C1 9.52364 8 13 8 13C8 13 15 9.52364 15 4.27273Z"
                                fill="#4334C8" stroke="#4334C8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                    )
                }
            </>
        )
    }


    if (parsedData){
        return(
            <body className='DetailBody'>
                <div className="detailsPage">
                    <Link to='/'>
                        <button className="bnt backButton detailBnt">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 13L1 7M1 7L7 1M1 7H13C14.5913 7 16.1174 7.63214 17.2426 8.75736C18.3679 9.88258 19 11.4087 19 13C19 14.5913 18.3679 16.1174 17.2426 17.2426C16.1174 18.3679 14.5913 19 13 19H10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                Retourner au catalogue
                        </button>
                    </Link>
                    <div className="detailsPageContainer">
                        <header>
                            <img className="image"src={parsedData?.coverImg}></img>
                        </header>
                        <main>
                            <div className='infoContainer'>
                                <img className="infoContainerImg" src={parsedData.posterImg}></img>
                                <div className='infoText'>
                                    <div className='infoTextContent'>
                                        <div className='infoTextTitle'>
                                            <h4>{parsedData.title}</h4>
                                            <div className='point'></div>
                                            <p>{parsedData.rank}</p>
                                        </div>
                                        {ColorButton()}
                                    </div>
                                    <p className="infoTextSummary">
                                        {parsedData.description}
                                    </p>
                                </div>
                            </div>
                        </main>
                        <footer>
                            <Link to="/favorite">
                                <button className="bnt favBntTablePage">
                                    Voir les favoris
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 4.27273C15 2.46545 13.3674 1 11.3538 1C9.84878 1 8.55611 1.81891 8 2.98764C7.44389 1.81891 6.15122 1 4.64544 1C2.63333 1 1 2.46545 1 4.27273C1 9.52364 8 13 8 13C8 13 15 9.52364 15 4.27273Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </Link>
                        </footer>
                    </div>
                </div>
            </body>        
        )
        }else{
            return (
                <div>
                    Une erreur est survenue
                </div>
                )

        }

}

export default Details