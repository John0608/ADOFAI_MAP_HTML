var Level;  //adofai 파일 내용 저장
let file_name;
/* Class 로드 */
let con = new Convert();
let ui = new Ui();
const ver = "1.0.1";


const effect_List = adofai.effect.List;
const fileUpload = () => {
    String.prototype.replaceAll = function (org, dest) {
        return this.split(org).join(dest);
    }

    const parseLevel = level => {
        try {
            return JSON5.parse(String(level).trim());
        } catch (e) {
            return JSON5.parse(String(level).trim()
                .replaceAll(', ,', ',')
                .replaceAll('}\n', '},\n')
                .replaceAll('},\n\t]', '}\n\t]')
                .replaceAll(', },', ' },')
                .replaceAll(', }', ' }')
                .replaceAll('\n', '')
                .replaceAll('}\n', '},\n'));
        }
    }

    const input = document.querySelector('.file_select_btn')
    const f = input.files[0]
    file_name = f.name;
    let ext = file_name.substring(file_name.lastIndexOf("."));
    if (ext != ".adofai") {
        alert(".adofai 파일만 지원합니다.");
        FileSelcetInit();
        return;
    }
    else {
        if (!f) return
        const reader = new FileReader()
        reader.onload = (evt) => {
            const level = parseLevel(evt.target.result)
            Level = level;
        }
        reader.onerror = () => {
            return alert('error reading file')
        }
        reader.readAsText(f, 'UTF-8')
    }
}

window.onload = () => {
    FirstSetting();
}


function FirstSetting() //스크립트 로드 후 처음만 실행
{
    $(".log_box").hide();
    $(".down_btn").hide();
    $(".error").hide();
}

function FileSelcetInit() //Input File 초기화
{
    $(".file_select_btn").val("");
    $(".log_box").hide();
    $(".down_btn").hide();
    $(".error").hide();
    Level = "";
    file_name = "";
}


function LogBoxOpenandClose() //로그박스 여닫기
{
    let logbox = $(".log_box").css("display");
    if (logbox == "block") {
        $(".log_box").hide();
    }
    else {
        $(".log_box").show();
    }
}

function FastConvert() //빠른 변환
{
    try {
        if (isUpload() == true) {
            if (Level.pathData == undefined) {
                ui.addLog("이 레벨은 자유각도 레벨입니다.")
                if (con.issupportAngledata() == true) {
                    con.anglePath2pathData();
                    ui.addLog("각도 변환 완료.");
                }
                else {
                    alert("이 레벨은 각도변환을 지원하지 않습니다.");
                    ui.addLog("이 레벨은 각도변환을 지원하지 않습니다.");
                    return false;
                }
            }
            else {
                ui.addLog("이 맵은 자유각도 레벨이 아닙니다.")
                if (con.isSupportPathData() == true) {
                    ui.addLog("Version : " + ver);
                    con.SetBasicMapSetting();
                    status_bar(100/15)
                    status_txt("맵 설정을 기본설정으로 바꾸는중...")
                    con.SetSpeed();
                    status_bar(100/14)
                    status_txt("BPM 수정하는중...")
                    con.CustomBackground();
                    status_bar(100/13)
                    status_txt("배경 설정을 수정하는중...")
                    con.ColorTrack();
                    status_bar(100/12)
                    status_txt("길색상 변경중...")
                    con.AnimateTrack();
                    status_bar(100/11)
                    status_txt("길 애니메이션 변경중...")
                    con.AddDecoration();
                    status_bar(100/10)
                    status_txt("장식 추가 변경중...")
                    con.Flash();
                    status_bar(100/9)
                    status_txt("플래시 변경중...")
                    con.MoveCamera();
                    status_bar(100/8)
                    status_txt("카메라 설정 변경중...")
                    con.HallOfMirrors();
                    status_bar(100/7)
                    status_txt("거울의 방 설정 바꾸는중...")
                    con.SetHitsound();
                    status_bar(100/6)
                    status_txt("히트사운드 설정 변경중...")
                    con.RecolorTrack();
                    status_bar(100/5)
                    status_txt("길 색상 변경 작업중...")
                    con.SetFilter();
                    status_bar(100/4)
                    status_txt("필터를 감지하고 변환중...")
                    Remove_notsuport_effect();
                    status_bar(100/3)
                    status_txt("지원되지 않는 이펙트 제거중...")
                    Remove_difference_key();
                    status_bar(100/2)
                    status_txt("지원하지 않는 키 제거중...")
                    mapsetting_to_basic_key();
                    status_bar(100/1)
                    status_txt("맵 설정을 기본 설정으로 변경중...")
                    status_txt("완료!")
                    $(".down_btn").show();

                }
                else {
                    alert("이 레벨의 각도는 지원되지 않습니다.")
                }
            }


        }
        else {
            alert("업로드를 먼저 해주세요!")
        }
    }
    catch (e) {
        $(".error").show();
        $("#error_content").text("Error Name " + e.name + "\nError MSG : " + e.message + "\nError Stack : " + e.stack);
    }


}

function CustomConvert() //사용자 설정 변환
{
    try {
        if (isUpload() == true) {
            if (Level.pathData == undefined) {
                ui.addLog("이 레벨은 자유각도 레벨입니다.");
                if (con.issupportAngledata() == true) {
                    alert("이 레벨은 각도변환을 지원하지 않습니다.");
                    ui.addLog("이 레벨은 각도변환을 지원하지 않습니다.");
                    return;
                }
                else {
                    con.anglePath2pathData();
                    ui.addLog("각도 변환 완료.");
                }
            }
            con.SetCustomEffect();
            if ($("#mapset").is(":checked") == true) {
                mapsetting_to_basic_key();
            }
            if ($("#remove_notsupport_effect").is(":checked") == true) {
                Remove_notsuport_effect();
            }
            if ($("#remove_notsupport_key").is(":checked") == true) {
                Remove_difference_key();
            }
            $(".down_btn").show();
        }
    }
    catch (e) {
        $(".error").show();
        $("#error_content").text("Error Name " + e.name + "\n" + "Error MSG : " + e.message + "\nError Stack : " + e.stack);
    }



}

function isUpload() { //업로드 유무 확인
    if (typeof (Level) == "undefined") {
        alert("먼저 업로드를 해주세요!");
        return false;
    }
    else {
        return true;
    }
}

function Remove_notsuport_effect() {
    Level.actions = Level.actions.filter(x => Object.keys(effect_List).includes(x.eventType));
}

function Remove_difference_key() {
    let eft_list = Object.keys(effect_List);
    Level.actions.forEach(function (index) {
        let level = index;
        eft_list.forEach(function (index) {
            let list = index;
            if (level.eventType == list) {
                let level_key = Object.keys(level);
                let data_key = Object.keys(effect_List[list]);
                for (let i = 0; i < level_key.length; i++) {
                    if (data_key.indexOf(level_key[i]) == -1) {
                        ui.addLog(level.eventType + "의 " + level_key[i] + "이(가) 삭제되었습니다!");
                        delete level[level_key[i]]
                    }
                }
            }
        })
    });
}

function mapsetting_to_basic_key() {
    Object.keys(Level.settings).forEach((index) => {
        if (adofai.Setting.Key.indexOf(index) == -1) {
            delete Level.settings[index];
        }
        Level.settings.version = 2;
    })
}


function down_click() {
    if (isUpload() == true) {
        if (file_name.length == 0) {
            download("main.adofai", JSON.stringify(Level));
        }
        else {
            download(file_name, JSON.stringify(Level));
        }
    }
    else {
        alert("파일 업로드와 변환을 먼저 해주세요!");
    }
}

function download(filename, text) {
    const element = document.createElement('a')
    element.setAttribute(
        'href',
        'data:text/json;charset=utf-8,' + encodeURIComponent(text),
    )
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}




function fix_setting_basic() {
    Object.keys(adofai.Setting.basic_value).forEach(function (index) {
        Level.settings[index] = data.Setting.basic_value[index];
    })
}

function angle2path(angleData) {
    let path = "";
    let angledat = angleData;
    //검사 진행
    angledat.forEach((x) => {
        if (Object.keys(adofai.path).indexOf(x.index) == -1) {
            alert("이 맵은 지원하지 않습니다.");
            return false;
        }
    })

}

function status_txt(msg)
{
    $(".status p").text(msg);
}
function status_bar(percent)
{
    $(".progress-bar").css("width",percent + "%");
    $(".progress-bar").text(percent + "%")

}
