class ADOFAI_utils {
    FindLevel() {
        let levelFiles = [];
        Object.keys(Zip_File.files).forEach((x)=>{
            if(x.substring(x.lastIndexOf(".")) == ".adofai"){
                levelFiles.push(x);
            }
        })
        return levelFiles;
    }
}