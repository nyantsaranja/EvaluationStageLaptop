import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";

export const TableChild = ({titre, headers, rows, buttons, userDefinedButton, endpoint, pdfButton, details}) => {
    const ev = (id, button) => {
        button.event(id);
    }

    function generatePDf() {
        axios.get(`${BASE_URL}/${endpoint}/pdf`, CONFIG).then((response) => {
                console.log("Success")
            }
        ).catch((error) => {
                console.log(error)
            }
        )
    }

    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h5>{titre}</h5>
                {pdfButton === true && <button type="button" className="btn btn-danger mb-2" onClick={() => {
                    generatePDf()
                }}>Generate PDF <i className={"fe fe-file-text"}></i></button>}
            </div>
            <br/>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}
                            >{header}</th>
                        ))}
                        {
                            (buttons !== null && buttons !== undefined) && buttons.map((button, t) => (
                                <th key={t}></th>
                            ))
                        }
                        {
                            (userDefinedButton !== null && userDefinedButton !== undefined) &&
                            userDefinedButton.map((button, t) => (
                                <th key={t}></th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                j === 0 && details ? <a href={endpoint + "?id=" + cell}>
                                        <td key={j}>{cell}</td>
                                    </a> :
                                    <td key={j} dangerouslySetInnerHTML={{__html:cell}}></td>
                            ))}
                            {
                                (buttons !== null && buttons !== undefined) && buttons.map((button, t) => (
                                    <td key={t}>
                                        <button className={button.className} onClick={() =>
                                            ev(row[0], button)
                                        }>
                                            <i className={button.icon}></i> {button.value}
                                        </button>
                                    </td>
                                ))
                            }
                            {
                                (userDefinedButton !== null && userDefinedButton !== undefined) &&
                                userDefinedButton.map((button, t) => (
                                    <td key={t}>
                                        <a href={""} onClick={(event) => {
                                            event.preventDefault()
                                            ev(row[0], button)
                                        }
                                        }>
                                            <i className={button.icon}></i> {button.value}
                                        </a>
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}