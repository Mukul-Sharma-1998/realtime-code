import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom/dist";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";


function EditorPage() {
    const location = useLocation()
    const socketRef = useRef(null)
    const {roomId} = useParams()
    const reactNavigator = useNavigate()
    const [clients, setClients] = useState([])
    
    useEffect(() => {
        socketRef.current = new WebSocket(String(import.meta.env.VITE_REACT_APP_BACKEND_URL));
        console.log("socketRef ", socketRef.current)

        function handleErrors(e) {
            console.log('socket error ', e)
            toast.error('Socket connection failed, try again later!')
            reactNavigator('/')
        }

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');

            socketRef.current.send(JSON.stringify({ 
                type: ACTIONS.JOIN,
                roomId: roomId,
                username: location.state?.username,
            })); 
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("join event" ,data)
            if(data.type == ACTIONS.JOINED) {
                // console.log("inside joined")
                toast.success(`${data.username} joined the room`)
                setClients(data.sessionUser)
            } else if(data.type == ACTIONS.DISCONNECTED) {
                toast.success(`${data.username} has left the room`)
                setClients((prev) => {
                    return prev.filter((client) => client.sessionId != data.sessionId)
                })
            }
            

        }


        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if(socketRef.current) {
                socketRef.current.onmessage = null;
                socketRef.current.onerror = null;
                socketRef.current.onclose = null;
                socketRef.current.close();
            }
        };
    }, []);


    if(!location.state) {
        <Navigate to='/' />
    }

    return (
        <div
        className="h-screen grid grid-cols-12"
        >
            <div className="text-white flex flex-col p-6 col-span-3 bg-gray-800">
                <div className="flex-1">
                    <div className="p-4">
                        <h1 className="border-b border-b-gray-500 p-5">Code Sync</h1>
                    </div>
                    <h3 className="p-4">Connected</h3>
                    <div className="flex flex-wrap p-4">
                        {
                            clients.map((client) => (
                                <Client 
                                    username={client.username} 
                                    key={client.sessionId}
                                />
                            ))
                        }
                    </div>
                </div>
                <button className="bg-white text-black p-3 m-2 w-25 rounded-md font-bold hover:bg-green-600">COPY ROOM ID</button>
                <button className="bg-green-500 text-black p-3 m-2 w-25 rounded-md font-bold hover:bg-green-600">Exit Room</button>
            </div>
            <div className="h-screen col-span-9">
                <Editor socketRef={socketRef} roomId={roomId}/>
            </div>
        </div>
    )
}

export default EditorPage;