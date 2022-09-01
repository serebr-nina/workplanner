// save business hours with reminders
var myDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
]

// display current date
function getHeaderDate() {
    var currentHeaderDate = moment().format("dddd, MMM Do YY");
    $("#currentDay").text(currentHeaderDate);
}
// load header date
getHeaderDate();

// save data to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// set data in localStorage to print
function displayReminders() {
    myDay.forEach(function (_thisHour) {
        console.log(_thisHour.id);
        $("#input" + _thisHour.id).val(_thisHour.reminder);
    })
}

// set existing localStorage data to print
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));
    if (storedDay) {
        myDay = storedDay;
    }
    saveReminders();
    displayReminders();
}

// create the visuals for the scheduler body
myDay.forEach(function (thisHour) {
    // create hour-text-button row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // create time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
        });

    var hourTask = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    // create textarea input element    
    var taskData = $("<textarea>");
    hourTask.append(taskData);
    taskData.attr("id", "input" + thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        taskData.attr({
            "class": "past",
        })
    } else if (thisHour.time === moment().format("HH")) {
        taskData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        taskData.attr({
            "class": "future"
        })
    }
    // create save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var saveTask = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
        });
    saveTask.append(saveButton);
    hourRow.append(hourField, hourTask, saveTask);
});
// load any existing localstorage data after components created
init();

// save data to be used in localStorage
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future, .present, .past").attr("id");
    // drop the 'input' prefix
    saveIndex = saveIndex.substring(5);
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future, .present, .past").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
});