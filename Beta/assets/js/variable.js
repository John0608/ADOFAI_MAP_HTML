//DevMode
const DevMode = true;
const PW = "Hello2022Year";


//업로드 파일용 변수
let upload_File = null;     //업로드 했을 때 Data 저장용
let Adofai_File = null;     //Adofai파일 Data 저장용
let Zip_File = null;        //Zip파일 저장용
let Upload_Type = null;     //업로드 타입 비교용 변수
let File_Convert = new File();
let adofai_util = new ADOFAI_utils();

//Class Load
let Con_adofai = new Convert_adofai();
let Zip = new ZipUtils();
let convert = new Convert();
let F = new File();

//업로드 타입 : ADOFAI파일/ZIP파일
let UploadType = {
    Zip : "Zip",
    ADOFAI_LEVEL : "adofai_level"
}

//Document의 선택 가능한 리스트
let Document_Select_List = {

    /** INPUT : FILE **/
    Button_FileSelect : ".upload_control",

    /** Log Box **/
    Log_Display : ".log_box",

    /** Now Status : <p> **/
    Status_Display : ".status_txt",

    /** Now Status Box**/
    Status_Box : ".status",

    /** <Div Select> adofai_level_selector **/
    Select_Box : ".select",

    /** button : Download Button **/
    Download_Button : ".download_btn",

    /** Error Displayer **/
    AlertBox_Display : ".alert",

    /** Now Percent Displayer **/
    Progress : ".progress"
}

