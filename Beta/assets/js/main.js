var file = null;                //Upload.js 에서 파일값 넘어옴
let ui = new Ui();              //UI 조작 관련 클래스
let adofai = new ADOFAI();
window.onload = () => {         //웹페이지 로드 완료 시
    // 초기상태 로드
    init();
}
function Fast()
{
    if(isUpload() == true)
    {
        let level = adofai.findLevel(file);
        if(level.length >= 0)
        {
            addSelect(level);
        }
    }
    else {

    }
}


function init() //처음 상태로 초기화
{
    ui.Hide(".convert-btns");
    ui.Hide(".status");
    ui.Hide(".convert-btns");
    ui.Hide(".log_box");
    ui.Hide(".down_btn");
    ui.Hide(".error");
    file = null;
}

const levelSelect = (target) =>
{
    console.log(target.value);
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
