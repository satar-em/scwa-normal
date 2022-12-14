import * as React from "react";
import * as Material from "@mui/material";
import * as MaterialIcons from "@mui/icons-material"
import {useState} from "react";

export default function ChatMessage(props: any) {
    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "white"}}>
            {!props.connectionStatus ?
                <div style={{height: "100%", width: "100%"}}>
                    <div style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                        height: "50%",
                        width: "100%"
                    }}>
                        <Material.IconButton color="primary">
                            <MaterialIcons.SupportAgent style={{width: 80, height: 80}}/>
                        </Material.IconButton>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", height: "50%", width: "100%"}}>
                        Connect To Admin
                    </div>
                </div>
                :
                ""
            }
        </div>
    )
}
