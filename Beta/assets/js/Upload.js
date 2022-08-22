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
            console.log()
        }
        else if(Upload_Type == UploadType.Zip)
        {
            Unzip();
            alert("업로드 완료");
        }
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