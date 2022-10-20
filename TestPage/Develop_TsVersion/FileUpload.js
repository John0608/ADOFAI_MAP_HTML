var FileUpload = function (target) {
    //파일 지원 확장자
    var ext = ['.adofai', '.zip'];
    //현재 업로드 된 확장자
    var FileExt = "";
    target.type = "file";
    //@ts-ignore
    var file = target.files[0];
    var fileName = file.name;
    FileExt = GetFileExt(fileName);
    if (ext.indexOf(FileExt) == -1) {
        alert("지원하지 않는 확장자입니다.");
        return;
    }
    else {
        var reader = new FileReader();
        reader.onload = function (evt) {
            //@ts-ignore
            file = evt.target.result;
        };
        if (FileExt == ".adofai") {
            reader.readAsText(file, 'UTF-8');
        }
        else if (FileExt == ".zip") {
            reader.readAsArrayBuffer(file);
        }
    }
    function GetFileExt(fileName) {
        var length = fileName.length;
        var fileDot = fileName.indexOf(".");
        return fileName.substring(fileDot + 1, length);
    }
};
