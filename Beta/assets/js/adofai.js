class ADOFAI {
    
    findLevel(ZipFile) {
        let level_arr = new Array();
        Object.keys(ZipFile["files"]).forEach((index) => {
            if(index.indexOf(".adofai") != -1)
            {
                level_arr.push(index);
            }
        })
        if(level_arr.length == 0) {
            alert("Zip 파일 내 .adofai 파일을 찾을 수 없습니다.");
            upload_init();
            init();
            return false;
        }
        else {
            alert("찾음");
            console.log(level_arr);
            return level_arr;
        }
    }

    selectLevel()
    {
        
    }
}