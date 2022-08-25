const OnFileSelect = (target) => {
    let f_name = target.value;
    Convert.File2Json(f_name)
}

class Convert {
    static File2Json(levelFileName)
    {
        let e = this.ReadFileProcess(levelFileName);
        console.log(e);
        console.log(typeof(e));console.log(e.value);
        setTimeout(()=>{},1000);
        console.log(e);
    }
    static ReadFileProcess(FileName)
    {
        return new Promise(resolve => {
            Zip_File.files[FileName].async("string").then((base64Text) => {
                resolve(base64Text);
            })
        })

    }
}