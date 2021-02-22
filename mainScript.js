var buttons = $('.my-button');
var timeBlocks = $('.time-block-holder');
var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

var schedule = localStorage.getItem('schedule');
if(schedule == null){
    var templateList = ['','','','','','','','','']
    var listToSet = JSON.stringify(templateList);
    localStorage.setItem('schedule', listToSet);
} else {
    schedule = JSON.parse(schedule);
}

function updateSchedule(){
    schedule = JSON.stringify(schedule)
    localStorage.setItem('schedule', schedule);
    schedule = JSON.parse(localStorage.getItem('schedule'));
}

function displaySchedule(){
    for(var i = 0; i < timeBlocks.length; i++){
        $(timeBlocks[i]).children().eq(1).val(schedule[i]);
    }
}

function onSaveClick(event){
    myIndex = $(event.target).attr('my-index');
    var valToSet = $(timeBlocks[myIndex]).children().eq(1).val();
    schedule[myIndex] = valToSet;
    updateSchedule();
    displaySchedule();
} 

for(var i = 0; i < buttons.length; i++){
    $(buttons[i]).attr('my-index', i);
    $(buttons[i]).on('click', onSaveClick);
}

function updateBgs(){
    var now = new Date();
    $('.date-text').text(month[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear());
    var hour = now.getHours();
    // console.log(hour);
    // timeBlocks.children().css('background-color', 'white');
    for(var i = 0; i< timeBlocks.length; i++){
        var blockTime = Number($(timeBlocks[i]).children().eq(2).attr('my-index')) + 9;
        // console.log(blockTime);
        if(blockTime < hour){
            $(timeBlocks[i]).children().css('background-color', 'rgb(176, 184, 202)');
        } else if (blockTime == hour){
            $(timeBlocks[i]).children().css('background-color', 'rgb(173, 255, 234)');
        }
    }
}

displaySchedule();
updateBgs();