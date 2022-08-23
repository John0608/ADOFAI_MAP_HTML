class File {
    readLevel(File, LevelFile_Name){
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
        const FileResult = this.ReadFileProcess(File,LevelFile_Name);
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
}