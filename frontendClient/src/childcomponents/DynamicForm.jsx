import {convertToNewObjectBySplitting} from "../service/Utilities";

export const DynamicForm = ({searchFormData, crud, search, btnValue, forSearch}) => {
    const getValues = () => {
        const inputsValue = document.getElementsByClassName("searchData");
        const obj = {}
        for (let i = 0; i < inputsValue.length; i++) {
            if ((inputsValue[i].value === undefined || inputsValue[i].value === null || inputsValue[i].value === "") && forSearch)
                continue
            obj[inputsValue[i].id] = inputsValue[i].value
        }
        crud(convertToNewObjectBySplitting(obj))
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row g-3">
                        {
                            searchFormData.map((data, index) => (
                                <div className="col-4" key={index}>
                                    {
                                        data.type !== "select" && <><label htmlFor="validationServer01"
                                                                           className="form-label">{data.label}</label>
                                            <input type={data.type} className="form-control searchData" id={data.name}
                                                   placeholder={data.label} defaultValue={data.value} required=""/></>
                                    }
                                    {
                                        data.type === "select" && <><label htmlFor="validationServer01"
                                                                           className="form-label">{data.label}</label>
                                            <select id={data.name} className="form-select searchData"
                                                    aria-label="Default select example">
                                                <option defaultValue={true} value={""}>Choose here</option>
                                                {
                                                    data.data.map((d, i) => (
                                                        <option key={i} value={d.id}
                                                                selected={data.value === d.id ? true : ""}>{d.name}</option>
                                                    ))
                                                }
                                            </select></>
                                    }

                                </div>
                            ))
                        }
                    </div>
                    <br/>
                    <button className="btn btn-primary w-100" type="button" onClick={() => {
                        if (search !== undefined) {
                            search()
                        } else {
                            getValues()
                        }
                    }}>{btnValue}</button>
                </div>
            </div>
        </>
    );
}