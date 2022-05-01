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
                    addText(index.floor + "의 " + index.eventType + "이펙트의 BPM이 " + index.bpm + "에서 " + bpm + "으로 바뀜.")
                }
                else {
                    bpm = index.beatsPerMinute;
                }
            }

        });
    }
    Twirl() {
        return;
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
                if(index.scale != undefined)
                {
                  delete index.scale;
                  addText(index.floor + "의 " + index.eventType + "의 scale은 지원되지 않아 제거됩니다.");
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
        Level.actions.forEach((index, num) => {
            if (index.eventType == "SetFilter") {
                if (effect_List.SetFilter.filter.indexOf(index.filter) == -1) {
                    addText(index.floor + "타일 필터 이벤트의 " + index.filter + "는 호환되지 않아 제거됩니다.");
                    Level.actions.splice(num, 1);
                }
            }
        })
    }

    ShakeScreen() {

    }
    SetPlanetRotation() {

    }

    MoveDecorations() {

    }

    RepeatEvents() {

    }

    SetBasicMapSetting() {
        Level.settings.version = 2;
        Object.keys(Level.settings).forEach((index) => {
            if (index == "hitsound" && adofai.Setting.List.hitsound.indexOf(Level.settings.hitsound) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "Hat 으로 변환됨.")
                Level.settings[index] = "Hat";
            }
            if (index == "separateCountdownTime" && adofai.Setting.List.separateCountdownTime.indexOf(Level.settings.separateCountdownTime) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                Level.settings[index] = "Enabled";
            }
            if (index == "trackColorType" && adofai.Setting.List.trackColorType.indexOf(Level.settings.trackColorType) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "Single 으로 변환됨.")
                Level.settings[index] = "Single";
            }
            if (index == "trackColorPulse" && adofai.Setting.List.trackColorPulse.indexOf(Level.settings.trackColorPulse) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "None 으로 변환됨.")
                Level.settings[index] = "None";
            }
            if (index == "trackStyle" && adofai.Setting.List.trackStyle.indexOf(Level.settings.trackStyle) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "Standard 으로 변환됨.")
                Level.settings[index] = "Standard";
            }
            if (index == "trackAnimation" && adofai.Setting.List.trackAnimation.indexOf(Level.settings.trackAnimation) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "None 으로 변환됨.")
                Level.settings[index] = "None";
            }
            if (index == "trackDisappearAnimation" && adofai.Setting.List.trackDisappearAnimation.indexOf(Level.settings.trackDisappearAnimation) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "None 으로 변환됨.")
                Level.settings[index] = "None";
            }
            if (index == "bgDisplayMode" && adofai.Setting.List.bgDisplayMode.indexOf(Level.settings.bgDisplayMode) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "FitToScreen 으로 변환됨.")
                Level.settings[index] = "FitToScreen";
            }
            if (index == "lockRot" && adofai.Setting.List.lockRot.indexOf(Level.settings.lockRot) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                Level.settings[index] = "Enabled";
            }
            if (index == "loopBG" && adofai.Setting.List.loopBG.indexOf(Level.settings.loopBG) == -1) {
                addText(index + "의 " + Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                Level.settings[index] = "Enabled";
            }

            else {
            }
        })
    }


    Pt2Mt() {
        let array = [];
        let pos = [0, 0];
        Level.actions.forEach((a) => {
            if (a.eventType == "PositionTrack") {
                let e = new Array();
                e.floor = 1;
                e.eventType = "MoveTrack",
                    e.startTile = [0, "ThisTile"],
                    e.startTile[0] = a.floor;
                e.endTile = [0, "End"],
                    e.duration = 1,
                    pos[0] += a.positionOffset[0];
                pos[1] += a.positionOffset[1];
                e.positionOffset = [pos[0], pos[1]]
                e.rotationOffset = 0,
                    e.scale = 100,
                    e.opacity = 100,
                    e.angleOffset = 0,
                    e.ease = "Linear";
                array.push(e);
            }
            else { }
        })
        array.forEach(x => {
            Level.actions.unshift(x);
        })
        console.log(array)


    }

    anglePath2pathData() {
        let path = "";
        Level.angleData.forEach((x) => {
            if (x >= 0) {
                path += adofai.path[x];
            }
            else if (x < 0) {
                path += adofai.path[(x) + 360];
            }
        })
        delete Level.angleData;
        Level.pathData = path;

    }

    issupportAngledata() {
        let result = Level.angleData.some(x => {
            return Object.keys(adofai.path).indexOf(x.toString()) == -1
        })

        if(result == true) {
            return false;
        }
        else {
            return true;
        }
    }

    isSupportPathData() {
        let regex = /R|J|E|T|U|G|Q|H|L|N|Z|F|D|B|C|M|!/g;
        if (Level.pathData.replace(regex, "").length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    CheckTileAngleData()
    {
        if(Level.angleData == undefined)
        {
            return this.isSupportPathData();

        }
        else {
            return this.issupportAngledata();
        }
    }

    SetCustomEffect() {
        let effect_arr = new Array();
        $("input[name=mapeff]:checked").each(function (i) {
            effect_arr.push($(this).val())

        })
        effect_arr.forEach(x => {
            // console.log(x);
            convert_map(x)
        })
        Level.actions = Level.actions.filter(x => Object.keys(effect_arr).includes(x.eventType));
        function convert_map(effect_list) {
            const adofai = new Convert();
            switch (effect_list) {
                case 'SetSpeed':
                    adofai.SetSpeed();
                    break;
                case 'Twirl':
                    adofai.Twirl();
                    break;

                case 'CustomBackground':
                    adofai.CustomBackground();
                    break;

                case 'ColorTrack':
                    adofai.ColorTrack();
                    break;

                case 'AnimateTrack':
                    adofai.AnimateTrack();
                    break;

                case 'AddDecoration':
                    adofai.AddDecoration();
                    break;

                case 'Flash':
                    adofai.Flash();
                    break;

                case 'MoveCamera':
                    adofai.MoveCamera();
                    break;

                case 'MoveTrack':
                    adofai.MoveCamera();
                    break;

                case 'HallOfMirrors':
                    adofai.HallOfMirrors();
                    break;

                case 'ShakeScreen':
                    //뭐야 왜 없어
                    break;

                case 'SetPlanetRotation':
                    //뭐야 이것도 없네
                    break;

                case 'MoveDecorations':
                    //왜 없지
                    break;

                case 'SetHitsound':
                    adofai.SetHitsound();
                    break;

                case 'RecolorTrack':
                    adofai.RecolorTrack();
                    break;

                case 'SetFilter':
                    adofai.SetFilter();
                    break;

                case 'RepeatEvents':
                    //이것도 없어;;
                    break;

                default:
                    break;
            }
        }

    }
}
