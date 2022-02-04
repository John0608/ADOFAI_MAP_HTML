let adofai = {
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
                "floor" : [],
                "eventType"  : [],
                "beatsPerMinute"  : []
            },
            "Twirl" : {
                "floor" : [],
                "eventType"  : []
            },
            "CustomBackground": {
                "floor"  : [],
                "eventType"  : [],
                "color"  : [],
                "bgImage"  : [],
                "imageColor"  : [],
                "parallax"  : [],
                "bgDisplayMode"  : ["FitToScreen", "Unscaled", "Tiled"],
                "lockRot"  : ["Enabled","Disabled"],
                "loopBG"  : ["Enabled","Disabled"],
                "unscaledSize"  : [],
                "angleOffset"  : []
            },
            "ColorTrack": {
                "floor" : [],
                "eventType" : [],
                "trackColorType" : ["Single",
                    "Stripes",
                    "Glow",
                    "Blink",
                    "Switch",
                    "Rainbow"],
                "trackColor" : [],
                "secondaryTrackColor" : [],
                "trackColorAnimDuration" : [],
                "trackColorPulse" : ["Forward",
                    "Backward"],
                "trackPulseLength" : [],
                "trackStyle"  : [ "Standard",
                    "Neon",
                    "NeonLight",
                    "Gems"]
            },
            "AnimateTrack": {
                "floor" : [],
                "eventType" : [],
                "trackAnimation" : ["None", "Assemble", "Assemble_Far", "Extend", "Grow", "Grow_Spin", "Fade"],
                "beatsAhead" : [],
                "trackDisappearAnimation" : ["Scatter", "Scatter_Far", "Retract", "Shrink", "Shrink_Spin", "Fade", "None"],
                "beatsBehind"  : []
            },
            "AddDecoration": {
                "floor" : [],
                "eventType" : [],
                "decorationImage" : [],
                "position" : [],
                "relativeTo" : [ "Global",
                    "Tile"],
                "pivotOffset" : [],
                "rotation" : [],
                "scale" : [],
                "depth" : [],
                "tag" : []
            },
            "Flash": {
                "floor" : [],
                "eventType" : [],
                "duration" : [],
                "plane" : ["Foreground",
                    "Background"],
                "startColor" : [],
                "startOpacity" : [],
                "endColor" : [],
                "endOpacity" : [],
                "angleOffset" : []
            },
            "MoveCamera": {
                "floor" : [],
                "eventType" : [],
                "duration" : [],
                "relativeTo" : [ "Global",
                    "Tile"],
                "position" : [],
                "rotation" : [],
                "zoom" : [],
                "angleOffset" : [],
                "ease" : []
            },
            "MoveTrack": { 
                "floor" : [],
                "eventType" : [],
                "startTile" : ["ThisTile", "Start", "End"],
                "endTile" : ["ThisTile", "Start", "End"],
                "duration" : [],
                "positionOffset" : [],
                "rotationOffset" : [],
                "scale" : [],
                "opacity" : [],
                "angleOffset" : [],
                "ease" : []
            },
            "HallOfMirrors": {
                "floor" : [],
                "eventType" : [],
                "enabled" : ["Enabled", "Disabled"],
                "angleOffset" : []
            },
            "ShakeScreen": {
                "floor" : [],
                "eventType" : [],
                "duration" : [],
                "strength" : [],
                "intensity" : [],
                "fadeOut" : [],
                "angleOffset" : []
            },
            "SetPlanetRotation": {
                "floor" : [],
                "eventType" : [],
                "ease" : []
            },
            "MoveDecorations": {
                "floor" : [],
                "eventType" : [],  
                "duration" : [],  
                "tag" : [],  
                "positionOffset" : [],  
                "rotationOffset" : [],  
                "scale" : [],  
                "angleOffset" : [],  
                "ease" : []
            },
            "SetHitsound" : {
                "floor" : [],
                "eventType" : [],
                "hitsound" : ["Hat", "Kick", "Shaker", "Sizzle", "Chuck", "None"],
                "hitsoundVolume" : []
            },
            "RecolorTrack" : {
                "floor" : [],
                "eventType" : [],
                "startTile" : ["ThisTile", "Start", "End"],
                "endTile" : ["ThisTile", "Start", "End"],
                "trackColorType" : ["Single",
                    "Stripes",
                    "Glow",
                    "Blink",
                    "Switch",
                    "Rainbow"],
                "trackColor" : [],
                "secondaryTrackColor" : [],
                "trackColorAnimDuration" : [],
                "trackColorPulse" : ["Forward",
                    "Backward"],
                "trackPulseLength" : [],
                "trackStyle" : [ "Standard",
                    "Neon",
                    "NeonLight",
                    "Gems"],
                "angleOffset" : []
            },
            "SetFilter" : {
                "floor" : [],
                "eventType" : [], 
                "filter" : ["Grayscale", "Sepia", "Invert", "VHS", "EightiesTV", "FiftiesTV", "Arcade", "LED", "Rain", "Blizzard", "PixelSnow", "Compression", "Glitch", "Pixelate", "Waves", "Drawing", "Neon", "Handheld", "NightVision", "Weird3D"],
                "enabled" : ["enabled","disabled"],
                "intensity" : [],
                "disableOthers" : ["Enabled","Disabled"],
                "angleOffset" : []
            },
            "RepeatEvents" : {
                "floor" : [],
                "eventType" : [], 
                "repetitions" : [],
                "interval" : []
            }
        }
    },
    "path" : {
        0 : "R",
        30 : "J",
        45 : "E",
        60 : "T",
        90 : "U",
        120 : "G",
        135 : "Q",
        150 : "H",
        180 : "L",
        210 : "N",
        225 : "Z",
        240 : "F",
        270 : "D",
        300 : "B",
        330 : "C",
        345 : "M",
        999 : "!"
    }
}