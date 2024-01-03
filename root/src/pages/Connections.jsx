import { useContext } from "react";
import "./Connections.css"
import { UserContext } from "../contexts/UserContext";

function Connections() {

    const {user} = useContext(UserContext)
    let connects = user.connects ? user.connects.length : 0

    return (
        <>
            <article className="gridCenter">
                <div>
                    <h2>Connections page pending</h2>
                    <p style={{textAlign: "center"}}>{user.name} currently has {connects} connections</p>
                </div>
            </article>
        </>
    )
}

export default Connections;