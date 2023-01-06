import * as React from "react";
import * as Material from "@mui/material";
import * as MaterialIcons from "@mui/icons-material"
import Lottie from "lottie-react"
import AnimateLottie from "../../../asset/lottieflow-loading.json"
import {useEffect} from "react";

export default function ChatMessage(props: ChatMessageProps) {
    const [state, setstate] = React.useState({
        tryToConnect: false, socketMessage: [] as any[], clientId: ""
    })
    React.useEffect(() => {
        if (!props.webSocket) return;
        props.webSocket.onopen = (ev: Event) => {
            props.setConnectionStatus(true)
        }
        props.webSocket.onclose = (ev: Event) => {
            props.setConnectionStatus(false)
        }
        props.webSocket.onmessage = (ev: MessageEvent) => {
            try {
                const chatObjectMessage0 = JSON.parse(ev.data) as ChatObjectMessage
                if (chatObjectMessage0.messageType === "SetClientId")
                    state.clientId = chatObjectMessage0.to
                else {
                    state.socketMessage.push(ev.data)
                }
            } catch (e) {

            }
            setstate({...state})
        }
    }, [props.webSocket])
    const openWebSocket = () => {
        state.tryToConnect = true
        setstate({...state})
        props.setWebSocket(new WebSocket("ws://192.168.1.105:8080/scwa/chat-user"))
    }
    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "#ffe3e3"}}>
            {!state.tryToConnect ?
                <UiTryToConnect openWebSocket={openWebSocket}/>
                :
                props.connectionStatus ? <ChatObjectUi chatObject={state.socketMessage} clientId={state.clientId}/> :
                    <TryToConnect/>
            }
        </div>
    )
}

interface ChatMessageProps {
    webSocket: WebSocket | null
    setWebSocket: (webSocket: WebSocket | null) => void
    connectionStatus: boolean
    setConnectionStatus: (status: boolean) => void
}

function UiTryToConnect(props: any) {
    return (
        <div style={{height: "100%", width: "100%"}}>
            <div style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                height: "55%",
                width: "100%"
            }}>
                <Material.IconButton color="primary" onClick={props.openWebSocket}>
                    <MaterialIcons.SupportAgent style={{width: 80, height: 80}}/>
                </Material.IconButton>
            </div>
            <div style={{display: "flex", justifyContent: "center", height: "45%", width: "100%"}}>
                Connect To Admin
            </div>
        </div>
    )
}

function TryToConnect() {
    return (
        <div style={{height: "100%", width: "100%"}}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%"
            }}>
                <Lottie style={{width: "50%", height: "50%"}} animationData={AnimateLottie} loop={true}/>
            </div>
        </div>
    )
}

function ChatObjectUi(props: any) {
    const myId = props.clientId
    const ChatObjectMessages = props.chatObject.map((item: any) => JSON.parse(item) as ChatObjectMessage) as ChatObjectMessage[]
    return (
        <div>
            id = {props.clientId}
        </div>
    )
}

interface ChatObjectMessage {
    messageType: string,
    userType: string,
    from: string,
    to: string,
    content: string,
    authentication: string
}