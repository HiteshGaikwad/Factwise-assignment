import ReactDOM from "react-dom/client";
import Body from "./src/components/Body";
import userContext from "./utils/userContext";
import {useState,useContext} from "react";
import userContext from "./utils/userContext";
import popupContext from "./utils/popupContext";
import isAdultContext from "./utils/isAdultContext";

const App=()=>{

const [userData, setUserData]= useState({
    users:[],
})
const [filteredUsers, setFilteredUsers]= useState([]);

const [isPopupOn,setIsPopupOn]= useState()
const [isAdult, setIsAdult] = useState();

    return(
        <isAdultContext.Provider value={{isAdult:isAdult, setIsAdult:setIsAdult}}>
        <popupContext.Provider value={{isPopupOn:isPopupOn, setIsPopupOn:setIsPopupOn}}>
        <userContext.Provider value={{userData:userData, setUserData: setUserData, filteredUsers:filteredUsers,setFilteredUsers:setFilteredUsers }}>
        <Body/>
        </userContext.Provider>
        </popupContext.Provider>
        </isAdultContext.Provider>
    )
}
const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);