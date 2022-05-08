var file = null;                //Upload.js 에서 파일값 넘어옴
let ui = new Ui();              //UI 조작 관련 클래스
window.onload = () => {         //웹페이지 로드 완료 시
    // 초기상태 로드
    init();
}
function Fast()
{
    if(isUpload() == true)
    {

    }
}


function init() //처음 상태로 초기화
{
    ui.Hide(".status");
    ui.Hide(".convert-btns");
    ui.Hide(".log_box");
    ui.Hide(".down_btn");
    ui.Hide(".error");
    file = null;
}