import * as React from "react";
import * as Material from "@mui/material";
import * as MaterialIcons from "@mui/icons-material"
import FAB from "./fab/FAB";
import {useState} from "react";
import ChatBox from "./chatBox/chatbox";

export default function Chat(props: any) {
    const [state, setState] = useState<ChatState>({
        showChat: false,
        firstTime: true
    })
    React.useEffect(() => {
        onChangeShowChat()
    }, [state.showChat])
    const onclickFAB = () => {
        state.showChat = !state.showChat
        setState({...state})
    }
    const onCloseChatBox = () => {
        state.showChat=false
        setState({...state})
    }
    const onChangeShowChat = () => {
        /*console.log("ShowChat changed")*/
    }
    return (
        <div>
            <FAB onclickFAB={onclickFAB} showChat={state.showChat} onCloseChatBox={onCloseChatBox}>
                <ChatBox showChat={state.showChat}/>
            </FAB>
        </div>
    );
}

interface ChatState {
    showChat: boolean,
    firstTime: boolean
}