let Status = {
    Hunger:10,
    level:1,
    date:1722993141038 
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
    CalculateTimeSinceLogon();
};

function CalculateTimeSinceLogon() {
    let date1 = new Date().getTime();
    let date2 = Status["date"];

    // Calculating the time difference
    // of two dates
    let Difference_In_Time =
    date1 - date2;

    // Calculating the no. of days between
    // two dates
    let Difference_In_Days =
    Math.round
        (Difference_In_Time / (1000 * 3600 * 24));

    if (Difference_In_Days > Status["Hunger"]) {
        Dead()
    } else {
        Status["Hunger"] = Status["Hunger"] - Difference_In_Days
        UpdateData()
    }
}

function Dead() {
    console.log("DEAD");
}

function GetLevel() {
    return ((Status["level"] - 1) / 9) * (0.05 - 1.35) + 1.35;
}

function getRandomArbitrary(min, max) {
    return Math.flMath.random() * (max - min) + min;
}

function SaveGame() {
    let date = new Date("08/17/2024");
    Status["date"] = date.getTime();
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