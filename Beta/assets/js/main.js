var zipFile = null;                //Upload.js 에서 파일값 넘어옴
let ui = new Ui(); 
let adofai = new ADOFAI();
window.onload = () => {         //웹페이지 로드 완료 시
    // 초기상태 로드
    ui.Pageinit();
}
function Fast()
{
    if(isUpload() == true)
    {
        let level = adofai.findLevel(zipFile);
        if(level.length >= 0)
        {
            addSelect(level);
            ui.Show(".select");
        }
    }
    else {

    }
}

function fileRead()
{
    upload_FileRead();
    adofai.findLevel(zipFile);
    alert(level.length);
}


const levelSelect = (target) =>
{
    levelRead(target.value);
}

function levelRead(filename)
{
    let i = zipFile.files[filename].async("string").then(
        (base64Text) => {
            i = base64Text;
        }
    )
    console.log(i.status);
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