import * as React from "react";
import * as Material from "@mui/material";
import * as MaterialIcons from "@mui/icons-material"
import {useState} from "react";
import ChatMessage from "./mesasge/ChatMessage";

export default function ChatBox(props: any) {
    const [state, setState] = useState<ChatBoxState>({connectedStatus: false, webSocket: null})
    const onClickFAB = () => {
        if (props.onclickFAB) props.onclickFAB();
    }
    const setWebSocket = (webSocket: WebSocket | null) => {
        state.webSocket = webSocket
        setState({...state})
    }
    const setConnectionStatus = (status: boolean) => {
        state.connectedStatus = status
        setState({...state})
    }
    const onClickCloseChatBox = () => {
        props.onCloseChatBox()
        if (state.webSocket)
            state.webSocket.close()
    }
    return (
        <div style={{userSelect: "none"}}>
            <Material.Box
                sx={{
                    width: 350,
                    height: 600,
                }}
            >
                <div style={{backgroundColor: "rgba(125,194,191,0.58)", height: "100%"}}>
                    <div>
                        <div
                            style={{
                                background: "linear-gradient(126deg, rgba(65,206,214,1) 0%, rgba(210,235,223,1) 100%)",
                                height: 50,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Material.IconButton color="primary" style={{position: "absolute", right: 0, top: 0}}
                                                 onClick={onClickCloseChatBox}>
                                <MaterialIcons.ExpandMore/>
                            </Material.IconButton>
                            Artemis
                        </div>
                    </div>
                    <div>
                        <div style={{
                            height: 480,
                            backgroundColor: "rgba(162,96,178,0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "auto",
                        }}>
                            <ChatMessage webSocket={state.webSocket} setConnectionStatus={setConnectionStatus}
                                         connectionStatus={state.connectedStatus} setWebSocket={setWebSocket}/>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                height: 70,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#ffffff"
                            }}>
                            {state.connectedStatus ?
                                <div className="row" style={{width: "100%"}}>
                                    <div className="col-10">
                                        <Material.TextField
                                            id="outlined-multiline-flexible"
                                            multiline
                                            maxRows={2}
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Enter Your Text"
                                            size="small"
                                        />
                                    </div>
                                    <div className="col-2"
                                         style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <Material.IconButton color="primary">
                                            <MaterialIcons.Send/>
                                        </Material.IconButton>
                                    </div>
                                </div>
                                :
                                "Artemis Group"}
                        </div>
                    </div>
                </div>
            </Material.Box>
        </div>
    )
}

interface ChatBoxState {
    connectedStatus: boolean,
    webSocket: WebSocket | null
}
