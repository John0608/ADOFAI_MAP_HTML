class Zip {
    async UnZip(file) {
        const result = await this.UnZipProcess(file);
        return result;
    }
    
    UnZipProcess(file) {
        return new Promise(resolve => {
            JSZip.loadAsync(file).then(
                function (zip) {
                    resolve(zip);
                }
            )
        })
    }
}

