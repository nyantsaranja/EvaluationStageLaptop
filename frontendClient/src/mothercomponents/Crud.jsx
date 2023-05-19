import {TableChild} from "../childcomponents/TableChild";
import Swal from "sweetalert2";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import * as PropTypes from "prop-types";
import {Component} from "react";
import {Pagination} from "../childcomponents/Pagination";
import {SearchCard} from "../childcomponents/SearchCard";
import {convertToNewObject} from "../service/Utilities";

export class Crud extends Component {
    render() {
        let {
            endpoint,
            page_description,
            headers,
            names,
            rows,
            textValues,
            crud,
            tableTitle,
            userDefinedButton,
            inputTypes,
            pagination,
            searchFormData,
            pdfButton,
            details,
            customEvent
        } = this.props;
        document.getElementById("page-description").innerHTML = page_description;
        const updateEntity = (id) => {
            const array = getEntityById(id);
            console.log("element : ", array, rows)
            const inputStrings = getHtmlInputString(array, false);
            // console.log(inputStrings)
            Swal.fire({
                    title: textValues.modifier,
                    html: inputStrings,
                    showCancelButton: true,
                    confirmButtonText: "Modify",
                    cancelButtonText: "Cancel",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const formControl = document.getElementsByClassName("myform");
                        const obj = getObj(formControl, false);
                        console.log(obj)
                        const finalObj = convertToNewObject(obj)
                        delete finalObj.id
                        if (customEvent !== undefined && customEvent.update !== undefined) {
                            customEvent.update(finalObj,id)
                        } else {
                            axios.put(`${BASE_URL}/${endpoint}/${obj.id}`, finalObj, CONFIG).then((response) => {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Operation successful',
                                        text: endpoint + ' has been modified',
                                    }).then(() => {
                                        window.location.reload()
                                    })
                                }
                            ).catch((error) => {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Sorry, an error has occured',
                                        text: error.response.data.code + ': ' + error.response.data.message,
                                    })
                                }
                            )
                        }
                    }
                }
            )
        }
        if (!crud) {
            document.getElementById("createBtn").style.display = "none";
        }
        const getObj = (formControl, insert) => {
            const obj = {};
            console.log(formControl.length)
            var number = 0;
            if (insert) {
                number = 1
            }
            for (let i = 0; i < formControl.length; i++) {
                if (formControl[i].value === "" || formControl[i].value === null || formControl[i].value === undefined) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please, fill all the fields !",
                    })
                    return null;
                } else {
                    obj[names[i + number]] = formControl[i].value;
                }
            }
            return obj;
        }

        const getHtmlInputString = (valuesArray, insert) => {
            let htmlString = "";
            // console.log(valuesArray)
            valuesArray.forEach((value, index) => {
                console.log(index, insert)
                if (index === 0 && insert) {
                    return;
                }
                if (insert) {
                    value = "";
                }
                // check if the value is a number
                console.log("Elements: ", inputTypes[index].mother)
                if (inputTypes[index].name === "select") {
                    htmlString += `<label>${headers[index]}</label><select class="form-select mb-3 myform" data-choices>`;
                    htmlString += `<option value="" selected>Choose here</option>`;
                    for (let i = 0; i < inputTypes[index].mother.length; i++) {
                        htmlString += `<option value="${inputTypes[index].mother[i].id}" ${insert === false && value === inputTypes[index].mother[i].name ? "selected" : ""}>${inputTypes[index].mother[i].name === undefined ? inputTypes[index].mother[i].lastname + " " + (inputTypes[index].mother[i].firstname===null?"": inputTypes[index].mother[i].firstname) : inputTypes[index].mother[i].name}</option>`;
                    }
                    htmlString += `</select>`;
                } else {
                    htmlString += `<p style="${headers[index].toLowerCase() === "id" ? "display:none" : ""}"><label>${headers[index]}</label><input step="${inputTypes[index].step}" type="${inputTypes[index].name}" value="${value}" class="form-control myform"/></p>`;
                }
                htmlString += `<br/>`;
            });
            return htmlString;
        }
        const deleteEntity = (id) => {
            Swal.fire({
                title: 'Are you sure ?',
                text: "This operation cannot be undone",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${BASE_URL}/${endpoint}/${id}`, CONFIG).then((response) => {
                                Swal.fire(
                                    'Deleted !',
                                    endpoint + " has been deleted",
                                    'success'
                                ).then(() => {
                                        window.location.reload()
                                    }
                                )
                            }
                        ).catch((error) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'An error has occurred',
                                    text: error.response.data.code + ': ' + error.response.data.message,
                                })
                            }
                        )
                    }
                }
            )
        }
        const buttons = [
            {
                value: "",
                className: "btn btn-warning",
                icon: "fe fe-edit",
                event: updateEntity
            },
            {
                value: "",
                className: "btn btn-danger",
                icon: "fe fe-trash",
                event: deleteEntity
            }
        ]

        const createBtn = document.getElementById("createBtn");
        createBtn.innerHTML = (textValues !== undefined) ? textValues.btnCreer : "Create";
        createBtn.onclick = async () => {
            const inputStrings = getHtmlInputString(headers, true);
            console.log(inputStrings)
            const {value: formValues} = await Swal.fire({
                title: textValues.ajouter,
                html:
                inputStrings,
                focusConfirm: false,
                preConfirm: () => {
                    const formControl = document.getElementsByClassName("myform");

                    const obj = getObj(formControl, true);
                    if (customEvent !== undefined && customEvent.create !== undefined) {
                        customEvent.create(convertToNewObject(obj));
                    } else {
                        axios.post(`${BASE_URL}/${endpoint}`, convertToNewObject(obj), CONFIG).then((response) => {
                                console.log(response);
                                Swal.fire({
                                    icon: "success",
                                    title: endpoint + " created !",
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(
                                    () => {
                                        window.location.reload()
                                    }
                                )
                                // refresh the page
                            }
                        ).catch((error) => {
                                console.log(error);
                                Swal.fire({
                                    icon: "error",
                                    title: "An error has occurred",
                                    text: error,
                                })
                            }
                        )
                    }
                }
            })
        }
        const getEntityById = (id) => {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i][0] === id) {
                    return rows[i];
                }
            }
        }
        return (
            <div className="container-fluid" style={{padding: '10px'}}>
                <div className="row">
                    <div className="col-md-12">
                        <SearchCard searchFormData={searchFormData}
                                    pagination={pagination === undefined ? [] : pagination}/>
                    </div>
                    <div className="col-md-12">
                        <TableChild details={details} userDefinedButton={userDefinedButton} titre={tableTitle}
                                    headers={headers}
                                    rows={rows === undefined ? [] : rows}
                                    buttons={crud === true ? buttons : undefined} endpoint={endpoint}
                                    pdfButton={pdfButton}/>
                    </div>
                    <div className="col-md-12" style={{display: "flex", justifyContent: "center"}}>
                        {
                            pagination !== undefined && <Pagination endpoint={endpoint} info={pagination}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

Crud
    .propTypes = {
    endpoint: PropTypes.any,
    page_description: PropTypes.any,
    headers: PropTypes.any,
    names: PropTypes.any,
    rows: PropTypes.any,
    textValues: PropTypes.any,
    crud: PropTypes.any,
    tableTitle: PropTypes.any,
    userDefinedButton: PropTypes.any,
    inputTypes: PropTypes.any
}