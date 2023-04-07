import React, {useState} from "react";

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

export default FilterSelector