import {useState} from "react";

export const Pagination = ({endpoint, info}) => {
    console.log(info)
    const list = [];
    if (info.pageNumber) {
        for (let i = 1; i <= Math.ceil(info.pageNumber); i++) {
            list.push(i);
        }
    }
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link"
                                                 onClick={() => info.event(((info.currentIndex - 1 >= 1) ? (info.currentIndex - 1) : 1),info.searchQuery!==undefined ? info.searchQuery:undefined)}
                                                 >Previous</a>
                    </li>
                    {list.map((number) => (
                        <li key={number} className="page-item"><a style={ number=== info.currentIndex ? {backgroundColor:"darkblue",color:"white"}:{}}  className="page-link"
                                                                     onClick={() => info.event(number,info.searchQuery!==undefined ? info.searchQuery:undefined)}>{number}</a>
                        </li>
                    ))}
                    <li className="page-item"><a className="page-link"
                                                 onClick={() => info.event(((info.currentIndex + 1 <= Math.ceil(info.pageNumber)) ? info.currentIndex + 1 : Math.ceil(info.pageNumber)),info.searchQuery!==undefined ? info.searchQuery:undefined)}>Next</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}