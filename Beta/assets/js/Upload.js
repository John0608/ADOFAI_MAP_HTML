const Upload = () => {
    const Support_Ext = [".adofai",".zip"];
    const input = document.querySelector('.file_select_btn');    //파일 선택을 한 Tag
    const f = input.files[0];                                            //파일 선택 Array의  0번째선택
    let FileName = f.name;                                               //파일 이름

    //파일 확장자
    let File_Ext = FileName.substring(FileName.lastIndexOf("."));
        alert(File_Ext);

    //허용되지 않는 확장자 Return
    if(Support_Ext.indexOf(File_Ext) == -1)
    {
        alert(".adofai, .zip파일만 업로드 가능합니다.");
        input.value = null;
        return;
    }
    
    //파일 리더기
    const reader = new FileReader();
    reader.onload = function (evt) {
        upload_File = evt.target.result;
        if(Upload_Type == UploadType.ADOFAI_LEVEL)
        {
            alert("업로드 완료");
            Adofai_File = upload_File;
            upload_File = null;
        }
        else if(Upload_Type == UploadType.Zip)
        {
            Unzip();
        }

        UploadComplete(Upload_Type);
    }
    reader.onerror = () => {
        alert('파일을 읽는데 실패하였습니다.')
        return false;
    }
    if(File_Ext === ".zip")
    {
        Upload_Type = UploadType.Zip;
        reader.readAsArrayBuffer(f, 'UTF-8');
    }
    else if(File_Ext === ".adofai") {
        Upload_Type = UploadType.ADOFAI_LEVEL;
        reader.readAsText(f, 'UTF-8');
    }
    setTimeout(()=>{},50);
}

function UploadComplete(File_Type)
{
    setTimeout(()=>{
        Ui_Controller.ChangeStatustxt("파일을 읽는중입니다. 잠시만 기다려주세요...");

    },1000);
    Ui_Controller.Hide(Document_Select_List.Button_FileSelect);

    if(File_Type == UploadType.ADOFAI_LEVEL)
    {
        alert("레벨 변환 시작");
    }
    else if(File_Type == UploadType.Zip)
    {
        let inter = setInterval(
            function() {
                if(Zip_File != null) {inter_stop()}
                console.log("읽는중");
        },1000);

        function inter_stop() {
            clearInterval(inter)
            let levels = adofai_util.FindLevel();
            console.log(levels)
            Ui_Controller.Display_LevelList(levels);
        }

    }
    Ui_Controller.Hide(Document_Select_List.Status_Display);
}