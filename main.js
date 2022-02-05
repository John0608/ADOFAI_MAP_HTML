var Level;  //adofai 파일 내용 저장
let file_name;

class Convert {
    SetSpeed() {
        let bpm = Level.settings.bpm;
        Level.actions.forEach(function (index) {
            if (index.eventType == "SetSpeed") {
                if (index.speedType == "Multiplier") {
                    let y_bpm = index.bpm;
                    index.speedType = "Bpm";
                    bpm = bpm * index.bpmMultiplier;
                    index.bpmMultiplier = 1;
                    index.beatsPerMinute = bpm;
                    addText(index.floor + "의 " + index.eventType + "이펙트의 BPM이 " + y_bpm + "에서 " + bpm + "으로 바뀜.")
                }
                else {
                    bpm = index.beatsPerMinute;
                }
            }

        });
    }
    Twirl() {

    }
    CustomBackground() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "CustomBackground") {
                if (effect_List.CustomBackground.bgDisplayMode.indexOf(index.bgDisplayMode) == -1) {
                    index.bgDisplayMode = "FitToScreen";
                }
            }
        });
    }
    ColorTrack() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "ColorTrack") {
                if (effect_List.ColorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    index.trackColorType = "Single";
                }
                if (effect_List.ColorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    index.trackColorPulse = "Forward";
                }
                if (effect_List.ColorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    index.trackStyle = "Standard";
                }
            }
        });
    }
    AnimateTrack() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "AnimateTrack") {
                if (effect_List.AnimateTrack.trackAnimation.indexOf(index.trackAnimation) == -1) {
                    index.trackAnimation = "None";
                }
                if (effect_List.AnimateTrack.trackDisappearAnimation.indexOf(index.trackDisappearAnimation) == -1) {
                    index.trackDisappearAnimation = "None";
                }
            }
        });
    }
    AddDecoration() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "AddDecoration") {
                if (effect_List.AddDecoration.relativeTo.indexOf(index.relativeTo) == -1) {
                    index.relativeTo = "Global";
                }
            }
        });
    }
    Flash() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "Flash") {
                if (effect_List.Flash.plane.indexOf(index.plane) == -1) {
                    index.plane = "Foreground";
                }
            }
        });
    }
    MoveCamera() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "MoveCamera") {
                if (effect_List.MoveCamera.relativeTo.indexOf(index.relativeTo) == -1) {
                    index.relativeTo = "Player";
                }
            }
        });
    }

    MoveTrack() {
        //안함 일부러 ㅋㅋ
    }

    HallOfMirrors() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "HallOfMirrors") {
                if (effect_List.HallOfMirrors.enabled.indexOf(index.enabled) == -1) {
                    index.enabled = "Enabled";
                }
            }
        });
    }

    SetHitsound() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "SetHitsound") {
                if (effect_List.SetHitsound.hitsound.indexOf(index.hitsound) == -1) {
                    index.hitsound = "Hat";
                }
            }
        });
    }
    RecolorTrack() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "RecolorTrack") {
                if (effect_List.RecolorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    index.trackColorType = "Single";
                }
                if (effect_List.RecolorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    index.trackColorPulse = "Forward";
                }
                if (effect_List.RecolorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    index.trackStyle = "Standard";
                }
            }
        });
    }
    SetFilter() {
        Level.actions.forEach(function (index) {
            if (index.eventType == "SetFilter") {
                if (effect_List.SetFilter.filter.indexOf(index.filter) == -1) {
                    index.filter = "Grayscale";
                    index.enabled = "Disabled";
                }
            }
        });
    }

    Pt2Mt()
    {
        let e = new Array();
        let array = [];
        e.floor = 1;
        e.eventType = "MoveTrack";
        e.duration = 0.1;
        e.positionOffset = [0,0];
        e.relativeTo = "Tile";
        e.rotation = 0;
        e.zoom = Level.settings.zoom;
        e.angleOffset = 0;
        e.ease = "Linear";
        Level.actions.forEach((a)=>{
            if(a.eventType == "PositionTrack") {
                console.log(a);
                e.positionOffset[0] += a.positionOffset[0];
                e.positionOffset[1] += a.positionOffset[1];
                array.push(e);
            }
            else {}
        })
        array.forEach(x=>{
            Level.actions.unshift(x);
        })
        console.log(array)
       

    }

    angle2path(){
        let path = "";
        Level.angleData.forEach((x)=> {
            let code;
            if(x >= 0) {
                code = adofai.path.indexOf(x);
            }
            else if (x < 0)
            {
                code = adofai.path.indexOf((x) + 360);
            }
            path += adofai.path[code];
        })
        delete Level.angleData;
        Level.pathData = path;
    }

}

class Vector {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

const effect_List = adofai.effect.List;
let con = new Convert();

window.onload = () => {
    FirstSetting();
}
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
            con.Pt2Mt(); //PositionTrack to MoveTrack
            con.SetSpeed();
            con.CustomBackground();
            con.ColorTrack();
            con.AnimateTrack();
            con.AddDecoration();
            con.Flash();
            con.MoveCamera();
            con.HallOfMirrors();
            con.SetHitsound();
            con.RecolorTrack();
            con.SetFilter();
            Remove_notsuport_effect();
            Remove_difference_key();
            mapsetting_to_basic_key();
            $(".down_btn").show();
        }
    }
    catch(e)
    {
        $(".error").show();
        $("#error_content").text(e.toString());
    }
    

}

function CustomConvert() //사용자 설정 변환
{
    alert("개발중인 기능입니다.")
    /*
    $(".modal").hide();
    if(isUpload() == true)
    {
        if($("#mapset").is(":checked") == true)
        {
            fix_setting_basic();
        }
            con.SetSpeed();
            con.CustomBackground();
            con.ColorTrack();
            con.AnimateTrack();
            con.AddDecoration();
            con.Flash();
            con.MoveCamera();
            con.HallOfMirrors();
            con.SetHitsound();
            con.RecolorTrack();
            con.SetFilter();
            Remove_notsuport_effect();
            Remove_difference_key();
            mapsetting_to_basic_key();
            $(".down_btn").show();
    } */
   
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
                        addText(level.eventType + "의 " + level_key[i] + "이(가) 삭제되었습니다!");
                        delete level[level_key[i]]
                    }
                }
            }
        })
    });
}

function mapsetting_to_basic_key()
{
    Object.keys(Level.settings).forEach((index) => {
        if(adofai.Setting.Key.indexOf(index) == -1)
        {
            delete Level.settings[index];
        }
        Level.settings.version = 2;
    })


}


function down_click() {
    if (isUpload() == true) {
        if(file_name.length == 0)
        {
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


function addText(str) {
    var a = $("#log").val()
    a = a + "\n" + str;
    $("#log").val(a);
}

function fix_setting_basic()
{
    Object.keys(adofai.Setting.basic_value).forEach(function (index) {
        Level.settings[index] = data.Setting.basic_value[index];
    })
}

function angle2path(angleData)
{
    let path = "";
    let angledat = angleData;
    //검사 진행
    angledat.forEach((x) => {
        if(Object.keys(adofai.path).indexOf(x.index) == -1)
        {
            alert("이 맵은 지원하지 않습니다.");
            return false;
        }
    })

}