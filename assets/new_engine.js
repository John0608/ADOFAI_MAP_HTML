class Convert {

    SetSpeed() {
        let bpm = Level.settings.bpm;
        let source = { "floor": 1, "eventType": "SetSpeed", "beatsPerMinute": 100 }
        Level.actions.forEach(function (index) {
            if (index.eventType == "SetSpeed") {
                source.floor = index.floor;
                if (index.speedType == "Multiplier") {
                    bpm = bpm * index.bpmMultiplier;
                    source.beatsPerMinute = bpm;
                    addText(index.floor + "의 " + index.eventType + "이펙트의 BPM이 " + index.bpm + "에서 " + bpm + "으로 바뀜.")
                }
                else {
                    source.beatsPerMinute = bpm;
                    bpm = index.beatsPerMinute;
                }
                index = source;
            }
        });
    }
    Twirl() {
        return;
    }
    CustomBackground() {
        Level.actions.forEach(function (index) {
            let source = { "floor": 3, "eventType": "CustomBackground", "color": "000000", "bgImage": "", "imageColor": "ffffff", "parallax": [100, 100], "bgDisplayMode": "FitToScreen", "lockRot": "Disabled", "loopBG": "Disabled", "unscaledSize": 100, "angleOffset": 0 }
            if (index.eventType == "CustomBackground") {
                if (effect_List.CustomBackground.bgDisplayMode.indexOf(index.bgDisplayMode) == -1) {
                    source.bgDisplayMode = "FitToScreen";
                    addText(index.floor + "의 " + index.eventType + "이펙트의 bgDisplayMode이 " + index.bgDisplayMode + "에서 " + source.bgDisplayMode + "으로 바뀜.")
                }
                else {
                    source.bgDisplayMode = index.bgDisplayMode;
                }
                source.floor = index.floor;
                source.color = index.color;
                source.bgImage = index.bgImage;
                source.imageColor = index.imageColor;
                source.parallax = index.parallax;
                source.lockRot = index.lockRot;
                source.loopBG = index.loopBG;
                source.unscaledSize = index.unscaledSize;
                source.angleOffset = index.angleOffset;
                index = source;
            }
        });
    }
    ColorTrack() {
        Level.actions.forEach(function (index) {
            let source = { "floor": 4, "eventType": "ColorTrack", "trackColorType": "Single", "trackColor": "debb7b", "secondaryTrackColor": "ffffff", "trackColorAnimDuration": 2, "trackColorPulse": "None", "trackPulseLength": 10, "trackStyle": "Standard" };
            if (index.eventType == "ColorTrack") {
                if (effect_List.ColorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    source.trackColorType = "Single";
                    addText(index.floor + "의 " + index.eventType + "이펙트의 trackColorType가 " + index.trackColorType + "에서 Single 으로 바뀜.")
                }
                else {
                    source.trackColorType = index.trackColorType;
                }
                if (effect_List.ColorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    source.trackColorPulse = "Forward";
                    addText(index.floor + "의 " + index.eventType + "이펙트의 trackColorPulse가 " + index.trackColorPulse + "에서 Forward 으로 바뀜.")
                }
                else {
                    source.trackColorPulse = index.trackColorPulse;
                }
                if (effect_List.ColorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    source.trackStyle = "Standard";
                    addText(index.floor + "의 " + index.eventType + "이펙트의 trackStyle이 " + index.trackStyle + "에서 Standard 으로 바뀜.")
                }
                else {
                    source.trackStyle = index.trackStyle;
                }
                source.floor = index.floor;
                source.trackColor = index.trackColor;
                source.secondaryTrackColor = index.secondaryTrackColor;
                source.trackColorAnimDuration = index.trackColorAnimDuration;
                source.trackPulseLength = index.trackPulseLength;
                index = source;
            }
        });
    }
    AnimateTrack() {
        Level.actions.forEach(function (index) {
            let source = { "floor": 5, "eventType": "AnimateTrack", "trackAnimation": "None", "beatsAhead": 3, "trackDisappearAnimation": "None", "beatsBehind": 4 }
            if (index.eventType == "AnimateTrack") {
                if (effect_List.AnimateTrack.trackAnimation.indexOf(index.trackAnimation) == -1) {
                    source.trackAnimation = "None";
                    addText(index.floor + "의 " + index.eventType + "이펙트의 trackAnimation이 " + index.trackAnimation + "에서 None으로 바뀜.")
                }
                else {
                    source.trackAnimation = index.trackAnimation
                }
                if (effect_List.AnimateTrack.trackDisappearAnimation.indexOf(index.trackDisappearAnimation) == -1) {
                    source.trackDisappearAnimation = "None";
                    addText(index.floor + "의 " + index.eventType + "이펙트의 trackDisappearAnimation이 " + index.trackDisappearAnimation + "에서 None으로 바뀜.")
                }
                else {
                    source.trackDisappearAnimation =  index.trackDisappearAnimation
                }
                source.floor = index.floor;
                source.beatsAhead = index.beatsAhead;
                source.beatsBehind = index.beatsBehind;
                index = source;
            }
        });
    }
    AddDecoration() {
        Level.actions.forEach(function (index) {
            let source = { "floor": 6, "eventType": "AddDecoration", "decorationImage": "", "position": [0, 0], "relativeTo": "Tile", "pivotOffset": [0, 0], "rotation": 0, "scale": 100, "depth": 0, "tag": "missing key " };
            if (index.eventType == "AddDecoration") {
                if (effect_List.AddDecoration.relativeTo.indexOf(index.relativeTo) == -1) {
                    source.relativeTo = "Global";
                }
                else {
                    source.relativeTo = index.relativeTo;
                }
                source.floor = index.floor;
                source.decorationImage = index.decorationImage;
                source.position = index.position;
                source.pivotOffset = index.pivotOffset;
                source.rotation = index.rotation;
                source.scale = index.scale;
                source.depth = index.depth;
                source.tag = index.tag;
                index = source;
            }
        });
    }
    Flash() {
        let source = { "floor": 7, "eventType": "Flash", "duration": 1, "plane": "Background", "startColor": "ffffff", "startOpacity": 100, "endColor": "ffffff", "endOpacity": 0, "angleOffset": 0 }
        Level.actions.forEach(function (index) {
            if (index.eventType == "Flash") {
                if (effect_List.Flash.plane.indexOf(index.plane) == -1) {
                    source.plane = "Foreground";
                }
                else {
                    source.plane = index.plane;
                }
                source.floor = index.floor;
                source.duration = index.duration;
                source.startColor = index.startColor;
                source.startOpacity = index.startOpacity;
                source.endColor = index.endColor;
                source.endOpacity = index.endOpacity;
                source.angleOffset = index.angleOffset;
                index = source;
            }
        });
    }
    MoveCamera() {
        let source = { "floor": 8, "eventType": "MoveCamera", "duration": 1, "relativeTo": "Player", "position": [0, 0], "rotation": 0, "zoom": 100, "angleOffset": 0, "ease": "Linear" }
        Level.actions.forEach(function (index) {
            if (index.eventType == "MoveCamera") {
                if (effect_List.MoveCamera.relativeTo.indexOf(index.relativeTo) == -1) {
                    source.relativeTo = "Player";
                }
                else {
                    source.relativeTo = index.relativeTo;
                }
                source.floor = index.floor;
                source.duration = index.duration;
                source.position = index.position;
                source.rotation = index.rotation;
                source.zoom = index.zoom;
                source.angleOffset = index.angleOffset;
                source.ease = index.ease;
                index = source;
            }
        });
    }

    SetHitsound() {
        Level.actions.forEach(function (index) {
            let source = { "floor": 9, "eventType": "SetHitsound", "hitsound": "Kick", "hitsoundVolume": 100 }
            if (index.eventType == "SetHitsound") {
                if (effect_List.SetHitsound.hitsound.indexOf(index.hitsound) == -1) {
                    source.hitsound = "Hat";
                }
                else {
                    source.hitsound = index.hitsound;
                }
                source.floor = index.floor;
                source.hitsoundVolume = index.hitsoundVolume;
                index = source;
            }
        });
    }
    
    RecolorTrack() {
        let source = { "floor": 10, "eventType": "RecolorTrack", "startTile": [0, "ThisTile"], "endTile": [0, "ThisTile"], "trackColorType": "Single", "trackColor": "debb7b", "secondaryTrackColor": "ffffff", "trackColorAnimDuration": 2, "trackColorPulse": "None", "trackPulseLength": 10, "trackStyle": "Standard", "angleOffset": 0 }
        Level.actions.forEach(function (index) {
            if (index.eventType == "RecolorTrack") {
                if (effect_List.RecolorTrack.trackColorType.indexOf(index.trackColorType) == -1) {
                    source.trackColorType = "Single";
                }
                else source.trackColorType = index.trackColorType
                if (effect_List.RecolorTrack.trackColorPulse.indexOf(index.trackColorPulse) == -1) {
                    source.trackColorPulse = "Forward";
                }
                else source.trackColorPulse = index.trackColorPulse
                if (effect_List.RecolorTrack.trackStyle.indexOf(index.trackStyle) == -1) {
                    source.trackStyle = "Standard";
                }
                else source.trackStyle = index.trackStyle
                source.floor = index.floor;
                source.startTile = index.startTile;
                source.endTile = index.endTile;
                source.trackColor = index.trackColor;
                source.secondaryTrackColor = index.secondaryTrackColor;
                source.trackColorAnimDuration = index.trackColorAnimDuration;
                source.trackPulseLength = index.trackPulseLength;
                source.angleOffset = index.angleOffset;
                index = source;
            }
        });
    }
    MoveTrack() {
        let source = { "floor": 11, "eventType": "MoveTrack", "startTile": [0, "ThisTile"], "endTile": [0, "ThisTile"], "duration": 1, "positionOffset": [0, 0], "rotationOffset": 0, "scale": 100, "opacity": 100, "angleOffset": 0, "ease": "Linear" };
        Level.actions.forEach(function (index) {
            if (index.eventType == "MoveTrack") {
                source.floor = index.floor;
                source.startTile = index.startTile;
                source.endTile = source.endTile;
                source.duration = index.duration;
                source.positionOffset = index.positionOffset;
                source.rotationOffset = index.rotationOffset;
                source.scale = index.scale;
                source.opacity = index.opacity;
                source.angleOffset = index.angleOffset;
                source.ease = index.ease;
                index = source;
            }
        });
    }
    
    SetFilter() {
        let source = { "floor": 12, "eventType": "SetFilter", "filter": "Grayscale", "enabled": "Enabled", "intensity": 100, "disableOthers": "Disabled", "angleOffset": 0 }
        Level.actions.forEach((index, num) => {
            if(index.eventType == "SetFilter") {
                if (effect_List.SetFilter.filter.indexOf(index.filter) == -1) {
                    addText(index.floor + "타일 필터 이벤트의 " + index.filter + "는 호환되지 않아 제거됩니다.");
                    Level.actions.splice(num,1);
                }
                else {
                    source.floor = index.floor;
                    source.filter = index.filter;
                    source.enabled = index.enabled;
                    source.intensity = index.intensity;
                    source.disableOthers = index.disableOthers;
                    source.angleOffset = index.angleOffset;
                    index = source;
                }
            }
        })
    }
    HallOfMirrors() {
        let source = { "floor": 13, "eventType": "HallOfMirrors", "enabled": "Enabled", "angleOffset": 0 }
        Level.actions.forEach(function (index) {
            if (index.eventType == "HallOfMirrors") {
                source.floor = index.floor;
                source.enabled = index.enabled;
                source.angleOffset = index.angleOffset;
                index = source;
            }
        });
    }
    
    ShakeScreen() {
        let source = { "floor": 14, "eventType": "ShakeScreen", "duration": 1, "strength": 100, "intensity": 100, "fadeOut": "Enabled", "angleOffset": 0 }
        Level.actions.forEach(function (index) {
            if (index.eventType == "ShakeScreen") {
                source.floor = index.floor;
                source.duration = index.duration;
                source.strength = index.strength;
                source.intensity = index.intensity;
                source.fadeOut = index.fadeOut;
                source.angleOffset = index.angleOffset;
                index = source;
            }
        });
    }
    SetPlanetRotation(){
        let source = { "floor": 15, "eventType": "SetPlanetRotation", "ease": "Linear" }
        Level.actions.forEach(function (index) {
            if (index.eventType == "SetPlanetRotation") {
                source.floor = index.floor;
                source.ease = index.ease;
                index = source;
            }
        });
    }

    MoveDecorations(){
        let source = { "floor": 16, "eventType": "MoveDecorations", "duration": 1, "tag": "missing key", "positionOffset": [0, 0], "rotationOffset": 0, "scale": 100, "angleOffset": 0, "ease": "Linear" }
        Level.actions.forEach(function (index) {
            if (index.eventType == "MoveDecorations") {
                source.floor = index.floor;
                source.duration = index.duration;
                source.tag = index.tag;
                source.positionOffset = index.positionOffset;
                source.rotationOffset = index.rotationOffset;
                source.scale = index.scale;
                source.angleOffset = index.angleOffset;
                source.ease = index.ease;
                index = source;
            }
        });
    }

    RepeatEvents(){
        let source = { "floor": 17, "eventType": "RepeatEvents", "repetitions": 1, "interval": 1 }
        Level.actions.forEach(function (index) {
            if (index.eventType == "MoveDecorations") {
                source.floor = index.floor;
                source.repetitions = index.repetitions;
                source.interval = index.interval;
                index = source;
            }
        });
    }

    SetInit_settings()
    {
        let source = {
            "version": 2, 
            "artist": "아티스트", 
            "song": "곡", 
            "author": "만든이", 
            "hitsound": "Kick", 
            "hitsoundVolume": 100, 
            "separateCountdownTime": "Enabled",
            "songFilename": "", 
            "bpm": 100, 
            "volume": 100, 
            "offset": 0, 
            "pitch": 100,
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
            "parallax": [100, 100], 
            "bgDisplayMode": "FitToScreen", 
            "lockRot": "Disabled", 
            "loopBG": "Disabled", 
            "unscaledSize": 100,
            "relativeTo": "Player", 
            "position": [0, 0], 
            "rotation": 0, 
            "zoom": 100,
            "bgVideo": "", 
            "loopVideo": "Disabled", 
            "vidOffset": 0, 
            "floorIconOutlines": "Disabled", 
            "stickToFloors": "Disabled", 
            "planetEase": "Linear"
        }
        source.artist = Level.settings.artist;
        source.song = Level.settings.song;
        source.author = Level.settings.author;
        source.songFilename = Level.settings.songFilename;
        source.bpm = Level.settings.bpm;
        source.offset = Level.settings.offset;
        Level.settings = source;
        
    }

    SetBasicMapSetting(){
        Level.settings.version = 2;
        Object.keys(Level.settings).forEach((index) => {
            if(index == "hitsound" && adofai.Setting.List.hitsound.indexOf(Level.settings.hitsound) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "Hat 으로 변환됨.")
                Level.settings[index] = "Hat";
            }
            if(index == "separateCountdownTime" && adofai.Setting.List.separateCountdownTime.indexOf(Level.settings.separateCountdownTime) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                Level.settings[index] = "Enabled";
            }
            if(index == "trackColorType" && adofai.Setting.List.trackColorType.indexOf(Level.settings.trackColorType) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "Single 으로 변환됨.")
                Level.settings[index] = "Single";
            }
            if(index == "trackColorPulse" && adofai.Setting.List.trackColorPulse.indexOf(Level.settings.trackColorPulse) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "None 으로 변환됨.")
                Level.settings[index] = "None";
            }
            if(index == "trackStyle" && adofai.Setting.List.trackStyle.indexOf(Level.settings.trackStyle) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "Standard 으로 변환됨.")
                Level.settings[index] = "Standard";
            }
            if(index == "trackAnimation" && adofai.Setting.List.trackAnimation.indexOf(Level.settings.trackAnimation) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "None 으로 변환됨.")
                Level.settings[index] = "None";
            }
            if(index == "trackDisappearAnimation" && adofai.Setting.List.trackDisappearAnimation.indexOf(Level.settings.trackDisappearAnimation) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "None 으로 변환됨.")
                Level.settings[index] = "None";
            }
            if(index == "bgDisplayMode" && adofai.Setting.List.bgDisplayMode.indexOf(Level.settings.bgDisplayMode) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "FitToScreen 으로 변환됨.")
                Level.settings[index] = "FitToScreen";
            }
            if(index == "lockRot" && adofai.Setting.List.lockRot.indexOf(Level.settings.lockRot) == -1)
            {
                addText(index + "의 " + Level.settings[index] + "에서" + "Enabled 으로 변환됨.")
                Level.settings[index] = "Enabled";
            }
            if(index == "loopBG" && adofai.Setting.List.loopBG.indexOf(Level.settings.loopBG) == -1)
            {
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
        return result;
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
