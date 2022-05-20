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
            console.log(level_arr);
            return level_arr;
        }
    }

    async readLevel(File, LevelFile_Name){
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
        const FileResult = await this.ReadFileProcess(File,LevelFile_Name);
        const result = parseLevel(FileResult);
        return result;
    }

    ReadFileProcess(File, FileName)
    {
        return new Promise(resolve => {
            File.files[FileName].async("string").then((base64Text) => {
                resolve(base64Text);
            })
        })
    }

    isAdofaiLevel(Level)
    {
        if(Level.settings.version != undefined) {
            return true;
        }
        else{
            return false;
        } 
    }
    
}