import React from "react";
import Avatar from "react-avatar";

function Client({username}) {
    return(
        <div className="flex flex-col p-2 font-bold">
            <Avatar 
                name={username}
                size={50}
                round="14px"
            />
            <span className="m-1">{username}</span>
        </div>
    )
}

export default Client;