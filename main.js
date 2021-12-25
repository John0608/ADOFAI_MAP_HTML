var Level;
var obj;
var effect_List = ["SetSpeed","Twirl","CustomBackground","ChangeTrack","ColorTrack","AnimateTrack","AddDecoration","Flash","MoveCamera","SetHitsound","RecolorTrack","MoveTrack","HallOfMirrors","ShakeScreen","SetPlanetRotation","MoveDecorations","RepeatEvents"];

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
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
    )
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}
