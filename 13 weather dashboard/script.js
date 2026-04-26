let temperatureData = [30, 32, 29, 31, 33];
let humidityData = [60, 65, 55, 70, 75];
let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

let tempChart = document.getElementById("tempChart");
let humidityChart = document.getElementById("humidityChart");

for (let i = 0; i < temperatureData.length; i++) {
    tempChart.innerHTML += `
        <div class="bar temp-bar" style="height:${temperatureData[i] * 5}px">
            ${days[i]}
        </div>
    `;
}

for (let i = 0; i < humidityData.length; i++) {
    humidityChart.innerHTML += `
        <div class="bar humidity-bar" style="height:${humidityData[i] * 2}px">
            ${days[i]}
        </div>
    `;
}