// "AnimateTrack ChangeTrack CustomBackground SetHitsound RecolorTrack" 도움받기
var Level;
var obj;
var FileName = "main.adofai";
var effect = {
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
            "SetSpeed": [
                "floor",
                "eventType",
                "speedType",
                "beatsPerMinute",
                "bpmMultiplier"
            ],
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
var ul_list = $(".ul_list");

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

    const input = document.querySelector('#file_select_btn')
    const f = input.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = (evt) => {
        const level = parseLevel(evt.target.result)
        Level = level;
        $(".console").show();
        //fix();

    }
    reader.onerror = () => {
        return alert('error reading file')
    }
    reader.readAsText(f, 'UTF-8')
}

function fix() {
    Level.actions = Level.actions.filter(x => Object.keys(effect.List).includes(x.eventType)) //이펙트 필터링
            
    if($("#map_basic").is(":checked") == true)
    {
        fix_setting_basic();
    }
    fix_actions();
    fix_BPM();
    document.querySelector('.download').style.display = 'block';
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

    var ul_list = $(".ul_list");
    ul_list.append("<li>" + str + "</li>");
}


function Remove_Keys(event_name, event_keys) {
    Level.actions.forEach(function (index) {
        if (index.eventType == event_name) {
            var key = Object.getOwnPropertyNames(index);
            console.log("Key :" + key.toString());
            for (var o = 0; o < key.length; o++) {
                if (event_keys.indexOf(key[o]) == -1) {
                    var result = delete index[key[o]];
                    console.log(result);

                }
            }
        }
        else { }

    })
}

function fix_actions() {
    Object.keys(effect.effect.List).forEach(function (index) {
        const evtName = index;
        const evtArray = effect.effect.List[index];
        Remove_Keys(evtName, evtArray);
        addText(index + " 수정 완료")
    });


    //AddDecoration Fix
    Level.actions.forEach(function(index){
        if(index.eventType == "AddDecoration" && effect.Setting.AddDecoration.relativeTo.indexOf(index.relativeTo) == -1)
        {
            index.relativeTo = "Tile";
        }
        
    })

}

function fix_settings()
{
    Object.keys(Level.settings).forEach(function (index) {
        if(effect.Setting.Key.indexOf(index) == -1)
         {
             delete Level.settings[index];
         }
    })
}

function fix_setting_basic()
{
    Object.keys(effect.Setting.basic_value).forEach(function (index) {
        Level.settings[index] = effect.Setting.basic_value[index];
    })
}


/*      먼저 만든 키 제거기
function Remove_Keys(event_name, event_keys) {
    var actions_length = Level.actions.length;  //actions 길이
    for (var i = 0; i < actions_length; i++)     //actions 길이만큼 반복
    {
        if (Level.actions[i].eventType == event_name) {
            var key = Object.getOwnPropertyNames(Level.actions[i]);
            console.log("Key :" + key.toString());
            for (var o = 0; o < key.length; o++) {
                if (event_keys.indexOf(key[o]) == -1) {
                    var result = delete Level.actions[i][key[o]];
                    console.log(result);

                }
            }
        }
        else { }
    }
}
*/