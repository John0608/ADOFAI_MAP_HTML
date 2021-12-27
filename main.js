var Level;
var obj;

var effect_List = ["SetSpeed","Twirl","CustomBackground","ChangeTrack","ColorTrack","AnimateTrack","AddDecoration","Flash","MoveCamera","SetHitsound","RecolorTrack","MoveTrack","HallOfMirrors","ShakeScreen","SetPlanetRotation","MoveDecorations","RepeatEvents"];
var MoveCamera_List = ["floor", "eventType", "duration", "relativeTo", "position", "rotation", "zoom", "angleOffset", "ease"];

const fileUpload = () => {
    String.prototype.replaceAll = function(org, dest) {
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
        fix();
        download("main.adofai",JSON.stringify(Level));
    }
    reader.onerror = () => {
      return alert('error reading file')
    }
    reader.readAsText(f, 'UTF-8')
  }

  function fix()
  {
      Level.actions = Level.actions.filter(x=>effect_List.includes(x.eventType))
      Remove_Keys("MoveCamera", MoveCamera_List);

      let bpm = Level.settings.bpm;
      for(var i = 0; i < Level.actions.length; i++)
      {
          if(Level.actions[i].eventType == "SetSpeed")
          {
                if(Level.actions[i].speedType == "Multiplier")
                {
                    const bpm_Multiplier = Level.actions[i].bpmMultiplier;

                    Level.actions[i].speedType = "Bpm";
                    bpm = bpm * bpm_Multiplier;
                    Level.actions[i].bpmMultiplier = 1;
                }
                Level.actions[i].beatsPerMinute = bpm;
          }
        }
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

function Remove_Keys(event_name, event_keys) //카메라 중 지원하지 않는 키 제거
{
    var actions_length = Level.actions.length;  //actions 길이
    for(var i = 0; i < actions_length; i++)     //actions 길이만큼 반복
    {
        if(Level.actions[i].eventType == event_name)
        {
            var key = Object.getOwnPropertyNames(Level.actions[i]);
            console.log("Key :" + key.toString());
            for(var o = 0; o < key.length; o++)
            {
                if(event_keys.indexOf(key[o]) == -1)
                {
                    var result = delete Level.actions[i][key[o]];
                    console.log(result);
                    
                }
            }
        }
    }
}