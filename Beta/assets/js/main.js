var zipFile = null;                //Upload.js 에서 파일값 넘어옴
let ui = new Ui(); 
let adofai_class = new ADOFAI();
let effect_list = adofai.effect.List;
let Level = null;               //ADOFAI Level

window.onload = () => {         //웹페이지 로드 완료 시
    // 초기상태 로드
    ui.Pageinit();
}
function Fast()
{
    if(isUpload() == true)
    {
        let level = adofai_class.findLevel(zipFile);
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

function readFile()
{
}