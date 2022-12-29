import React, {useState} from 'react'
import Dialog from './Dialog'

const Settings = () => {

  const [dialogClass, setDialogClass] = useState(["dialog", "pt-4"]);

  const showDialog = ()=>{
    setDialogClass(["dialog", "pt-4", "dialogActive"]);
  }

  return (
    <div className='settings text-center p-1 pt-5'>
      <h5>SETTINGS</h5>
      <div className="settingsCon d-flex justify-content-center py-5">
        <p>Delete Your Account Permanently</p>
        <button onClick={showDialog}>Delete Account</button>
      </div>
      <Dialog dialogClass={dialogClass} setDialogClass={setDialogClass} />
    </div>
  )
}

export default Settings
