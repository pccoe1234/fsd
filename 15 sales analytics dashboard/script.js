const salesData = [
{
    monthlySales:[50,70,90,60],
    categorySales:[80,60,40],
    revenue:[40,35,25]
},
{
    monthlySales:[60,85,75,95],
    categorySales:[70,50,60],
    revenue:[30,45,25]
},
{
    monthlySales:[90,65,80,100],
    categorySales:[90,55,45],
    revenue:[50,30,20]
}
];

let weeks = ["W1","W2","W3","W4"];
let categories = ["Electronics","Clothing","Grocery"];

function loadData(index){

    let data = salesData[index];

    let lineChart = document.getElementById("lineChart");
    let barChart = document.getElementById("barChart");
    let pieChart = document.getElementById("pieChart");

    lineChart.innerHTML="";
    barChart.innerHTML="";

    /* Line Chart */
    for(let i=0;i<data.monthlySales.length;i++){
        lineChart.innerHTML += `
        <div class="line-bar" style="height:${data.monthlySales[i]*2}px">
            ${weeks[i]}
        </div>
        `;
    }

    /* Bar Chart */
    for(let i=0;i<data.categorySales.length;i++){
        barChart.innerHTML += `
        <div class="bar" style="height:${data.categorySales[i]*2}px">
            ${categories[i]}
        </div>
        `;
    }

    /* Pie Chart */
    pieChart.innerHTML = `
        <div class="pie"
        style="
        background: conic-gradient(
            red 0% ${data.revenue[0]}%,
            orange ${data.revenue[0]}% ${data.revenue[0]+data.revenue[1]}%,
            green ${data.revenue[0]+data.revenue[1]}% 100%
        );
        ">
        </div>

        <div class="legend">
            <p><span class="box electronics"></span>Electronics - ${data.revenue[0]}%</p>
            <p><span class="box clothing"></span>Clothing - ${data.revenue[1]}%</p>
            <p><span class="box grocery"></span>Grocery - ${data.revenue[2]}%</p>
        </div>
    `;
}

document.getElementById("monthSelect").addEventListener("change",function(){
    loadData(this.value);
});

loadData(0);