/* Class 선언 */
const adofai_class = new ADOFAI();
const ui = new Ui(); 
const upload = new Upload();
const convert = new Convert();

let zipFile = null;
let level_File = null;

window.onload = () => {         //웹페이지 로드 완료 시
    // 초기상태 로드
    ui.Pageinit();
}

function ReadFile()
{
    upload.readProcess();
}

function FindLevel()
{
    adofai_class.findLevel(zipFile);
    alert(level.length);
}


const levelSelect = (target) =>
{
    let level = levelRead(target.value);
    ui.HideLevelSelector()
    
    

}

function levelRead(filename)
{
    let file;
    zipFile.files[filename].async("string").then(
        (base64Text) => {
            file = base64Text;
            return base64Text;
        }
    ).then((result)=>{
        console.log(result);
        let level = adofai_class.readLevel(result);
        convert.FastConvert(result);
    })
    console.log(file);
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
