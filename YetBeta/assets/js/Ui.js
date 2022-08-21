class Ui {
    Hide(element) {
        let e = document.querySelector(element);
        e.style.display = "None";
    }

    Show(element) {
        let e = document.querySelector(element);
        e.style.display = "block";
    }

    Pageinit() //처음 상태로 초기화
    {
        ui.Hide(".status");
        ui.Hide(".log_box");
        ui.Hide(".down_btn");
        ui.Hide(".error");
        ui.Hide(".select");
    }

    addLog(str) {
        let txt = $("#log").val()
        txt += str + "\n";
        $("#log").val(txt);
    }

    CompleateLoad() {
        ui.Show(".select");
        ui.Hide("#info_msg");
    }
    HideLevelSelector() {
        ui.Hide(".select");
    }

    ShowLog() {
        ui.Show(".status");
        ui.Show(".log_box");
    }

    ShowProgressAndStatus()
    {
        ui.Show(".status")
        ui.Show(".progress")
    }

    UpdateStatus(message) {
        let e = document.querySelector(".status > p");
        e.innerHTML = "진행중 : " + message;
    }

    UpdateProgress(percent) {
        let p = String(percent);
        let e = document.querySelector(".progress-bar");
        e.style.width = Number(p) + "%";
        e.innerText = p + "%";
    }

    addOption_disable()
    {
        let ele = document.createElement("option");
        ele.text = "선택해주세요";
        ele.disabled = true;
        document.querySelector(".select").add(ele);
    }

    init_Select()
    {
        document.querySelector(".select").innerHTML = "";
        this.addOption_disable();
    }
}