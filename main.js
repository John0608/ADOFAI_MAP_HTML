var upload_Result;
var obj;
var effect_List = ["SetSpeed","Twirl","CustomBackground","ChangeTrack","ColorTrack","AnimateTrack","AddDecoration","Flash","MoveCamera","SetHitsound","RecolorTrack","MoveTrack","SetFilter","HallOfMirrors","ShakeScreen","SetPlanetRotation","MoveDecorations","RepeatEvents"];

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
        console.log(level)
        upload_Result = level; 
    }
    reader.onerror = () => {
      return alert('error reading file')
    }
    reader.readAsText(f, 'UTF-8')
  }

  function fix()
  {
      for(var i = 0; i < upload_Result.actions.length; i++)
      {
        upload_Result.actions
      }
  }
