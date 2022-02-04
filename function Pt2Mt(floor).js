var Level = {
    "actions" : []
}

//PositionTrack을 MoveTrack으로 변환
function Pt2Mt(pos_x, pos_y)
{
    let pos = new Vector;
    let e = new Array();
    pos.x += pos_x;
    pos.y += pos_y;

    e.floor = 1;
    e.eventType = "MoveCamera";
    e.duration = 0.1;
    e.relativeTo = "Tile";
    e.position = [pos.x, pos.y];
    e.rotation = 0;
    e.zoom = Level.settings.zoom;
    e.angleOffset = 0;
    e.ease = "Linear";

    Level.actions.unshift(e);
}

function angle2path(angleData)
{
    let path = "";
    let angledat = angleData;
    //검사 진행
    angledat.forEach((x) => {
        if(Object.keys(adofai_path).indexOf(x.index) == -1)
        {
            alert("이 맵은 지원하지 않습니다.");
            break;
        }
    })

}

function Test_angleData(angleData)
{
    angledat.forEach((x) => {
        if(Object.keys(adofai_path).indexOf(x.index) == -1)
        {
            return false;
        }
        else {
            return true;
        }
    })
}

class Vector {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

var adofai_path = {
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