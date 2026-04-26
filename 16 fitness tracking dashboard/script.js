const fitnessData = [
{
    steps:[5000,7000,8000,6000,9000],
    weekly:[6,8,7,9],
    activity:[40,35,25]
},
{
    steps:[6000,8500,7500,9500,10000],
    weekly:[7,9,8,10],
    activity:[30,45,25]
},
{
    steps:[7000,9000,8500,10000,11000],
    weekly:[8,10,9,11],
    activity:[50,30,20]
}
];

let days = ["Mon","Tue","Wed","Thu","Fri"];
let weeks = ["Week1","Week2","Week3","Week4"];

function loadData(index){

    let data = fitnessData[index];

    let lineChart = document.getElementById("lineChart");
    let barChart = document.getElementById("barChart");
    let pieChart = document.getElementById("pieChart");

    lineChart.innerHTML="";
    barChart.innerHTML="";

    /* Daily Steps Line Chart */
    for(let i=0;i<data.steps.length;i++){
        lineChart.innerHTML += `
        <div class="line-bar" style="height:${data.steps[i]/50}px">
            ${days[i]}
        </div>
        `;
    }

    /* Weekly Comparison Bar Chart */
    for(let i=0;i<data.weekly.length;i++){
        barChart.innerHTML += `
        <div class="bar" style="height:${data.weekly[i]*20}px">
            ${weeks[i]}
        </div>
        `;
    }

    /* Pie Chart */
    pieChart.innerHTML = `
        <div class="pie"
        style="
        background: conic-gradient(
            green 0% ${data.activity[0]}%,
            orange ${data.activity[0]}% ${data.activity[0]+data.activity[1]}%,
            red ${data.activity[0]+data.activity[1]}% 100%
        );
        ">
        </div>

        <div class="legend">
            <p><span class="box walk"></span>Walking - ${data.activity[0]}%</p>
            <p><span class="box run"></span>Running - ${data.activity[1]}%</p>
            <p><span class="box cycle"></span>Cycling - ${data.activity[2]}%</p>
        </div>
    `;
}

document.getElementById("weekSelect").addEventListener("change",function(){
    loadData(this.value);
});

loadData(0);