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
                    addText(index.floor + "의 " + eventType + "이펙트의 BPM이 " + y_bpm + "에서 " + bpm + "으로 바뀜.")
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



}

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
        "basic_value": {
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
            "SetSpeed": {
                "floor": [],
                "eventType": [],
                "beatsPerMinute": []
            },
            "Twirl": {
                "floor": [],
                "eventType": []
            },
            "CustomBackground": {
                "floor": [],
                "eventType": [],
                "color": [],
                "bgImage": [],
                "imageColor": [],
                "parallax": [],
                "bgDisplayMode": ["FitToScreen", "Unscaled", "Tiled"],
                "lockRot": ["Enabled", "Disabled"],
                "loopBG": ["Enabled", "Disabled"],
                "unscaledSize": [],
                "angleOffset": []
            },
            "ColorTrack": {
                "floor": [],
                "eventType": [],
                "trackColorType": ["Single",
                    "Stripes",
                    "Glow",
                    "Blink",
                    "Switch",
                    "Rainbow"],
                "trackColor": [],
                "secondaryTrackColor": [],
                "trackColorAnimDuration": [],
                "trackColorPulse": ["Forward",
                    "Backward"],
                "trackPulseLength": [],
                "trackStyle": ["Standard",
                    "Neon",
                    "NeonLight",
                    "Gems"]
            },
            "AnimateTrack": {
                "floor": [],
                "eventType": [],
                "trackAnimation": ["None", "Assemble", "Assemble_Far", "Extend", "Grow", "Grow_Spin", "Fade"],
                "beatsAhead": [],
                "trackDisappearAnimation": ["Scatter", "Scatter_Far", "Retract", "Shrink", "Shrink_Spin", "Fade"],
                "beatsBehind": []
            },
            "AddDecoration": {
                "floor": [],
                "eventType": [],
                "decorationImage": [],
                "position": [],
                "relativeTo": ["Global",
                    "Tile"],
                "pivotOffset": [],
                "rotation": [],
                "scale": [],
                "depth": [],
                "tag": []
            },
            "Flash": {
                "floor": [],
                "eventType": [],
                "duration": [],
                "plane": ["Foreground",
                    "Background"],
                "startColor": [],
                "startOpacity": [],
                "endColor": [],
                "endOpacity": [],
                "angleOffset": []
            },
            "MoveCamera": {
                "floor": [],
                "eventType": [],
                "duration": [],
                "relativeTo": ["Global",
                    "Tile", "Player"],
                "position": [],
                "rotation": [],
                "zoom": [],
                "angleOffset": [],
                "ease": []
            },
            "MoveTrack": {
                "floor": [],
                "eventType": [],
                "startTile": ["ThisTile", "Start", "End"],
                "endTile": ["ThisTile", "Start", "End"],
                "duration": [],
                "positionOffset": [],
                "rotationOffset": [],
                "scale": [],
                "opacity": [],
                "angleOffset": [],
                "ease": []
            },
            "HallOfMirrors": {
                "floor": [],
                "eventType": [],
                "enabled": ["Enabled", "Disabled"],
                "angleOffset": []
            },
            "ShakeScreen": {
                "floor": [],
                "eventType": [],
                "duration": [],
                "strength": [],
                "intensity": [],
                "fadeOut": [],
                "angleOffset": []
            },
            "SetPlanetRotation": {
                "floor": [],
                "eventType": [],
                "ease": []
            },
            "MoveDecorations": {
                "floor": [],
                "eventType": [],
                "duration": [],
                "tag": [],
                "positionOffset": [],
                "rotationOffset": [],
                "scale": [],
                "angleOffset": [],
                "ease": []
            },
            "SetHitsound": {
                "floor": [],
                "eventType": [],
                "hitsound": ["Hat", "Kick", "Shaker", "Sizzle", "Chuck", "None"],
                "hitsoundVolume": []
            },
            "RecolorTrack": {
                "floor": [],
                "eventType": [],
                "startTile": ["ThisTile", "Start", "End"],
                "endTile": ["ThisTile", "Start", "End"],
                "trackColorType": ["Single",
                    "Stripes",
                    "Glow",
                    "Blink",
                    "Switch",
                    "Rainbow"],
                "trackColor": [],
                "secondaryTrackColor": [],
                "trackColorAnimDuration": [],
                "trackColorPulse": ["Forward",
                    "Backward"],
                "trackPulseLength": [],
                "trackStyle": ["Standard",
                    "Neon",
                    "NeonLight",
                    "Gems"],
                "angleOffset": []
            },
            "SetFilter": {
                "floor": [],
                "eventType": [],
                "filter": ["Grayscale", "Sepia", "Invert", "VHS", "EightiesTV", "FiftiesTV", "Arcade", "LED", "Rain", "Blizzard", "PixelSnow", "Compression", "Glitch", "Pixelate", "Waves", "Drawing", "Neon", "Handheld", "NightVision", "Weird3D"],
                "enabled": ["enabled", "disabled"],
                "intensity": [],
                "disableOthers": ["Enabled", "Disabled"],
                "angleOffset": []
            },
            "RepeatEvents": {
                "floor": [],
                "eventType": [],
                "repetitions": [],
                "interval": []
            }
        }
    },
    "path": "RJETUGQHLNZFDBCM"
}
const effect_List = data.effect.List;
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
}

function FileSelcetInit() //Input File 초기화
{
    $(".file_select_btn").val("");
    $(".log_box").hide();
    $(".down_btn").hide();
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
    if (isUpload() == true) {
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

function CustomConvert() //사용자 설정 변환
{
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
        if(data.Setting.indexOf(index) == -1)
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
    Object.keys(data.Setting.basic_value).forEach(function (index) {
        Level.settings[index] = data.Setting.basic_value[index];
    })
}