import * as React from "react";
import * as Material from "@mui/material";
import * as MaterialIcons from "@mui/icons-material"
import Lottie from "lottie-react"
import AnimateLottie from "../../../asset/lottieflow-loading.json"
export default function ChatMessage(props: ChatMessageProps) {
    const [state,setstate]=React.useState({tryToConnect:false})
    React.useEffect(() => {
        if (!props.webSocket)return;
        props.webSocket.onopen=(ev:Event)=>{
            props.setConnectionStatus(true)
        }
        props.webSocket.onclose=(ev:Event)=>{
            props.setConnectionStatus(false)
        }
    },[props.webSocket])
    const openWebSocket=()=>{
        state.tryToConnect=true
        setstate({...state})
        props.setWebSocket(new WebSocket("wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"))
    }
    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "#ffe3e3"}}>
            {!state.tryToConnect ?
                <UiTryToConnect openWebSocket={openWebSocket}/>
                :
                props.connectionStatus? <ChatObjectUi/>:<TryToConnect/>
            }
        </div>
    )
}
interface ChatMessageProps {
    webSocket:WebSocket |null
    setWebSocket:(webSocket:WebSocket|null)=>void
    connectionStatus:boolean
    setConnectionStatus:(status:boolean) =>void
}
function UiTryToConnect(props: any){
    return(
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
function TryToConnect(){
    return(
        <div style={{height: "100%", width: "100%"}}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%"
            }}>
                <Lottie style={{width:"50%",height:"50%"}} animationData={AnimateLottie} loop={true}/>
            </div>
        </div>
    )
}
function ChatObjectUi(){
    return(
        <div>
            Chat Object Ui
        </div>
    )
}
