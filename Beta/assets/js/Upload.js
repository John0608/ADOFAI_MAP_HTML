const upload_FileRead = () => {
    const input = document.querySelector('.file_select_btn')
    const f = input.files[0]
    const fName = f.name.substring(f.name.lastIndexOf("."));
    if (!f) return
    const reader = new FileReader()
    reader.onload = (evt) => {
        if(fName != ".zip")
        {
            return alert("Zip파일만 지원합니다!")
        }
        else {
            file = evt.target.result
            return;
        }
    }
    reader.onerror = () => {
        alert('파일을 읽는데 실패하였습니다.')
        return;
    }
    reader.readAsText(f, 'UTF-8')

};

function isUpload()
{
    console.log(file)
    if((file == null) || (file == undefined)) {
        alert("먼저 업로드를 해주세요!");
        return false;
    }
    else {
        return true;
    }
}