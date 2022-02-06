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
        let array = [];
        let pos = [0,0];
        Level.actions.forEach((a)=>{
            if(a.eventType == "PositionTrack") {
                let e = new Array();
                e.floor = 1;
                e.eventType = "MoveTrack",
                e.startTile = [0,"ThisTile"],
                e.startTile[0] = a.floor;
                e.endTile = [0,"End"],
                e.duration = 1,
                pos[0] += a.positionOffset[0];
                pos[1] += a.positionOffset[1];
                e.positionOffset = [pos[0],pos[1]]
                e.rotationOffset = 0,
                e.scale = 100,
                e.opacity = 100,
                e.angleOffset = 0,
                e.ease = "Linear";
                array.push(e);
            }
            else {}
        })
        array.forEach(x=>{
            Level.actions.unshift(x);
        })
        console.log(array)
       

    }

    anglePath2pathData(){        
        let path = "";
        Level.angleData.forEach((x)=> {
            if(x >= 0) {
                path += adofai.path[x];
            }
            else if (x < 0)
            {
                path += adofai.path[(x) + 360];
            }
        })
        delete Level.angleData;
        Level.pathData = path;
        
    }

    issupportAngledata()
    {
        let result = Level.angleData.some(x=>{
            return Object.keys(adofai.path).indexOf(x.toString()) == -1
        })
        return result;
    }
}