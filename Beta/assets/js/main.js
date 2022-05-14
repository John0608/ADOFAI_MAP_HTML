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
        let zf = upload.upload_FileRead();
        Zfile = zf;
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
