import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

function EditorPage() {
    
    const [clients, setClients] = useState([
        { socketId: 1, username: 'Mukul S' },
        { socketId: 2, username: 'Rakesh K' },  
    ])

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
                                    key={client.socketId}
                                />
                            ))
                        }
                    </div>
                </div>
                <button className="bg-white text-black p-3 m-2 w-25 rounded-md font-bold hover:bg-green-600">COPY ROOM ID</button>
                <button className="bg-green-500 text-black p-3 m-2 w-25 rounded-md font-bold hover:bg-green-600">Exit Room</button>
            </div>
            <div className="h-screen col-span-9">
                <Editor />
            </div>
        </div>
    )
}

export default EditorPage;