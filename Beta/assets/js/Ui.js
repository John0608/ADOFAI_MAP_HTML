class Ui_Controller {
    static Hide(element) {
        document.querySelector(element).style.display = "None";
    }
    static Show(element) {
        document.querySelector(element).style.display = "Block";
    }
    static ChangeStatustxt(message) {
        document.querySelector(".status_txt").textContent = message;
    }
    static Display_LevelList(LevelList)
    {
        let doc = document.querySelector(Document_Select_List.Select_Button);

        LevelList.forEach((index)=>{
            let sel = document.createElement("option");
            sel.innerText = index;
            sel.value = index;
            doc.appendChild(sel);
        })

        doc.style.display = "Block";
    }



}