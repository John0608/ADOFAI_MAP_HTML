class Convert {
    Level = null;
    ui = new Ui();
    effect_List = adofai.effect.List;
    effect_array = null;
    Temp_effect_array = ["SetSpeed", "Twirl"];

    FastConvert(level) {
        this.Level = level;        //레벨 파일
        let result = null;          //Level TileData result
        this.SetSpeed();

        this.ui.HideLevelSelector()
        this.ui.ShowLog();

        console.log("원래 actions 길이" + this.Level.actions.length);
        this.Level.actions = this.Level.actions.filter(x => Object.keys(this.Temp_effect_array).includes(x.eventType));
        this.ui.addLog("Version : " + this.Level.settings.version);
        if (this.Distinction_Data(level) == "angle") {
            this.ui.UpdateStatus("타일 타입 구분중...")
            this.ui.addLog("Tile Length : " + this.Level.angleData.length);
            result = this.Level.angleData;

        }
        else if (this.Distinction_Data(level) == "path") {
            this.ui.UpdateStatus("타일 타입 구분중...")
            this.ui.addLog("Tile Length : " + this.Level.pathData.length);
            result = this.Level.pathData;
            result = this.Edit_PathData_to_AngleData(result);
        }
        this.effect_array = this.Effect_sclice_for_Floor(this.Level);
        result = this.Edit_AngleData_to_PathData(result);
        console.log("바뀐 actions 길이" + this.Level.actions.length);
        return result;
        //this.SetBasicMapSetting();

    }

    FastConvert2(level) {
        let Level = level;              //레벨 파일
        let Level_TileData = null;      //레벨의 타일 각도 데이터
        let actions_array = null;       //레벨의 actions를 타일별 배열로 변환한 변수
        const actions_filter = ["SetSpeed", "Twirl"];

        if (this.Distinction_Data(level) == "angle") {
            Level_TileData = Level.angleData;                                    //AngleData를 전역변수로 지정
        }
        else if (this.Distinction_Data(level) == "path") {
            Level_TileData = Level.pathData;                                    //PathData를 할당
            Level_TileData = this.Edit_PathData_to_AngleData(Level);   //PathData를 AngleData로 변환
            delete Level.pathData;                                              //pathData를 angleData로 변경
            Level.angleData = Level_TileData;
        }

        Level.actions = Level.actions.filter(                              //테스트이므로, BPM설정과 소용돌이만 필터링.
            x => actions_filter.includes(x.eventType)
        );

        actions_array = this.Effect_sclice_for_Floor(Level);                         //타일 별 배열 만듬.
        console.log(Level);
        Level = this.Edit_AngleData2PathData2_and_BPM(Level, actions_array);

        return Level;
    }

    Edit_AngleData2PathData2_and_BPM(level, actions_array) //AngleData를 PathData로 만들어줌.
    {
        const Support_angle = this.SetPathData_To_Number();
        let Level = level;                                              //Level 파일
        let AngleData = Level.angleData;                                //레벨 내 angleData
        let Slice_from_actions = actions_array;
        let currentBpm = Number(Level.settings.bpm);
        let Edited_Bpm = null;

        AngleData.forEach(function (currentValue, index) {
            //currentValue : 각도, index : floor

            const currentAngle = Number(currentValue);                          //현재 각도
            const CloseAngle = Number(convert.getCloseAngle(currentAngle));     //변경된 각도
            if(convert.Find_Bpm(Slice_from_actions, index) != false)
            {
                currentBpm = convert.Find_Bpm(Slice_from_actions, index);                   //현재BPM 최신화
            }

            //먼저 각도 사이 계산을 해 BPM 수정.
            if (Support_angle.indexOf(currentAngle) == -1) {
                console.log("지원되지 않는 각도 : " + currentAngle)
                if (CloseAngle > currentAngle) {
                    Edited_Bpm = currentBpm / (currentAngle / CloseAngle);
                    Slice_from_actions = convert.Set_Bpm(Slice_from_actions, index, Edited_Bpm, true)
                    Slice_from_actions = convert.Set_Bpm(Slice_from_actions, index + 1, currentBpm, false)
                }
                else if (CloseAngle < currentAngle) {
                    Edited_Bpm = currentBpm * (CloseAngle / currentAngle);
                    Slice_from_actions = convert.Set_Bpm(Slice_from_actions, index, Edited_Bpm, true)
                    Slice_from_actions = convert.Set_Bpm(Slice_from_actions, index + 1, currentBpm, false)
                }
                AngleData[index] = CloseAngle;
            }
            else if (Support_angle.indexOf(currentValue) != -1) {
                return;
            }
        })

        Level.angleData = AngleData;
        Level.actions = this.Combine_action(Slice_from_actions);

        return Level;
    }

    Combine_action(arr_effects)
    {
        let arr_effect = arr_effects;
        let eft_data = new Array();     //effect_array를 actions에 넣기 위한 준비.
        for (let i = 0; i < this.arr_effect.length; i++) {
            if (this.arr_effect[i].length != 0) {
                for (let j = 0; j <= this.arr_effect[i].length; j++) {
                    if (this.arr_effect[i][j] != undefined) {
                        eft_data.push(this.arr_effect[i][j]);
                    }
                }

            }
        }
        return eft_data;
    }

    Set_Bpm(effect_array, floor, bpm, is_compulsion) {
        let template = { "floor": floor, "eventType": "SetSpeed", "beatsPerMinute": bpm };
        let effect = effect_array;
        let is_SetSpeed = false;
        let array_index = 0;                            //이펙트 위치 기억
        if (effect[floor].length == 0)             //이펙트 길이가 0일때
        {
            effect[floor].push(template);         //SetSpeed 설정.
        }
        else if (effect[floor].length != 0)        //이펙트 길이가 0이 아닐 때
        {
            effect[floor].forEach(function (currentValue, index) {
                if (currentValue.eventType == "SetSpeed") {             //SetSpeed 가 존재할때
                    is_SetSpeed = true;                                 //is_SetSpeed를 참으로 변환
                    array_index = index;
                }
            });

            if (!is_SetSpeed)                                            //SetSpeed가 없을 때
            {
                effect[floor].push(template);
            }
            else if (is_SetSpeed && is_compulsion == true)                                        //SetSpeed가 있으나 강제적일 경우
            {
                effect[floor].beatsPerMinute = bpm;
            }
            else if (is_SetSpeed && is_compulsion == false)                                        //SetSpeed가 있을 때
            {
                return;
            }
        }
        return effect;

    }

    Find_Bpm(effect_arr, index) {
        let effect_array = effect_arr;
        let effect_num = index;
        console.log(effect_array[effect_num]);
        let nowEffect = effect_array[effect_num];
        let is_SetSpeed = false;
        let arr_index = 0;
        if (nowEffect.length == 0) {
            return;
        }
        else {
            nowEffect.forEach(function (currentValue, index) {
                if (currentValue.eventType == "SetSpeed") {             //SetSpeed 가 존재할때
                    is_SetSpeed = true;                                 //is_SetSpeed를 참으로 변환
                    arr_index = index;
                }
            });

            if(is_SetSpeed == true)
            {
                return nowEffect[arr_index].beatsPerMinute;
            }
            else {
                return false;
            }
        }
    }

    addText(arg0) {
        const ui = new Ui();
        ui.addLog(arg0);
    }

    Edit_AngleData_to_PathData(angleData) //angleData 일 경우에만 사용 가능.
    {
        const ui = new Ui();
        const supportPathData = this.SetPathData_To_Number();
        let angle = angleData;
        let editangle = [];
        let change_angle = null;
        let setBpm_index = null;    //SetSpeed 위치
        let change_bpm = null;      //바뀐 Bpm
        let setBpm = null;          //원래 Bpm
        let angleLength = angle.length;

        angle.forEach(function (currentValue, index) {  //currentValue : 각도, index : floor
            ui.UpdateStatus(index + "번째 타일을 수정하는 중...")
            ui.UpdateProgress(Number((index / angleLength) * 100));
            let arrayIndex = index;
            let eft_length = convert.effect_array[index].length;
            if (Number(eft_length) > 0) {
                convert.effect_array[index].forEach(function (currentValue, index) {
                    if (currentValue.eventType == "SetSpeed") {
                        setBpm_index = index;
                        setBpm = convert.effect_array[arrayIndex][index].beatsPerMinute;
                    }
                })
            }


            if (supportPathData.indexOf(currentValue) == -1) {
                currentValue = Number(currentValue);
                change_angle = Number(convert.getCloseAngle(currentValue));
                console.log("change angle : " + currentValue + "->" + change_angle + ", floor : " + index);
                editangle.push(change_angle);
                ui.addLog(currentValue + "에서 " + change_angle + "로 바뀜")
                if (change_angle > currentValue) {
                    change_bpm = Number(setBpm) / (currentValue / change_angle);
                    convert.set_SetSpeed(index, change_bpm);
                    convert.set_SetSpeed((index + 1), setBpm);
                    return;
                }
                else if (change_angle < currentValue) {
                    change_bpm = setBpm * (change_angle / currentValue);
                    convert.set_SetSpeed(index, change_bpm);
                    convert.set_SetSpeed((index + 1), setBpm);
                    return;
                }
            }
            else if (supportPathData.indexOf(currentValue) != -1) {
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

    Edit_PathData_to_AngleData(Level) {
        const data = Array.from(Level.pathData);
        const value = Object.values(adofai.editpath);
        const angle = Object.keys(adofai.editpath);
        let result = new Array();
        data.forEach((x) => {
            let d = value.indexOf(x);
            result.push(angle[d]);
        })
        return result;
    }

    SetPathData_To_Number() {
        let angle = Object.keys(adofai.path);
        angle.forEach(function (currentValue, index) {
            angle[index] = Number(currentValue);
        })
        console.log(angle);
        return angle;
    }

    getCloseAngle(nowangle) {             //바꾸려는 각도의 가장 가까운 각도를 찾아줌.
        var data = Object.keys(adofai.path);
        var target = nowangle; // 현재 각도와 가장 가까운 값
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
    set_SetSpeed(Floor, Bpm, compulsion) {
        let bpm = Number(Bpm);
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
            if (!isSetSpeed) {
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
        const level = Level;                                //변하지 않음으로 Level 변수를 고정
        let Tilenum = 0;                                    //타일 수
        if (this.Distinction_Data(level) == "angle") {      //AngleData라면 
            Tilenum = level.angleData.length + 1;
        }
        else if (this.Distinction_Data(level) == "path")     //PathData라면?
        {
            Tilenum = level.pathData.length + 1;
        }
        let effect_array = new Array(Tilenum);
        for (let i = 0; i < Tilenum; i++)                   //배열 안에 배열 넣기
        {
            effect_array[i] = [];
        }
        level.actions.forEach((index) => {
            effect_array[index.floor].push(index);
        })

        return effect_array;                                //생성한 2차원 배열을 리턴.
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
