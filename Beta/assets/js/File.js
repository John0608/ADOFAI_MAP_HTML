class File {
    readLevel(File){
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
        const result = parseLevel(File);
        return result;
    }
}