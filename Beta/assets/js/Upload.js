const Upload = () => {
    const input = document.querySelector('.file_select_btn');    //파일 선택을 한 Tag
    const f = input.files[0];                                            //파일 선택 Array의  0번째선택
    let FileName = f.name;                                               //파일 이름

    //파일 확장자
    let File_Ext = FileName.substring(FileName.lastIndexOf("."));
    
    //파일 리더기
    const reader = new FileReader();
    reader.onload = function (evt) {
        upload_File = evt.target.result;
        console.log(upload_File)
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