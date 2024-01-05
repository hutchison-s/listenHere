import { useContext } from "react";
import LoginPage from "../pages/LoginPage";
import { UserContext } from "../contexts/UserContext";


// eslint-disable-next-line react/prop-types
export default function Protected({children}) {
    const {profile} = useContext(UserContext)
    if (profile.authorized) {
        return children
    }
    else {
        return <LoginPage />
    }
  }