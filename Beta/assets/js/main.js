//변수 선언
let upload_File = null;
let Adofai_File = null;
let Zip_File = null;
let Upload_Type = null;

let UploadType = {
    Zip : "Zip",
    ADOFAI_LEVEL : "adofai_level"
}


window.onload = () =>{
    Ui_Controller.Hide(Document_Select_List.Select_Button)
    //Ui_Controller.Hide(Document_Select_List.Button_FileSelect)
    Ui_Controller.Hide(Document_Select_List.Log_Display)
    Ui_Controller.Hide(Document_Select_List.Download_Button)
    Ui_Controller.Hide(Document_Select_List.Status_Display)
    Ui_Controller.Hide(Document_Select_List.AlertBox_Display)
    //alert("f");
}


let Document_Select_List = {
    Button_FileSelect : ".upload_controll",
    Log_Display : ".log_box",
    Status_Display : ".status",
    Select_Button : ".form-select",
    Download_Button : ".down_btn",
    AlertBox_Display : ".alert"
}

