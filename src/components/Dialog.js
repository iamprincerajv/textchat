import React from 'react'

const Dialog = (props) => {
    return (
        <div className={props.dialogClass.join(" ")}>
            <center>
                <p>Are you sure?</p>
                <button onClick={()=>{props.setDialogClass(["dialog", "pt-4"])}}>No</button>
                <button>Yes</button>
            </center>
        </div>
    )
}

export default Dialog
