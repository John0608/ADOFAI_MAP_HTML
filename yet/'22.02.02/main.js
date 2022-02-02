var Level;  //adofai 파일 내용 저장
var isUpload; //업로드 여부 확인
var data = {
    "Setting": {
        "Key": [
            "version",
            "artist",
            "song",
            "author",
            "hitsound",
            "hitsoundVolume",
            "separateCountdownTime",
            "songFilename",
            "bpm",
            "volume",
            "offset",
            "pitch",
            "trackColorType",
            "trackColor",
            "secondaryTrackColor",
            "trackColorAnimDuration",
            "trackColorPulse",
            "trackPulseLength",
            "trackStyle",
            "trackAnimation",
            "beatsAhead",
            "trackDisappearAnimation",
            "beatsBehind",
            "backgroundColor",
            "bgImage",
            "bgImageColor",
            "parallax",
            "bgDisplayMode",
            "lockRot",
            "loopBG",
            "unscaledSize",
            "relativeTo",
            "position",
            "rotation",
            "zoom",
            "bgVideo",
            "loopVideo",
            "vidOffset",
            "floorIconOutlines",
            "stickToFloors",
            "planetEase"
        ],
        "value": {
            "hitsound": [],
            "trackColorType": [],
            "separateCountdownTime": ["Enabled", "Disabled"],
            "trackColorPulse": ["Forward", "Backward", "None"],
            "trackStyle": ["Standard", "Neon", "NeonLight", "Gems"],
            "trackAnimation": []
            //미완성 구역

        },
        "basic_value": {
            "version": 2,
            "hitsound": "Kick",
            "trackColorType": "Single",
            "trackColor": "debb7b",
            "secondaryTrackColor": "ffffff",
            "trackColorAnimDuration": 2,
            "trackColorPulse": "None",
            "trackPulseLength": 10,
            "trackStyle": "Standard",
            "trackAnimation": "None",
            "beatsAhead": 3,
            "trackDisappearAnimation": "None",
            "beatsBehind": 4,
            "backgroundColor": "000000",
            "bgImage": "",
            "bgImageColor": "ffffff",
            "parallax": [
                100,
                100
            ],
            "bgDisplayMode": "FitToScreen",
            "lockRot": "Disabled",
            "loopBG": "Disabled",
            "unscaledSize": 100,
            "relativeTo": "Player",
            "position": [
                0,
                0
            ],
            "rotation": 0,
            "zoom": 100,
            "bgVideo": "",
            "loopVideo": "Disabled",
            "vidOffset": 0,
            "floorIconOutlines": "Disabled",
            "stickToFloors": "Disabled",
            "planetEase": "Linear"
        }
    },
    "effect": {
        "List": {
            "SetSpeed": [
                "floor",
                "eventType",
                "speedType",
                "beatsPerMinute",
                "bpmMultiplier"
            ],
            "Twirl": [],
            "CustomBackground": [
                "floor",
                "eventType",
                "color",
                "bgImage",
                "imageColor",
                "parallax",
                "bgDisplayMode",
                "lockRot",
                "loopBG",
                "unscaledSize",
                "angleOffset"
            ],
            "ColorTrack": [
                "floor",
                "eventType",
                "trackColorType",
                "trackColor",
                "secondaryTrackColor",
                "trackColorAnimDuration",
                "trackColorPulse",
                "trackPulseLength",
                "trackStyle"
            ],
            "AnimateTrack": [
                "floor",
                "eventType",
                "trackAnimation",
                "beatsAhead",
                "trackDisappearAnimation",
                "beatsBehind"
            ],
            "AddDecoration": [
                "floor",
                "eventType",
                "decorationImage",
                "position",
                "relativeTo",
                "pivotOffset",
                "rotation",
                "scale",
                "depth",
                "tag"
            ],
            "Flash": [
                "floor",
                "eventType",
                "duration",
                "plane",
                "startColor",
                "startOpacity",
                "endColor",
                "endOpacity",
                "angleOffset"
            ],
            "MoveCamera": [
                "floor",
                "eventType",
                "duration",
                "relativeTo",
                "position",
                "rotation",
                "zoom",
                "angleOffset",
                "ease"
            ],
            "MoveTrack": [
                "floor",
                "eventType",
                "startTile",
                "endTile",
                "duration",
                "positionOffset",
                "rotationOffset",
                "scale",
                "opacity",
                "angleOffset",
                "ease"
            ],
            "HallOfMirrors": [
                "floor",
                "eventType",
                "enabled",
                "angleOffset"
            ],
            "ShakeScreen": [
                "floor",
                "eventType",
                "duration",
                "strength",
                "intensity",
                "fadeOut",
                "angleOffset"
            ],
            "SetPlanetRotation": [
                "floor",
                "eventType",
                "ease"
            ],
            "MoveDecorations": [
                "floor",
                "eventType",
                "duration",
                "tag",
                "positionOffset",
                "rotationOffset",
                "scale",
                "angleOffset",
                "ease"
            ]
        },
        "Settings_key": {
            "AddDecoration": {
                "relativeTo": [
                    "Global",
                    "Tile"
                ]
            },
            "ColorTrack": {
                "trackColorType": [
                    "Single",
                    "Stripes",
                    "Glow",
                    "Blink",
                    "Switch",
                    "Rainbow"
                ],
                "trackColorPulse": [
                    "Forward",
                    "Backward"
                ],
                "trackStyle": [
                    "Standard",
                    "Neon",
                    "NeonLight",
                    "Gems"
                ]
            },
            "Flash": {
                "plane": [
                    "Foreground",
                    "Background"
                ]
            }
        }
    }
}
var setting_List = ["version", "artist", "specialArtistType", "artistPermission", "song", "author", "separateCountdownTime", "previewImage", "previewIcon", "previewIconColor", "previewSongStart", "previewSongDuration", "seizureWarning", "levelDesc", "levelTags", "artistLinks", "difficulty", "songFilename", "bpm", "volume", "offset", "pitch", "hitsound", "hitsoundVolume", "countdownTicks", "trackColorType", "trackColor", "secondaryTrackColor", "trackColorAnimDuration", "trackColorPulse", "trackPulseLength", "trackStyle", "trackAnimation", "beatsAhead", "trackDisappearAnimation", "beatsBehind", "backgroundColor", "bgImage", "bgImageColor", "parallax", "bgDisplayMode", "lockRot", "loopBG", "unscaledSize", "relativeTo", "position", "rotation", "zoom", "bgVideo", "loopVideo", "vidOffset", "floorIconOutlines", "stickToFloors", "planetEase", "planetEaseParts"];

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
    const fileName = f.name;
    let ext = fileName.substring(fileName.lastIndexOf("."));
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
}

function FileSelcetInit() //Input File 초기화
{
    $(".file_select_btn").val("");
    $(".log_box").hide();
    $(".down_btn").hide();
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
    if (isUpload() == true) {
        fix();
        $(".down_btn").show();
    }
}

function CustomConvert() //사용자 설정 변환
{

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

class Convert {
    SetSpeed() {
        let bpm = Level.settings.bpm;
        Level.actions.forEach(function (index) {
            if (index.eventType == "SetSpeed") {
                if (index.speedType == "Multiplier") {
                    index.speedType = "Bpm";
                    bpm = bpm * index.bpmMultiplier;
                    index.bpmMultiplier = 1;
                    index.beatsPerMinute = bpm;
                }
                else {
                    bpm = index.beatsPerMinute;
                }
            }
            
        });
    }
    Twirl() {

    }
}




// 기존 Main.js

function fix() {
    Level.actions = Level.actions.filter(x => Object.keys(data.effect.List).includes(x.eventType)) //이펙트 필터링
    addText("이펙트 필터링 완료");
    fix_settings();
    addText("맵 설정 변경 완료")
    fix_actions();
    addText("이펙트 별 변환 완료");
    fix_BPM();

}

function down_click() {
    download("main.adofai", JSON.stringify(Level));
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

function fix_BPM() {
    let bpm = Level.settings.bpm;
    Level.actions.forEach(function (index) {
        if (index.eventType == "SetSpeed") {
            if (index.speedType == "Multiplier") {
                index.speedType = "Bpm";
                bpm = bpm * index.bpmMultiplier;
                index.bpmMultiplier = 1;
                index.beatsPerMinute = bpm;
            }
            else {
                bpm = index.beatsPerMinute;
            }
        }
    });
    addText("BPM 수정 완료")

}

function addText(str) {
    var a = $("#log").val()
    a = a + "\n" + str;
    $("#log").val(a);
}


function Remove_Keys(event_name, event_keys) {
    Level.actions.forEach(function (index) {
        if (index.eventType == event_name) {
            var key = Object.getOwnPropertyNames(index);
            console.log("Key :" + key.toString());
            for (var o = 0; o < key.length; o++) {
                if (event_keys.indexOf(key[o]) == -1) {
                    var result = delete index[key[o]];
                    addText(index.floor + "번째의 floor의 " + event_name + " 이펙트의 " + key[o] + "를 제거하였습니다.");
                    console.log(result);

                }
            }
        }
        else { }

    })
}

function fix_actions() {
    Object.keys(data.effect.List).forEach(function (index) {
        if (index != "Twirl") {
            const evtName = index;
            const evtArray = data.effect.List[index];
            Remove_Keys(evtName, evtArray);
        }
        addText(index + " 수정 완료")
    });


    //AddDecoration Fix
    Level.actions.forEach(function (index) {
        if (index.eventType == "AddDecoration" && data.effect.Settings_key.AddDecoration.relativeTo.indexOf(index.relativeTo) == -1) {
            index.relativeTo = "Tile";
        }

    })

}

function fix_settings() {
    Object.keys(Level.settings).forEach(function (index) {
        if (data.Setting.Key.indexOf(index) == -1) {
            delete Level.settings[index];
        }
    })
    Level.settings.version = 2;
}

function fix_setting_basic() {
    Object.keys(data.Setting.basic_value).forEach(function (index) {
        Level.settings[index] = data.Setting.basic_value[index];
    })
}




