today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    currentYear.value = year;
    currentMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
              var workOutPlanBtn = document.createElement('input');
                workOutPlanBtn.type = "button";
                workOutPlanBtn.className = "btn btn-primary btn-sm workOutPlanBtn";
                workOutPlanBtn.value = 'Workout';
                
                var mealPlanBtn = document.createElement('input');
                mealPlanBtn.type = "button";
                mealPlanBtn.className = "btn btn-primary btn-sm mealPlanBtn";
                mealPlanBtn.value = 'Meal';
                
                $('.workOutPlanBtn').click(function() {
                    window.open('https://www.google.com');
                });
                
                $('.mealPlanBtn').click(function() {
                    window.open('https://www.google.com');
                });
            
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("highlight-today");
                } // color today's date
                cell.appendChild(cellText);
                cell.appendChild(workOutPlanBtn);
                cell.appendChild(mealPlanBtn);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}
// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}