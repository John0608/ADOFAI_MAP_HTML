window.onload = () => {
    if (DevMode == false) {
        let input_Pw = prompt("비밀번호를 입력하세요!")
        if (input_Pw == PW) {
            loadPage();
        } else {
            document.querySelector("body").style.display = "None";
            alert("개발중인 페이지입니다.");
        }
    }
    else {
        loadPage();
    }


}

function loadPage() {
    Ui_Controller.Hide(Document_Select_List.Select_Box)
    Ui_Controller.Hide(Document_Select_List.Log_Display)
    Ui_Controller.Hide(Document_Select_List.Download_Button)
    //Ui_Controller.Hide(Document_Select_List.AlertBox_Display)
    Ui_Controller.Hide(Document_Select_List.Progress);
    Ui_Controller.Report_Error("ahffk","asdf");
}

async function Unzip() {

    Zip_File = await Zip.UnZip(upload_File);
}



function Sleep()
{
    setTimeout(()=>{},2000);
}
