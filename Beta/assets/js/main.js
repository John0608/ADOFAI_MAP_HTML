/* Class 선언 */
const adofai_class = new ADOFAI();
const ui = new Ui(); 
const upload = new Upload();

let zipFile = null;

window.onload = () => {         //웹페이지 로드 완료 시
    // 초기상태 로드
    ui.Pageinit();
}

function ReadFile()
{
    let Zfile = null;
    function rf(_callback)
    {
        let zf = upload_FileRead();
        Zfile = zf;
        zipFile = zf;
        _callback();
    }
    function log() {
        rf(()=>{
            console.log(zipFile);
        })
    }
    log();
}

function FindLevel()
{
    adofai_class.findLevel(zipFile);
    alert(level.length);
}


const levelSelect = (target) =>
{
    levelRead(target.value);

}

function levelRead(filename)
{
    let file;
    zipFile.files[filename].async("string").then(
        (base64Text) => {
            file = base64Text;
        }
    ).then(()=>{
        level = adofai_class.readLevel(file);
    })
    .then(()=>{
        console.log(level);
        return level;
    })
}

function addSelect(list)
{
    let select = document.querySelector(".select");
    
    list.forEach((index)=>{
        let sel = document.createElement("option");
        sel.innerText = index;
        sel.value = index;
        select.appendChild(sel);
    })

}

function upload_FileRead() {
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