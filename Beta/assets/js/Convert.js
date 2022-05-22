class Convert {
    Level = null;
    ui = new Ui();
    effect_List = adofai.effect.List;
    effect_array = null;

    FastConvert(level, file) {
        const File = file;
        this.Level = level;        //레벨 파일

        const effect = ["SetSpeed", "Twirl"];
        this.Level.actions = this.Level.actions.filter(x => effect.includes(x.eventType));
        console.log("원래 actions 길이" + this.Level.actions.length);

        this.ui.HideLevelSelector()
        this.ui.ShowLog();
        this.ui.addLog("Version : " + this.Level.settings.version);
        this.ui.addLog("Tile Length : " + this.Level.angleData.length);
        //this.SetBasicMapSetting();
        this.effect_array = this.Effect_sclice_for_Floor(this.Level);
        test = this.effect_array;
        this.SetSpeed();
        if (this.Distinction_Data(level) == "angle") {
            let result = this.Edit_AngleData_to_PathData();
            console.log("바뀐 actions 길이" + this.Level.actions.length);
            return result;
        }
        else { alert("기능 개발중"); return; }

    }

    addText(arg0) {
        const ui = new Ui();
        ui.addLog(arg0);
    }

    Edit_AngleData_to_PathData() //angleData 일 경우에만 사용 가능.
    {
        const supportPathData = this.SetPathData_To_Number();
        let angle = this.Level.angleData;
        let editangle = [];
        let change_angle = null;
        let setBpm_index = null;    //SetSpeed 위치
        let change_bpm = null;      //바뀐 Bpm
        let setBpm = null;          //원래 Bpm

        console.log(angle);
        angle.forEach(function (currentValue, index) {  //currentValue : 각도, index : floor

            let eft_length = convert.effect_array[index].length;
            if (Number(eft_length) > 0) {
                convert.effect_array[index].forEach(function (currentValue, index) {
                    if (currentValue.eventType == "SetSpeed") {
                        setBpm_index = index;
                        setBpm = currentValue.beatsPerMinute;
                    }
                })
            }


            if (supportPathData.indexOf(currentValue) == -1) {
                change_angle = convert.getCloseAngle(currentValue);
                console.log("change angle : " + currentValue + "->" + change_angle + ", floor : " + index);
                editangle.push(change_angle);
                ui.addLog(currentValue + "에서 " + change_angle + "로 바뀜")
                if (change_angle > currentValue) {
                    change_bpm = setBpm / (currentValue / change_angle);
                    convert.set_SetSpeed(index, change_bpm);
                    convert.set_SetSpeed((index + 1), setBpm);
                }
                else if (change_angle < currentValue) {
                    change_bpm = setBpm * (change_angle / currentValue);
                    convert.set_SetSpeed(index, change_bpm);
                    convert.set_SetSpeed((index + 1), setBpm);
                }
            }
            else {
                editangle.push(currentValue);
            }

        })


        let eft_data = new Array();     //effect_array를 actions에 넣기 위한 준비.
        for (let i = 0; i < this.effect_array.length; i++) {
            if (this.effect_array[i].length != 0) {
                for (let j = 0; j <= this.effect_array[i].length; j++) {
                    if (this.effect_array[i][j] != undefined) {
                        eft_data.push(this.effect_array[i][j]);
                    }
                }

            }
        }
        this.Level.actions = eft_data;

        let path = "";
        editangle.forEach((x) => {
            //console.log(x, adofai.path[x])
            path += adofai.path[x]
        })
        delete this.Level.angleData;
        this.Level.pathData = path;

        return this.Level;

    }

    SetPathData_To_Number() {
        let angle = Object.keys(adofai.path);
        angle.forEach(function (currentValue, index) {
            angle[index] = Number(currentValue);
        })
        console.log(angle);
        console.log(typeof (angle[1]));
        return angle;
    }

    getCloseAngle(nowangle) {
        var data = Object.keys(adofai.path);
        var target = String(nowangle); // 현재 각도와 가장 가까운 값
        var near = 0;
        var abs = 0;
        var min = 345; // 해당 범위에서 가장 큰 값

        for (var i = 0; i < data.length; i++) {
            abs = ((data[i] - target) < 0) ? - ((data[i]) - target) : (data[i] - target);
            if (abs < min) {
                min = abs;
                near = data[i];
            }
        }
        return Number(near);
    }
    set_SetSpeed(Floor, bpm) {
        let isSetSpeed = false;
        let eft_index = null;
        let floor = Floor;
        let template = { "floor": floor, "eventType": "SetSpeed", "beatsPerMinute": bpm };
        if (convert.effect_array[floor] != []) {
            convert.effect_array[floor].forEach(function (currentValue, index) {
                if (currentValue.eventType == "SetSpeed") {
                    isSetSpeed = true;
                    eft_index = index;
                    currentValue.beatsPerMinute = bpm;
                }
                console.log("edit floor : " + floor + ", bpm : " + bpm);
            })
            if(!isSetSpeed)
            {
                convert.effect_array[floor].unshift(template);
            }
        }
        else if (convert.effect_array[floor] == []) {
            convert.effect_array[floor] = [];
            convert.effect_array[floor].unshift(template);
            console.log("new floor : " + floor + ", bpm : " + bpm);
            return;
        }



    }


    Effect_sclice_for_Floor(Level) {
        const level = Level;
        const Tilenum = level.angleData.length + 1;
        let effect_array = new Array(Tilenum);
        for (let i = 0; i < Tilenum; i++)    //배열 안에 배열 넣기
        {
            effect_array[i] = [];
        }
        console.log(effect_array);
        level.actions.forEach((index) => {
            effect_array[index.floor].push(index);
        })

        return effect_array;
    }

    Distinction_Data(level) {
        const Level = level;
        if (Level.pathData == undefined) {
            return "angle";
        }
        else return "path";
    }


    SetSpeed() {
        let bpm = this.Level.settings.bpm;
        const ui = new Ui();
        this.Level.actions.forEach(function (index) {
            if (index.eventType == "SetSpeed") {
                if (index.speedType == "Multiplier") {
                    index.speedType = "Bpm";
                    bpm = bpm * index.bpmMultiplier;
                    index.bpmMultiplier = 1;
                    index.beatsPerMinute = bpm;
                    ui.addLog(index.floor + "의 " + index.eventType + "이펙트의 BPM이 " + index.bpm + "에서 " + bpm + "으로 바뀜.")
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
                if (index.scale != undefined) {
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

        if (result == true) {
            return false;
        }
        else {
            return true;
        }
    }

    isSupportPathData(level) {
        let regex = /R|J|E|T|U|G|Q|H|L|N|Z|F|D|B|C|M|!/g;
        if (level.pathData.replace(regex, "").length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    CheckTileAngleData() {
        if (this.Level.angleData == undefined) {
            return this.isSupportPathData();

        }
        else {
            return this.issupportAngledata();
        }
    }


}
