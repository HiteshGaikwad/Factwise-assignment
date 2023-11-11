import Card from "./Card";
import {useState, useEffect,useContext} from "react";
import users from  "../../celebrities.json"
import userContext from "../../utils/userContext";
import {IMG_SEARCH_ICON_URL} from "../../Config"


const Body= ()=>{

    const [currentUser, setCurrentUser]= useState(-1);
    const [searchText, setSearchText]= useState("");

    const {userData, setUserData,filteredUsers,setFilteredUsers}= useContext(userContext);
    

    useEffect(()=>{
        // setUserList(users);
        setUserData(users);
        setFilteredUsers(users);
    },[])



    function searchUser(userName,userData){
       return userData.filter((user)=>{
            const name= user.first +" "+ user.last;
        return name.toLowerCase().includes(userName.toLowerCase());
        })
    }

    return (
        <div className="body">
        <div className="container">
            <div className="search-div">
            <img className="search-icon" src={IMG_SEARCH_ICON_URL} /> 
            <input className="input" placeholder="Search user" onChange={(e)=>setSearchText(e.target.value)}>
                </input>
                <button className="search-btn" onClick={(e)=>{
                    const list= searchUser(searchText,userData);
                    setFilteredUsers(list);
                }}>Search</button>
                </div>
            {
                filteredUsers.length===0? <h1 style={{"marginTop":"100px", "fontSize":"50px"}}>No User found!!</h1> : 
                (filteredUsers.map((user)=>{
                    return(<Card key={user.id}  user={user} isVisible={currentUser===user.id}  setIsVisible={()=>{
                        setCurrentUser(currentUser===user.id?-1:user.id)
                    }}/>)
                }))

            }
        </div>
        </div>
    )
}

export default Body;

 