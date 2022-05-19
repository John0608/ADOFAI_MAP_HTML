class Zip {
    loadData(file)
    {
        const ui = new Ui();
        if(upload.isUpload(file) == true)
        {
            JSZip.loadAsync(file).then(
                function (zip) {
                    let level = adofai_class.findLevel(zip);
                    addSelect(level);
                    ui.CompleateLoad();
                }
            )
        }
    }
}


