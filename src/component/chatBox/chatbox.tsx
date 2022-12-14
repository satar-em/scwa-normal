import * as React from "react";
import * as Material from "@mui/material";
import * as MaterialIcons from "@mui/icons-material"

export default function ChatBox(props: any) {
    const onClickFAB = () => {
        if (props.onclickFAB) props.onclickFAB();
    }
    return (
        <div>
            <Material.Box
                sx={{
                    width: 300,
                    height: 500,
                    backgroundColor: 'rgba(203,197,236,0.62)'
                }}
            />
        </div>
    )
}
