class Upload {

    upload_FileRead() {
        const input = document.querySelector('.file_select_btn')
        const f = input.files[0]
        const fName = f.name.substring(f.name.lastIndexOf("."));
        if (!f) return
        else if (fName != ".zip") {
            alert("Zip 파일만 지원합니다.")
            this.upload_init();
            return false;
        }
        else {
            const reader = new FileReader()
            let zipFile = null;
            reader.onload = function (evt) {
                JSZip.loadAsync(evt.target.result).then(
                    function (zip) {
                        zipFile = zip;
                    }
                    ).then(() => {
                        if (upload.isUpload(zipFile) == true) {
                            let level = adofai_class.findLevel(zipFile);
                            if (level.length >= 0 && level != false) {
                            addSelect(level);
                            alert("읽음");
                            ui.Show(".select");
                            ui.Hide("#info_msg");
                            console.log("읽기 완료");
                            console.log(zipFile)
                            return zipFile;
                        }
                        else {
                            alert("레벨 파일을 찾을 수 없습니다.");
                            return;
                        }
                    }
                    return zipFile;
                })
            }
            reader.onerror = () => {
                alert('파일을 읽는데 실패하였습니다.')
                return false;
            }
            reader.readAsArrayBuffer(f, 'UTF-8');
        }


    };

    isUpload(file) {
        if ((file == null) || (file == undefined)) {
            alert("먼저 업로드를 해주세요!");
            return false;
        }
        else {
            return true;
        }
    }

    upload_init() {
        let e = document.querySelector(".file_select_btn");
        e.value = null;
        return;
    }


}

