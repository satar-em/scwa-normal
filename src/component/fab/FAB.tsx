import * as React from "react";
import * as Material from "@mui/material";
import * as MaterialIcons from "@mui/icons-material"

export default function FAB(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const onClickFAB = (event: React.MouseEvent<HTMLElement>) => {
        if (props.onclickFAB) props.onclickFAB();
        setAnchorEl(event.currentTarget);
    }
    return (
        <div>
            <Material.Popover
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={props.showChat}>
                {props.children}
            </Material.Popover>
            <Material.Fab color={"primary"} style={{margin: 10, position: "fixed", right: 0, bottom: 0}}
                          onClick={onClickFAB}>
                {props.showChat ? <MaterialIcons.Close/> : <MaterialIcons.Chat/>}
            </Material.Fab>
        </div>
    );
}