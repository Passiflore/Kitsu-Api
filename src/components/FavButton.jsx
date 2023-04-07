import React, {useState} from "react";

function FavButton({id}){
    let favTable = JSON.parse(localStorage.getItem('favTable')) || [];

    function addToFav(id, e) {
        if (favTable.includes(id)) {
            favTable = favTable.filter((favId) => favId !== id);
        } else {
            favTable.push(id);
        }
        localStorage.setItem('favTable', JSON.stringify(favTable));
    }

    return(
        <>
            {favTable.includes(id)? 
                (
                    <button
                    className="favBntaddClicked"
                    onClick={() => addToFav(id)}
                    >
                        Retirer des favoris
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
                    onClick={() => addToFav(id)}
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

export default FavButton;