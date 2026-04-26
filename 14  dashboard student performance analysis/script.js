const students = [
{
    marks:[80,75,90,85,70],
    progress:[60,70,75,80,85],
    grades:[40,35,25]
},
{
    marks:[65,88,72,90,78],
    progress:[50,60,70,75,82],
    grades:[30,45,25]
},
{
    marks:[95,85,80,88,92],
    progress:[70,80,85,90,95],
    grades:[50,30,20]
}
];

let subjects = ["Math","Science","English","Java","DBMS"];
let tests = ["T1","T2","T3","T4","T5"];

function loadData(index){

    let student = students[index];

    let barChart = document.getElementById("barChart");
    let lineChart = document.getElementById("lineChart");
    let pieChart = document.getElementById("pieChart");

    barChart.innerHTML = "";
    lineChart.innerHTML = "";

    /* Bar Chart */
    for(let i=0; i<student.marks.length; i++){
        barChart.innerHTML += `
        <div class="bar" style="height:${student.marks[i]*2}px">
            ${subjects[i]}
        </div>
        `;
    }

    /* Pie Chart */
    pieChart.innerHTML = `
        <div class="pie" 
        style="
        background: conic-gradient(
            green 0% ${student.grades[0]}%,
            orange ${student.grades[0]}% ${student.grades[0]+student.grades[1]}%,
            red ${student.grades[0]+student.grades[1]}% 100%
        );
        ">
        </div>

        <div class="legend">
            <p><span class="green-box"></span>A Grade - ${student.grades[0]}%</p>
            <p><span class="orange-box"></span>B Grade - ${student.grades[1]}%</p>
            <p><span class="red-box"></span>C Grade - ${student.grades[2]}%</p>
        </div>
    `;

    /* Line Chart */
    for(let i=0; i<student.progress.length; i++){
        lineChart.innerHTML += `
        <div class="line-bar" style="height:${student.progress[i]*2}px">
            ${tests[i]}
        </div>
        `;
    }
}

/* Dropdown Change */
document.getElementById("studentSelect").addEventListener("change",function(){
    loadData(this.value);
});

/* Default Student */
loadData(0);