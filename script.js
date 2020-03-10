$(document).ready(function () {
    var hour = [
        totalHours
    ]
    function addHours() {
        for (var i = 0; i <= 8; i++) {
            if (JSON.parse(localStorage.getItem('hour'))) {
                hour = JSON.parse(localStorage.getItem('hour'));
            } else {
                if (i + 9 < 12) {
                    hour.push({
                        hour: `${i+9} am`,
                        task: ""
                    })
                } else {
                    if (i + 9 == 12) {
                        hour.push({
                            hour: `${i+9} pm`,
                            task: ""
                        })
                    } else {
                        hour.push({
                            hour: `${(i+9)-12} pm`,
                            task: ""
                        })
                    }
                }
            }
            $(`.container`).append(`<div class="event" id="event${i}"></div>`)
            $(`#event${i}`).append(`<p class= "totalHours">${hour[i].hour}</p>`);
            $(`#event${i}`).append(`<input id = "input-box"class="task-input${i}" value= '${hour[i].task}'><button class="save-btn fa fa-save" id="${i}"></button>`);
        }
    }
    function createEvent() {
        $(`.save-btn`).on('click', function (e) {
            var ID = (e.target.id);
            var input = $(`.task-input${ID}`).val()
            hour[ID].task = [];
            hour[ID].task.push(input)
            localStorage.setItem('hour', JSON.stringify(hour));
        })
    }
    function render() {
        for (var i = 0; i <= 8; i++) {
            if (i + 9 < moment().hour()) {
                $(`.task-input${i}`).css("background-color", "#D3D3D3")
            } else {
                $(`.task-input${i}`).css("background-color", "#C0C0C0")
            }
            if (moment().hour() == i + 9) {
                $(`.task-input${i}`).css("background-color", "green")
            }
        }
        var moment = moment();
        var day = `${moment.format("dddd")}, ${moment.format("MMMM Do")}`
        $(`#currentDay`).append(day)
    }
    addHours();
    render();
    createEvent();
});
