import {React, useMemo, useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from '../components/columns';
import { useInfiniteQuery } from 'react-query';
import Favorite from './Favorite';
import Details from './Details';
import SearchBar from '../components/SearchBar';


function FilterSelector({filterArgs, setStateFilter, currentState}) {
    const [isOpenSelector, setIsOpenSelector] = useState(false);

    const handleSelectorClick = () => {
        setIsOpenSelector(isOpen => !isOpen)
    }

    const handleOptionClick = (event) => {
        setStateFilter(() => event.target.id)
        setIsOpenSelector(isOpen => !isOpen)
    }

    return (
        <>
            <button onClick={handleSelectorClick} class="dropdownBtn">{currentState}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="#4334C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
            </button>
            {isOpenSelector ? (
                <div className="dropdownContainer">
                <div class="dropdownContent">
                    {filterArgs.map(item => (<a onClick={handleOptionClick} className={currentState === item ? "focused" : null} id={item} href='#'>{item}</a>))}
                </div>
            </div>
            ): null}
        </>
    )
    
}



const BasicTable = () => {
    const selectorFilterDate = ["Année", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"];
    const [dateFilterState, setDateFilterDate] = useState("Année");
    const selectorFilterAge = ["Âge recommandé", "G", "PG", "R", "R18"];
    const [ageFilterState, setAgeFilterDate] = useState("Âge recommandé")
    const [searchState, setSearchState] = useState("");

    function getFavTable() {
        return JSON.parse(localStorage.getItem('favTable')) || [];
    }

    const fetchSize = 20;
    const [isHovering, setIsHovering] = useState(false);


    //Button add to favorite
    function ColorButton(){
        const handleMouseEnter = () => {
            setIsHovering(true);
        };
        
        const handleMouseLeave = () => {
            setIsHovering(false);
        };
    
        return(
            <Link to="/favorite">
                <button className="bnt favBntTablePage"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                    Voir les favoris
                    {isHovering ? (
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 4.27273C15 2.46545 13.3674 1 11.3538 1C9.84878 1 8.55611 1.81891 8 2.98764C7.44389 1.81891 6.15122 1 4.64544 1C2.63333 1 1 2.46545 1 4.27273C1 9.52364 8 13 8 13C8 13 15 9.52364 15 4.27273Z" fill="#4334C8" stroke="#4334C8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                    ):(
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 4.27273C15 2.46545 13.3674 1 11.3538 1C9.84878 1 8.55611 1.81891 8 2.98764C7.44389 1.81891 6.15122 1 4.64544 1C2.63333 1 1 2.46545 1 4.27273C1 9.52364 8 13 8 13C8 13 15 9.52364 15 4.27273Z" fill="#FFFFFF" stroke="#4334C8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    )
                }
                </button>
            </Link>
        )
    }

    const {
        data,
        refetch,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["anime"],
        queryFn: async ({ pageParam = 0 }) => {
            const url = new URL("/api/edge/anime", "https://kitsu.io");
    
            url.searchParams.set("page[limit]", fetchSize);
            url.searchParams.set("page[offset]", pageParam * fetchSize);

            if (searchState !== "") url.searchParams.set("filter[text]=", searchState);
            if (dateFilterState !== "Année") url.searchParams.set("filter[seasonYear]", dateFilterState);
            if (ageFilterState !== "Âge recommandé") url.searchParams.set("filter[ageRating]", ageFilterState);

            console.log(url.href);
            const res = await axios.get(url.href);
            return res.data;
        },
        getNextPageParam: (lastPage, pages) => {
        return pages.length;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        console.log(`SearchState: ${searchState}\ndateFilterState: ${dateFilterState}\nageFilterState:${ageFilterState}`);
        refetch();
    }, [searchState, dateFilterState, ageFilterState]);

    function DateFormat(date){
    if (date) {
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        return(formattedDate)
    }
    }

    const animeData = useMemo(() => {
        return (
            data?.pages.flatMap((page) => page.data.map((item) => ({
                canonicalTitle: item.attributes.canonicalTitle,
                ja_jp: item.attributes.titles.ja_jp,
                ageRatingGuide: item.attributes.ageRatingGuide,
                startDate: DateFormat(item.attributes.startDate),
                popularityRank: item.attributes.popularityRank,
                link : <Link 
                        to={{
                        pathname: item.id
                        }}
                        state = {{
                            animeId: item.id
                        }}>
                            Voir les détails</Link>
            }))
        ) ?? []
        );
    }, [data]);

    const columns = useMemo(() => COLUMNS, [ ])

    const tableInstance = useTable({
        columns,
        data: animeData,
    },
    useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    const visuralizatorTable = useRef(null);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    
        if (
            scrollTop + clientHeight >= scrollHeight - 20 &&
            !isFetchingNextPage &&
            hasNextPage
        ) {
            fetchNextPage();
        }
    };


    return (
        <div className='containerPageTable'>
            <div className='filterContainer'>
                <div className='searchBar'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9999 21L16.6499 16.65" stroke="#4334C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#4334C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <SearchBar searchState={setSearchState}/>
                    {/* <input placeholder='Recherche'></input> */}
                </div>
                <div class="dropdown">
                    <FilterSelector currentState={dateFilterState} filterArgs={selectorFilterDate} setStateFilter={setDateFilterDate}/>
                </div>
                <div class="dropdown">
                    <FilterSelector currentState={ageFilterState} filterArgs={selectorFilterAge} setStateFilter={setAgeFilterDate}/>
                </div>
            </div>
            <h3>Catalogue</h3>
            {animeData ? (
                <div  className='tableContainer'>
                    <div onScroll={handleScroll} className='tableContent'>
                        <table {...getTableProps()}>
                            <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6.875L6 4.125L3 6.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        : <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.125L6 6.875L9 4.125" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>) : ''}
                                        </span>
                                    </th>
                                ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row)
                                return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                    })}
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                ) : (
                <p>Chargement en cours...</p>
                )}
                {ColorButton()}
            </div>
        );
    }

export default BasicTable