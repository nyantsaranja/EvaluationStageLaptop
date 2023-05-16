export const Info = ({info}) => {
    document.getElementById("createBtn").style.display = "none";
    return (
        <>
            <div className="card">
                <div className="card-header">

                    <h4 className="card-header-title">
                        {info.title}
                    </h4>

                </div>
                <div className="card-body">
                    <h6 style={{textDecoration:"underline"}}><small>{info.subtitle}</small></h6>

                    <ul className="list-group list-group-flush">
                        {
                            info.others.map((other, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {other.title}
                                    <span className="badge bg-dark-soft rounded-pill">{other.value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}