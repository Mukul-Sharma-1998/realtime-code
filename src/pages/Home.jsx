import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
    console.log("homeeeeeeeeeeeeee")

    const [roomId, setRoomId] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const createNewRoomId = (e) => {
        e.preventDefault()
        const roomId = uuidV4()
        console.log(roomId)
        setRoomId(roomId)
        toast.success("Created a new room!")
    }

    const joinRoom = () => {
        if(!roomId || !username) {
            console.log("asjkasdfafajfakfj")
            toast.error("Room ID and Username is required!")
            return;
        }
        navigate(`editor/${roomId}`, {
            state: {
                username,
            }
        })
    }

    const handleInputEnter = (e) => {
        if(e.code === 'Enter') {
            joinRoom()
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen text-center text-white">
            <div className="bg-gray-700 p-8 rounded-md w-1/2 ">
                <h1 className="m-10">code sync</h1>
                <h4 className="m-2 mt-0">Paste Invitation Room ID</h4>
                <div className="flex flex-col justify-center items-center">
                    <input 
                        type="text" 
                        className="p-3 rounded-md m-2 w-full bg-gray-300 text-black font-bold"  
                        placeholder="Room ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />

                    <input 
                        type="text" 
                        className="p-3 rounded-md m-2 w-full bg-gray-300 text-black font-bold"  
                        placeholder="User Name"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button 
                        className="bg-green-500 text-black p-3 m-2 w-24 rounded-md font-bold hover:bg-green-600"
                        onClick={joinRoom}
                    
                    >
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a 
                            href="" 
                            className="font-bold underline text-green-500 hover:text-green-600"
                            onClick={createNewRoomId}
                        >
                            New Room
                        </a>
                    </span>
                </div>
            </div>
            <footer className="bottom-8 w-full fixed">
                <h4>Built with love by Mukul Sharma</h4>
            </footer>
        </div>
    )
}

export default Home;