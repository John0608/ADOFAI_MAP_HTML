/* Class 선언 */
const adofai_class = new ADOFAI();
const ui = new Ui(); 
const upload = new Upload();
const convert = new Convert();
const zipUtil = new Zip();

let Files = null;
let level = null;
let ZipFileName = null;
let level_FileName = null;
let test = null;

window.onload = () => {         //웹페이지 로드 완료 시
    // 초기상태 로드
    ui.Pageinit();
}

async function ReadFile()
{
    if(upload.DetectFileExt() == true)
    {
        const ReadFile = await upload.readProcess(); //파일 읽기
        const UnzipProcess = await zipUtil.UnZip(ReadFile);
        Files = UnzipProcess;
        ZipFileName = upload.GetFileName();
        DisplayLevel(Files);
        return;
    }
}

function DisplayLevel(File) //Level 표시
{
    const levels_result = adofai_class.findLevel(File);
    ui.CompleateLoad();
    addSelect(levels_result);
}


async function levelSelect (target) 
{
    const LevelData = await adofai_class.readLevel(Files, target.value);
    level_FileName = target.value;
    level = LevelData;
    console.log(LevelData);
    if(adofai_class.isAdofaiLevel(LevelData) == true)
    {
        let level_file = convert.FastConvert2(level);
        console.log(level.actions);
        zipUtil.AddFile(level_FileName,level_file,false,true);
        Files.file(level_FileName, JSON.stringify(level_file));
        //zipUtil.myOnDownload(ZipFileName);

    }
    else {
        alert("유효한 ADOFAI 레벨이 아닙니다.");
        All_init();
    }
}



function addSelect(list)        //레벨 파일 리스트화
{
    let select = document.querySelector(".select");
    
    list.forEach((index)=>{
        let sel = document.createElement("option");
        sel.innerText = index;
        sel.value = index;
        select.appendChild(sel);
    })

}

function All_init()
{
    Files = null;
    ui.Pageinit();
    upload.upload_init();
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
