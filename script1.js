function randomizeDestination() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then(function(json) {
            let destination = json[Math.floor(Math.random() * json.length)];
            const div = document.getElementById("missionTarget");
            div.innerHTML = `
                <ol>
                   <li>Name: ${destination.name}</li>
                   <li>Diameter: ${destination.diameter}</li>
                   <li>Star: ${destination.star}</li>
                   <li>Distance from Earth: ${destination.distance}</li>
                   <li>Number of Moons: ${destination.moons}</li>
                </ol>
                <img src='${destination.image}'>
             `;
        });
    });
}

function setDestination() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then(function(json) {
            let destination = document.getElementById("selectDestination").value;
            const div = document.getElementById("missionTarget");
            div.innerHTML = `
                            <h2>Destination</h2>
                            <ul>
                            <li> Name: ${json[destination].name} </li> 
                            <li> Diameter: ${json[destination].diameter} </li> 
                            <li> Star: ${json[destination].star} </li> 
                            <li> Distance from Earth: ${json[destination].distance} </li> 
                            <li> Number of Moons: ${json[destination].moons} </li> 
                            </ul>
                            <img src="${json[destination].image}">
                            `;
        });
    });
}



function updateLaunchStatus() {
    let pilotNameInput = document.querySelector("input[name=pilotName]").value;
    let copilotNameInput = document.querySelector("input[name=copilotName]").value;
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
    let cargoMassInput = document.querySelector("input[name=cargoMass]").value;

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    if (fuelLevelInput > 10000 && cargoMassInput < 10000 && pilotNameInput !== "" && copilotNameInput !== "") {
        launchStatus.innerHTML = "Shuttle is ready to launch!";
        launchStatus.style.color = "green";
        faultyItems.style.visibility = "hidden";
    } else {
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        faultyItems.style.visibility = "visible"; {
            if (pilotNameInput === "") {
                pilotStatus.innerHTML = "Flight needs pilot";
            }
            if (copilotNameInput === "") {
                copilotStatus.innerHTML = "Flight needs co-pilot";
            }
            if (fuelLevelInput < 10000) {
                fuelStatus.innerHTML = "Not enough fuel";
            }
            if (cargoMassInput > 10000) {
                cargoStatus.innerHTML = "Too much cargo weight";
            }
        }
    }
}

function initialAlert(message) {
    alert(message);
    event.preventDefault();
}

function validateEntry() {
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    if (pilotNameInput.value === "" || !(isNaN(pilotNameInput.value))) { //|| pilotNameInput.value !== isNaN) {
        pilotNameWarning = "-Please enter a name for pilot.\n";
        event.preventDefault();
    } else {
        pilotNameWarning = "";
    }
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    if (copilotNameInput.value === "" || !(isNaN(copilotNameInput.value))) { //|| copilotNameInput.value !== isNaN) {
        copilotNameWarning = "-Please enter a name for co-pilot.\n"
        event.preventDefault();
    } else {
        copilotNameWarning = "";
    }
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    if (fuelLevelInput.value === "") {
        fuelLevelInputWarning = "-Please enter a valid fuel amount.  Must be an integer.\n";
        event.preventDefault();
    } else {
        fuelLevelInputWarning = "";
    }
    let cargoMassInput = document.querySelector("input[name=cargoMass]");
    if (cargoMassInput.value === "") {
        cargoMassInputWarning = "-Please enter a valid total mass of cargo.  Must be an integer.\n";
        event.preventDefault();
    } else {
        cargoMassInputWarning = "";
    }
    totalAlertMessage = (pilotNameWarning + copilotNameWarning + fuelLevelInputWarning + cargoMassInputWarning)
    if (totalAlertMessage === "") {
        updateLaunchStatus();
    } else {
        alert(totalAlertMessage);
        updateLaunchStatus();
    }
}

function showResults() {
    var resultMessage = document.getElementById("launchStatusCheck");
    if (resultMessage.style.display === "none") {
        resultMessage.style.display = "block";
    } else {
        resultMessage.style.display = "none";
        resultMessage.reset();
    }
}
//
window.addEventListener("load", function() {
    setDestination();
    let button = document.getElementById("formSubmit");
    button.addEventListener("click", function(event) {
        validateEntry();
    });
});