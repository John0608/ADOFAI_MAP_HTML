class Zip {
    async UnZip(file) {
        const result = await this.UnZipProcess(file);
        return result;
    }

    UnZipProcess(file) {
        return new Promise(resolve => {
            JSZip.loadAsync(file).then(
                function (zip) {
                    resolve(zip);
                }
            )
        })
    }

    AddFile(FileName, file, isEncodingBase64, isJSONStringify) {
        let File = file;
        if (isEncodingBase64 == true) {
            File = btoa(File);
            if (isJSONStringify == true) {
                File = JSON.stringify(File);
                addFile(true, FileName, File);
            }
            else {
                addFile(true, FileName, File);
            }
        }
        else {
            if (isJSONStringify == true) {
                File = JSON.stringify(File);
                addFile(true, FileName, File);
            }
            else {
                addFile(true, FileName, File);
            }
        }

        function addFile(isBase64, FileName, File) {
            if (isBase64 == true) {
                Files.file(FileName, File, { 'base64': true })
                return;
            }
            else {
                Files.file(FileName, File, { 'base64': false })
                return;
            }
        }
    }

    async download(File, FileName) {
        await this.download_method(File, FileName);
    }

    download_method(zip) {
        zip.generateAsync({
            type: "base64",
            compression: "DEFLATE"
        },
        ).then(function (zipContents) {
            // 압축이 다되면 다운로드를 한다. 
            var filename = ZipFileName;
            // type에 'base64'로 한경우 
            download("data:application/octet-stream;base64," + zipContents, filename, "application/octet-stream");
            // type에 'blob'로 한경우 
            //download(zipContents, filename, "application/octet-stream");
        });
    }

    myOnDownload(FileName) {
        let File = Files;
        File.generateAsync({ type: "base64", })
            .then(function (base64Text) {
                zipUtil.download_base64_content(FileName, base64Text);
            }
            );
    }
    download_base64_content(filename, base64Text) { 
        //window.location="data:application/octastream;base64, " + base64Text; 
        var element = document.createElement('a'); 
        element.setAttribute('href', 'data:application/octastream;base64,' + base64Text); 
        element.setAttribute('download', filename); element.style.display = 'none'; 
        document.body.appendChild(element); 
        element.click(); 
        document.body.removeChild(element);
    }




}


