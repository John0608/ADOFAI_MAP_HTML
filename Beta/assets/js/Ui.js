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
        this.ChangeStatustxt("변환하실 파일을 선택해주세요!");
        let box = document.querySelector(Document_Select_List.Select_Box);
        let select_box = document.querySelector(".select_option")
        LevelList.forEach((index)=>{
            let sel = document.createElement("option");
            sel.innerText = index;
            sel.value = index;
            select_box.appendChild(sel);
        })

        box.style.display = "Block";
    }
    static Report_Error(title, msg)
    {
        let h = document.querySelector("#head");
        let m = document.querySelector("#msg");
        h.textContent = title;
        m.textContent = msg;
    }



}