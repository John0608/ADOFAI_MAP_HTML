let level_file = null;
let filename = null;
let convert = new Convert();
window.onload = (() => {
    const dev = true;
    let pw = "Hello2022Year";
    if (!dev) {
        alert("이 페이지는 ADOFAI 변환 테스트 페이지입니다.");
        let p = prompt("비밀번호를 입력해주세요!");
        if (dev == false && (p != pw || p == null)) {
            location.href = "https://john0608.github.io/ADOFAI_MAP_HTML/";
        }
    }
})


const Upload = (target) => {
    try {
        const f = target.files[0];
        const f_name = f.name;
        filename = f_name;
        let File_Ext = f_name.substring(f_name.lastIndexOf("."));
        if (File_Ext != ".adofai") {
            alert(".adofai 파일만 업로드 가능합니다.");
            return;
        }
    
        //파일 리더기
        const reader = new FileReader();
        reader.onload = function (evt) {
            level = evt.target.result;
            level_file = parse_level(level);
            main();
        }
        reader.onerror = () => {
            alert('파일을 읽는데 실패하였습니다.')
            return false;
        }
    
        reader.readAsText(f, 'UTF-8');
    }
    catch(err)
    {
        error(e.name,e.message);
    }
}

function parse_level(target_level) {
    String.prototype.replaceAll = function (org, dest) {
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

    return parseLevel(target_level);


}


function main()
{
    try {
        let con = new Convert();
        let result = con.FastConvert(level_file);
        download(filename,JSON.stringify(result));
    }
    catch(err)
    {
        error(e.name,e.message);
    }
}

function download(filename, text) { 

    const element = document.createElement('a') 

    element.setAttribute( 
        'href', 
        'data:file;charset=utf-,' + encodeURIComponent(text),
        
    ) 

    element.setAttribute('download', filename) 
    element.style.display = 'none' 
    document.body.appendChild(element) 
    element.click() 
    document.body.removeChild(element) 

}

function error(title,msg)
{   
    let doc = document.querySelector(".log");
    doc.textContent = "에러가 발생했습니다.\n" + title +"\n" + msg;
}