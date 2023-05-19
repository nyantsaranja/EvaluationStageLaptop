import {DynamicForm} from "./DynamicForm";

export const SearchCard = ({searchFormData, pagination}) => {

    function search() {
        const searchInputs = document.getElementsByClassName("searchData");
        let query = "";
        for (let i = 0; i < searchInputs.length; i++) {
            if (searchInputs[i].value === undefined || searchInputs[i].value === null || searchInputs[i].value === "")
                continue
            query += "&" + (searchInputs[i].type==="text" ? "ilike_" : "") + searchInputs[i].id + "=" + searchInputs[i].value
        }
        pagination.event(pagination.currentIndex, query)
    }

    return (
        <>
            {(pagination.length !== 0 && searchFormData !== undefined) &&
                <DynamicForm searchFormData={searchFormData === undefined ? [] : searchFormData} search={search}
                             btnValue={"Search"}/>}
        </>
    );
}