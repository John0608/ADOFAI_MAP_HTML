class Convert {
    Levels = null;
    effect_List = adofai.effect.List;
    effect_array = null;

    FastConvert(level) {
        let Level = level;              //레벨 파일
        let Level_TileData = null;      //레벨의 타일 각도 데이터
        let actions_array = null;       //레벨의 actions를 타일별 배열로 변환한 변수


        if (this.Distinction_Data(level) == "path") {
            Level_TileData = Level.pathData;                                    //PathData를 할당
            Level_TileData = this.Edit_PathData_to_AngleData(Level);   //PathData를 AngleData로 변환
            delete Level.pathData;                                              //pathData를 angleData로 변경
            Level.angleData = Level_TileData;
        }



        Level = this.SetSpeed(Level);       //먼저 SetSpeed를 처리해줌
        actions_array = this.Effect_sclice_for_Floor(Level);                         //타일 별 배열 만듬.
        console.log(Level);
        Level = this.Edit_AngleData2PathData2_and_BPM(Level, actions_array);
        Level = this.SetBasicMapSetting(Level);
        Level = this.CustomBackground(Level);
        Level = this.ColorTrack(Level)
        Level = this.AnimateTrack(Level)
        Level = this.AddDecoration(Level)
        Level = this.Flash(Level)
        Level = this.MoveCamera(Level)
        Level = this.MoveTrack(Level)
        Level = this.HallOfMirrors(Level)
        Level = this.SetHitsound(Level)
        Level = this.RecolorTrack(Level)
        Level = this.SetFilter(Level)
        Level = this.ShakeScreen(Level)
        Level = this.SetPlanetRotation(Level)
        Level = this.MoveDecorations(Level)
        Level = this.RepeatEvents(Level);
        console.log(Level);
        Level = this.Remove_notsuport_effect(Level);
        Level = this.SetBasicMapSetting(Level);
        return Level;
    }

    Remove_notsuport_effect(level) {
        let Level = level;
        console.log(Level);
        Level.actions = Level.actions.filter(x => Object.keys(adofai.effect.List).includes(x.eventType));
        return Level;
    }

    Edit_AngleData2PathData2_and_BPM(level, actions_array) //AngleData를 PathData로 만들어줌.
    {
        const Support_angle = this.SetPathData_To_Number();
        let Slice_from_actions = actions_array;
        let Level = level;                                              //Level 파일
        let AngleData = Level.angleData;                                //레벨 내 angleData
        let Final_AngleData = [];
        let currentBpm = Number(Level.settings.bpm);
        var Edited_Bpm = 0;

        AngleData.forEach(function (currentValue, index) {
            //currentValue : 각도, index : floor
            const currentAngle = Number(currentValue);                          //현재 각도
            const CloseAngle = Number(convert.getCloseAngle(currentAngle));     //변경된 각도
            if (convert.Find_Bpm(Slice_from_actions, index) != false) {
                currentBpm = convert.Find_Bpm(Slice_from_actions, index);                   //현재BPM 최신화
            }

            //지원되지 않는 각도임. 먼저 각도 사이 계산을 해 BPM 수정.
            if (Support_angle.indexOf(currentAngle) == -1) {
                //console.log("지원되지 않는 각도 : " + currentAngle)
                if(Math.abs(CloseAngle - currentAngle) != 15 || Math.abs(currentAngle - CloseAngle) != 15 )
                {
                    Final_AngleData.push(CloseAngle);
                    return;
                }
                else if (CloseAngle > currentAngle) {
                    Edited_Bpm = (currentBpm / (currentAngle / CloseAngle));
                    if (Edited_Bpm == 0) {
                        console.log(CloseAngle, currentAngle, currentBpm, Edited_Bpm, index)
                    }
                    console.log("currentBpm : " + currentBpm + " Edited_Bpm : " + Edited_Bpm);
                    Slice_from_actions[index] = convert.Set_Bpm(Slice_from_actions, index, Edited_Bpm, true)
                    Slice_from_actions[index + 1] = convert.Set_Bpm(Slice_from_actions, index + 1, currentBpm, false)
                }
                else {
                    Edited_Bpm = (currentBpm * (CloseAngle / currentAngle));
                    if (Edited_Bpm == 0) {
                        console.log(CloseAngle, currentAngle, currentBpm, Edited_Bpm, index)
                    }
                    //console.log("currentBpm : " + currentBpm + " Edited_Bpm : " + Edited_Bpm);
                    Slice_from_actions[index] = convert.Set_Bpm(Slice_from_actions, index, Edited_Bpm, true)
                    Slice_from_actions[index + 1] = convert.Set_Bpm(Slice_from_actions, index + 1, currentBpm, false)
                }
                Final_AngleData.push(CloseAngle);
                return;
            }
            else {
                Final_AngleData.push(currentValue)
                return;
            }


        })

        let path = "";
        Final_AngleData.forEach((x) => {
            path += adofai.path[x]
        })
        delete Level.angleData;
        Level.pathData = path;
        Level.actions = this.Combine_action(Slice_from_actions);

        return Level;
    }

    Combine_action(arr_effects)     //이펙트 합치기
    {
        let arr_effect = arr_effects;       //일단 파라미터를 변수로 지정
        let final_data = new Array();       //결과 데이터(이펙트) 저장용
        arr_effect.forEach(function (currentValue, index) {
            if (currentValue != ("" || null || "undefined")) {
                currentValue.forEach((x) => {
                    final_data.push(x);
                }
                )
            }
        })
        return final_data;
    }

    Set_Bpm(effect_array, floor, bpm, is_compulsion) {
        //대충 json 형식 변수임
        let template = { "floor": floor, "eventType": "SetSpeed", "speedType": "Bpm", "beatsPerMinute": Number(bpm) };
        let eft_array = effect_array[floor];    //해당 배열에서 특정 index만 추출    
        //2차원 배열이라 두번째 배열에 eventType가 SetSpeed 값이 있는 곳의 index 추출 
        //만약 없다면 false 반환함.
        let eft_index = null;

        //SetSpeed가 있으면 위치 반환함.
        eft_array.filter(function (element, index) {
            if (element.eventType == "SetSpeed") {
                eft_index = index;
            }
        });

        //if(eft_array == "" || "undefined" || null)    //배열이 비어있다면?
        if (!eft_array)    //배열이 비어있다면?
        {
            eft_array = new Array();
            eft_array.push(template);
        }
        else {                                          //배열이 비어있지 않다면?
            if (eft_index == null) {                      //근데 SetSpeed가 없다면?
                eft_array.unshift(template);            //배열 맨 앞에 넣어버려
            }
            else {
                if (is_compulsion == true) {              //강제적으로 넣어야하나..?
                    eft_array[eft_index].beatsPerMinute = Number(bpm);  //고럼 값 넣어야지~
                }
            }
        }
        return eft_array;
    }

    Find_Bpm(effect_arr, index) {
        let eft_array = effect_arr[index];
        let eft_index = null;
        effect_arr[index].filter(function (element, index) {
            if (element.eventType == "SetSpeed") {
                eft_index = index;
                //console.log(element)
            }
        });

        if (!eft_array) {
            return false;
        }
        else {
            if (eft_index != null) {
                return eft_array[eft_index].beatsPerMinute;
            }
            else {
                return false;
            }
        }


    }

    addText(arg0) {
        return;
    }

    Edit_AngleData_to_PathData(angleData) //angleData 일 경우에만 사용 가능.
    {
        const supportPathData = this.SetPathData_To_Number();
        let angle = angleData;
        let editangle = [];
        let change_angle = null;
        let setBpm_index = null;    //SetSpeed 위치
        let change_bpm = null;      //바뀐 Bpm
        let setBpm = null;          //원래 Bpm
        let angleLength = angle.length;

        angle.forEach(function (currentValue, index) {  //currentValue : 각도, index : floor
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
        var data = ["30", "45", "60", "90", "120", "135", "150", "180", "210", "225", "240", "270", "300", "330", "345"]
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


    Effect_sclice_for_Floor(level) {
        const Level = level;                            //레벨을 const로 저장
        let Tile_Length = Level.angleData.length + 1;       //angleData의 길이 저장
        let effect_array = new Array(Tile_Length)       //Tile_Length만큼 배열 생성

        //2차원 배열 생성
        for (let i = 0; i < effect_array.length; i++) {
            effect_array[i] = [];
        }

        Level.actions.forEach((x) => {                    //floor 값에 맞춰 데이터 추가
            effect_array[x.floor].push(x);
        })
        console.log(effect_array)
        return effect_array;                                //생성한 2차원 배열을 리턴.
    }

    Distinction_Data(level) {
        const Level = level;
        if (Level.pathData == undefined) {
            return "angle";
        }
        else return "path";
    }


    SetSpeed(Level) {
        let level = Level;
        let bpm = level.settings.bpm;
        level.actions.forEach(function (index) {
            if (index.eventType == "SetSpeed") {
                if (index.speedType == "Multiplier") {
                    index.speedType = "Bpm";
                    bpm = bpm * index.bpmMultiplier;
                    delete index.bpmMultiplier;
                    index.beatsPerMinute = bpm;
                }
                else {
                    delete index.bpmMultiplier;
                    bpm = index.beatsPerMinute;
                }
            }
        });
        return Level;
    }
    Twirl(level) {
        return level;
    }
    CustomBackground(level) {
        let Level = level;
        level.actions.forEach(function (index) {
            if (index.eventType == "CustomBackground") {
                if (adofai.effect.List.CustomBackground.bgDisplayMode.indexOf(index.bgDisplayMode) == -1) {
                    index.bgDisplayMode = "FitToScreen";
                }
            }
        });
        return Level;
    }
    ColorTrack(level) {
        let Level = level;
        Level.actions.forEach(function (index) {
            if (index.eventType == "ColorTrack") {
                if (adofai.effect.List.ColorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    index.trackColorType = "Single";
                }
                if (adofai.effect.List.ColorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    index.trackColorPulse = "Forward";
                }
                if (adofai.effect.List.ColorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    index.trackStyle = "Standard";
                }
            }
        });
        return Level;
    }
    AnimateTrack(Level) {
        let level = Level;
        level.actions.forEach(function (index) {
            if (index.eventType == "AnimateTrack") {
                if (adofai.effect.List.AnimateTrack.trackAnimation.indexOf(index.trackAnimation) == -1) {
                    index.trackAnimation = "None";
                }
                if (adofai.effect.List.AnimateTrack.trackDisappearAnimation.indexOf(index.trackDisappearAnimation) == -1) {
                    index.trackDisappearAnimation = "None";
                }
            }
        });
        return level;
    }
    AddDecoration(Level) {
        let level = Level;
        level.actions.forEach(function (index) {
            if (index.eventType == "AddDecoration") {
                if (adofai.effect.List.AddDecoration.relativeTo.indexOf(index.relativeTo) == -1) {
                    index.relativeTo = "Global";
                }
                if (index.scale != undefined) {
                    delete index.scale;
                }
            }
        });
        return Level;
    }
    Flash(Level) {
        let level = Level;
        level.actions.forEach(function (index) {
            if (index.eventType == "Flash") {
                if (adofai.effect.List.Flash.plane.indexOf(index.plane) == -1) {
                    index.plane = "Foreground";
                }
            }
        });
        return level;
    }
    MoveCamera(level) {
        let Level = level;
        Level.actions.forEach(function (index) {
            if (index.eventType == "MoveCamera") {
                if (adofai.effect.List.MoveCamera.relativeTo.indexOf(index.relativeTo) == -1) {
                    index.relativeTo = "Player";
                }
            }
        });
        return Level;
    }

    MoveTrack(level) {
        //안함 일부러 ㅋㅋ
        return level;
    }

    HallOfMirrors(level) {
        let Level = level;
        Level.actions.forEach(function (index) {
            if (index.eventType == "HallOfMirrors") {
                if (adofai.effect.List.HallOfMirrors.enabled.indexOf(index.enabled) == -1) {
                    index.enabled = "Enabled";
                }
            }
        });
        return Level;
    }

    SetHitsound(level) {
        let Level = level;
        Level.actions.forEach(function (index) {
            if (index.eventType == "SetHitsound") {
                if (adofai.effect.List.SetHitsound.hitsound.indexOf(index.hitsound) == -1) {
                    index.hitsound = "Hat";
                }
            }
        });
        return Level;
    }
    RecolorTrack(level) {
        let Level = level;
        Level.actions.forEach(function (index) {
            if (index.eventType == "RecolorTrack") {
                if (adofai.effect.List.RecolorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    index.trackColorType = "Single";
                }
                if (adofai.effect.List.RecolorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    index.trackColorPulse = "Forward";
                }
                if (adofai.effect.List.RecolorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    index.trackStyle = "Standard";
                }
            }
        });
        return Level;
    }
    SetFilter(level) {
        let Level = level;
        Level.actions.forEach((index, num) => {
            if (index.eventType == "SetFilter") {
                if (adofai.effect.List.SetFilter.filter.indexOf(index.filter) == -1) {
                    Level.actions.splice(num, 1);
                }
                index.angleOffset = 1;
            }
        })
        return Level;
    }

    ShakeScreen(level) {
        return level;
    }
    SetPlanetRotation(level) {
        return level;
    }

    MoveDecorations(level) {
        return level;
    }

    RepeatEvents(level) {
        return level;
    }

    SetBasicMapSetting(level) {
        let Level = level;
        Level.settings.version = 2;
        Object.keys(Level.settings).forEach((index) => {
            if (index == "hitsound" && adofai.Setting.List.hitsound.indexOf(Level.settings.hitsound) == -1) {
                Level.settings[index] = "Hat";
            }
            if (index == "separateCountdownTime" && adofai.Setting.List.separateCountdownTime.indexOf(Level.settings.separateCountdownTime) == -1) {
                Level.settings[index] = "Enabled";
            }
            if (index == "trackColorType" && adofai.Setting.List.trackColorType.indexOf(Level.settings.trackColorType) == -1) {
                Level.settings[index] = "Single";
            }
            if (index == "trackColorPulse" && adofai.Setting.List.trackColorPulse.indexOf(Level.settings.trackColorPulse) == -1) {
                Level.settings[index] = "None";
            }
            if (index == "trackStyle" && adofai.Setting.List.trackStyle.indexOf(Level.settings.trackStyle) == -1) {
                Level.settings[index] = "Standard";
            }
            if (index == "trackAnimation" && adofai.Setting.List.trackAnimation.indexOf(Level.settings.trackAnimation) == -1) {
                Level.settings[index] = "None";
            }
            if (index == "trackDisappearAnimation" && adofai.Setting.List.trackDisappearAnimation.indexOf(Level.settings.trackDisappearAnimation) == -1) {
                Level.settings[index] = "None";
            }
            if (index == "bgDisplayMode" && adofai.Setting.List.bgDisplayMode.indexOf(Level.settings.bgDisplayMode) == -1) {
                Level.settings[index] = "FitToScreen";
            }
            if (index == "lockRot" && adofai.Setting.List.lockRot.indexOf(Level.settings.lockRot) == -1) {
                Level.settings[index] = "Enabled";
            }
            if (index == "loopBG" && adofai.Setting.List.loopBG.indexOf(Level.settings.loopBG) == -1) {
                Level.settings[index] = "Enabled";
            }

        })
        Object.keys(Level.settings).forEach((index) => {
            if (adofai.Setting.Key.indexOf(index) == -1) {
                delete Level.settings[index];
            }
        })


        return Level;
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

    Init() {
        this.Level = null;
    }
}
