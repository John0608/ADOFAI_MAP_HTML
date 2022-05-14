class Convert {
    adofai_data = 
    Level = null;
    constructor(level)
    {
        this.Level = level;
    }
    
    
    
    effect_List = adofai_data.effect.List;
    adofai = adofai_data;
    addText(arg0) {
        const ui = new Ui();
        ui.addLog(arg0);
    }

    SetSpeed() {
        let bpm = this.Level.settings.bpm;
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "SetSpeed") {
                if (index.speedType == "Multiplier") {
                    index.speedType = "Bpm";
                    bpm = bpm * index.bpmMultiplier;
                    index.bpmMultiplier = 1;
                    index.beatsPerMinute = bpm;
                    this.addText(index.floor + "의 " + index.eventType + "이펙트의 BPM이 " + index.bpm + "에서 " + bpm + "으로 바뀜.")
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
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "CustomBackground") {
                if (this.effect_List.CustomBackground.bgDisplayMode.indexOf(index.bgDisplayMode) == -1) {
                    index.bgDisplayMode = "FitToScreen";
                }
            }
        });
    }
    ColorTrack() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "ColorTrack") {
                if (this.effect_List.ColorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    index.trackColorType = "Single";
                }
                if (this.effect_List.ColorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    index.trackColorPulse = "Forward";
                }
                if (this.effect_List.ColorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    index.trackStyle = "Standard";
                }
            }
        });
    }
    AnimateTrack() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "AnimateTrack") {
                if (this.effect_List.AnimateTrack.trackAnimation.indexOf(index.trackAnimation) == -1) {
                    index.trackAnimation = "None";
                }
                if (this.effect_List.AnimateTrack.trackDisappearAnimation.indexOf(index.trackDisappearAnimation) == -1) {
                    index.trackDisappearAnimation = "None";
                }
            }
        });
    }
    AddDecoration() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "AddDecoration") {
                if (this.effect_List.AddDecoration.relativeTo.indexOf(index.relativeTo) == -1) {
                    index.relativeTo = "Global";
                }
                if(index.scale != undefined)
                {
                  delete index.scale;
                  this.addText(index.floor + "의 " + index.eventType + "의 scale은 지원되지 않아 제거됩니다.");
                }
            }
        });
    }
    Flash() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "Flash") {
                if (this.effect_List.Flash.plane.indexOf(index.plane) == -1) {
                    index.plane = "Foreground";
                }
            }
        });
    }
    MoveCamera() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "MoveCamera") {
                if (this.effect_List.MoveCamera.relativeTo.indexOf(index.relativeTo) == -1) {
                    index.relativeTo = "Player";
                }
            }
        });
    }

    MoveTrack() {
        //안함 일부러 ㅋㅋ
    }

    HallOfMirrors() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "HallOfMirrors") {
                if (this.effect_List.HallOfMirrors.enabled.indexOf(index.enabled) == -1) {
                    index.enabled = "Enabled";
                }
            }
        });
    }

    SetHitsound() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "SetHitsound") {
                if (this.effect_List.SetHitsound.hitsound.indexOf(index.hitsound) == -1) {
                    index.hitsound = "Hat";
                }
            }
        });
    }
    RecolorTrack() {
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "RecolorTrack") {
                if (this.effect_List.RecolorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    index.trackColorType = "Single";
                }
                if (this.effect_List.RecolorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    index.trackColorPulse = "Forward";
                }
                if (this.effect_List.RecolorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    index.trackStyle = "Standard";
                }
            }
        });
    }
    SetFilter() {
        this.Level.actions.forEach((index, num) => {
            if (index.eventType == "SetFilter") {
                if (this.effect_List.SetFilter.filter.indexOf(index.filter) == -1) {
                    this.addText(index.floor + "타일 필터 이벤트의 " + index.filter + "는 호환되지 않아 제거됩니다.");
                    this.Level.actions.splice(num, 1);
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
        this.Level.settings.version = 2;
        Object.keys(this.Level.settings).forEach((index) => {
            if (index == "hitsound" && this.adofai.Setting.List.hitsound.indexOf(this.Level.settings.hitsound) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "Hat 으로 변환됨.")
                this.Level.settings[index] = "Hat";
            }
            if (index == "separateCountdownTime" && this.adofai.Setting.List.separateCountdownTime.indexOf(this.Level.settings.separateCountdownTime) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                this.Level.settings[index] = "Enabled";
            }
            if (index == "trackColorType" && this.adofai.Setting.List.trackColorType.indexOf(this.Level.settings.trackColorType) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "Single 으로 변환됨.")
                this.Level.settings[index] = "Single";
            }
            if (index == "trackColorPulse" && this.adofai.Setting.List.trackColorPulse.indexOf(this.Level.settings.trackColorPulse) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "None 으로 변환됨.")
                this.Level.settings[index] = "None";
            }
            if (index == "trackStyle" && this.adofai.Setting.List.trackStyle.indexOf(this.Level.settings.trackStyle) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "Standard 으로 변환됨.")
                this.Level.settings[index] = "Standard";
            }
            if (index == "trackAnimation" && this.adofai.Setting.List.trackAnimation.indexOf(this.Level.settings.trackAnimation) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "None 으로 변환됨.")
                this.Level.settings[index] = "None";
            }
            if (index == "trackDisappearAnimation" && this.adofai.Setting.List.trackDisappearAnimation.indexOf(this.Level.settings.trackDisappearAnimation) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "None 으로 변환됨.")
                this.Level.settings[index] = "None";
            }
            if (index == "bgDisplayMode" && this.adofai.Setting.List.bgDisplayMode.indexOf(this.Level.settings.bgDisplayMode) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "FitToScreen 으로 변환됨.")
                this.Level.settings[index] = "FitToScreen";
            }
            if (index == "lockRot" && this.adofai.Setting.List.lockRot.indexOf(this.Level.settings.lockRot) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                this.Level.settings[index] = "Enabled";
            }
            if (index == "loopBG" && this.adofai.Setting.List.loopBG.indexOf(this.Level.settings.loopBG) == -1) {
                this.addText(index + "의 " + this.Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                this.Level.settings[index] = "Enabled";
            }

            else {
            }
        })
    }


    anglePath2pathData() {
        let path = "";
        this.Level.angleData.forEach((x) => {
            if (x >= 0) {
                path += this.adofai.path[x];
            }
            else if (x < 0) {
                path += this.adofai.path[(x) + 360];
            }
        })
        delete this.Level.angleData;
        this.Level.pathData = path;

    }

    issupportAngledata() {
        let result = this.Level.angleData.some(x => {
            return Object.keys(this.adofai.path).indexOf(x.toString()) == -1
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
        if (this.Level.pathData.replace(regex, "").length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    CheckTileAngleData()
    {
        if(this.Level.angleData == undefined)
        {
            return this.isSupportPathData();

        }
        else {
            return this.issupportAngledata();
        }
    }

  
}
