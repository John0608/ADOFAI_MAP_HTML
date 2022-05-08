const upload_FileRead = () => {
    const input = document.querySelector('.file_select_btn')
    const f = input.files[0]
    const fName = f.name.substring(f.name.lastIndexOf("."));
    if (!f) return
    else if (fName != ".zip") {
        alert("Zip 파일만 지원합니다.")
        upload_init();
    }
    else {
        const reader = new FileReader()
        reader.onload = function(evt){
            JSZip.loadAsync(evt.target.result).then(
                function (zip) {
                    file = zip;
                }
            );
            ui.Show(".convert-btns");
            ui.Hide("#info_msg");
            return;
        }
        reader.onerror = () => {
            alert('파일을 읽는데 실패하였습니다.')
            return;
        }
        reader.readAsArrayBuffer(f, 'UTF-8');
    }
    

};

function isUpload() {
    console.log(file)
    if ((file == null) || (file == undefined)) {
        alert("먼저 업로드를 해주세요!");
        return false;
    }
    else {
        return true;
    }
}

function upload_init() {
    let e = document.querySelector(".file_select_btn");
    e.value = null;
    return;
}