import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import ACTIONS from "../Actions";


function Editor({socketRef, roomId, setEditorRef, onCodeChange}) {

    const editorRef = useRef(null);
    useEffect(() => {
        // Initialize CodeMirror instance
        async function init() {
            editorRef.current = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true
            });

            editorRef.current.on('change', (instance, changes) => {
                console.log('changes', changes)
                const {origin} = changes
                const code = instance.getValue();
                onCodeChange(code)
                if(origin !== 'setValue' && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                    // TODO: send message to server
                    socketRef.current.send(JSON.stringify({
                        type: ACTIONS.CODE_CHANGE,
                        roomId: roomId,
                        code: code
                    }));
                    
                }
                console.log(code)
            })

            setEditorRef(editorRef.current)

        }

        init();
        // Cleanup function to destroy the CodeMirror instance when the component unmounts
        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
            }
        };
    },[]);

    return <textarea id="realtimeEditor"></textarea>
}

export default Editor;