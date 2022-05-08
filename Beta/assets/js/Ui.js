class Ui {
    Hide(element){
        let e = document.querySelector(element);
        e.style.display = "None";
    }

    Show(element){
        let e = document.querySelector(element);
        e.style.display = "block";
    }
}