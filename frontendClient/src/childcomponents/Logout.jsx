export const Logout = () => {
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("person_id")
    localStorage.removeItem("token")
    window.location.href = "/"
    return (
        <></>
    );
}