const OnFileSelect = async (target) => {

    try {
        const File_c = new File()
        let f_name = target.value;
        let result = await Convert.File2Json(f_name);
        //나머지 파일을 없앰
        let levels = adofai_util.FindLevel();
        if(levels.length > 1)
        {
            levels.forEach((levels)=>{
                if(levels != f_name)
                {
                    console.log("레벨 삭제됨 : " + levels);
                    delete Zip_File.files[levels];
                }
            })
        }
        console.log(result);
        const json_final = File_c.readLevel(result);
        let ca = new Convert_adofai();
        ca.SetLevel(json_final);
        ca.StartProcess();

    } catch (e) {
        const title = e.name;
        const msg = e.stack;
        Ui_Controller.Report_Error(title,msg)
    }
}

class Convert {
     static async File2Json(levelFileName) {
        let e = await this.ReadFileProcess(levelFileName);
        const test = e;
        console.log(test);
        return e
    }

    static async ReadFileProcess(FileName) {
        return await Zip_File.files[FileName].async("string")
    }
}

