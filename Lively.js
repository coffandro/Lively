let Status = {
    Hunger:10,
    level:1
}

window.onload = function() {
    if (localStorage.hasOwnProperty("LivelyStatus")) {
            Status = JSON.parse(localStorage.getItem("LivelyStatus"));
        console.log("data: ", Status);
    };
    UpdateData()
    if (localStorage.hasOwnProperty("LivelyImage")) {
        let SVG = localStorage.getItem("LivelyImage");
        document.getElementById("test").innerHTML = SVG;
        console.log("data: ", Status);
    } else {
        generateBlob('curvy')
    };
};

function GetLevel() {
    return ((Status["level"] - 1) / 9) * (0.05 - 1.35) + 1.35;
}

function getRandomArbitrary(min, max) {
    return Math.flMath.random() * (max - min) + min;
}

function SaveGame() {
    localStorage.setItem("LivelyStatus", JSON.stringify(Status));
    GetBlobPoint();
};

function Hurt() {
    Status["Hunger"] -= 1;
    UpdateData()
};

function Heal() {
    Status["Hunger"] += 1;
    UpdateData()
};

function UpdateData() {
    document.getElementById("HungerLabel").textContent = "Hunger:" + Status["Hunger"];
};