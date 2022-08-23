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
let Convert = new Convert_adofai();
let Zip = new ZipUtils();


//업로드 타입 : ADOFAI파일/ZIP파일
let UploadType = {
    Zip : "Zip",
    ADOFAI_LEVEL : "adofai_level"
}

//Document의 선택 가능한 리스트
let Document_Select_List = {
    Button_FileSelect : ".upload_controll",
    Log_Display : ".log_box",
    Status_Display : ".status",
    Select_Button : ".select",
    Download_Button : ".down_btn",
    AlertBox_Display : ".alert",
    Progress : ".progress"
}

