class Upload {

    DetectFileExt() {
        const input = document.querySelector('.file_select_btn')
        const f = input.files[0]
        const fName = f.name.substring(f.name.lastIndexOf("."));
        if (!f) return
        else if (fName != ".zip") {
            alert("Zip 파일만 지원합니다.")
            this.upload_init();
            return false;
        }
        else return true;
    }

    async readProcess() {
        let result = await this.ReadFile();
        return result;
    }

    ReadFile()
    {
        return new Promise(resolve => {
            const input = document.querySelector('.file_select_btn')
            const f = input.files[0]
            const reader = new FileReader();
            reader.onload = function (evt) {
                resolve(evt.target.result);
            }
            reader.onerror = () => {
                alert('파일을 읽는데 실패하였습니다.')
                return false;
            }
            reader.readAsArrayBuffer(f, 'UTF-8');
        })
    }


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

