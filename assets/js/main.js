//timer
var minutes = 0;
var seconds = 0;
var tens = 0;
var Interval;

$(".start-button").on("click", function(){
    initTimer();
});

function initTimer() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

$(".stop-button").on("click", function(){
    clearInterval(Interval);
});

$(".button-reset").on("click", function(){
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    minutes = "00";
    $("#tens").text(tens);
    $("#seconds").text(seconds);
});

function startTimer() {
    tens++;

    if (tens > 99) {
        console.log("seconds");
        seconds++;
        $("#seconds").text("0" + seconds);
        tens = 0;
        $("#tens").text("0" + 0);
    }

    if (seconds > 9) {
        $("#seconds").text(seconds);
    }

    if(seconds > 59){
        console.log("minutes");
        minutes++;
        $("#minutes").text("0" + minutes);
        seconds = 0;
        $("#seconds").text("0" + 0);
    }
    if (minutes > 9) {
        $("#seconds").text(minutes);
    }
}

const inputArray = [];
    function createBox() {
        for (let n = 1; n <= 9; n++) {
            let squareDiv = $("<div class=squareBox></div>");
            squareDiv.attr("id", "box-" + n);
            $("#tableGame").append(squareDiv);
        }
        $("#tableGame").addClass("outsideDiv");

    }
    createBox();
    assignInputArray();
    assignInputBox(inputArray);
    function assignInputArray() {
        for (let i = 0; i < 9; i++) {
            let row = [];
            for (let j = 0; j < 9; j++) {
                let input = $("<input type='text' data-input='" + i + "-" + j + "' maxlength='1' class='inputBox'/>");
                row.push(input);
            }
            inputArray.push(row);
        }
    }

    function assignInputBox(elements) {
        for (var i = 0; i < elements.length; i++) {
            for (var j = 0; j < elements[i].length; j++) {
                if (i <= 2 && j <= 2) {
                    $("#box-1").append(elements[i][j]);
                }
                if (i <= 2 && (j > 2 && j <= 5)) {
                    $("#box-2").append(elements[i][j]);
                }
                if (i <= 2 && (j > 5 && j <= 8)) {
                    $("#box-3").append(elements[i][j]);
                }
                //Second file
                if ((i > 2 && i <= 5) && j <= 2) {
                    $("#box-4").append(elements[i][j]);
                }
                if ((i > 2 && i <= 5) && (j > 2 && j <= 5)) {
                    $("#box-5").append(elements[i][j]);
                }
                if ((i > 2 && i <= 5) && (j > 5 && j <= 8)) {
                    $("#box-6").append(elements[i][j]);
                }
                //Last file
                if ((i > 5 && i <= 8) && j <= 2) {
                    $("#box-7").append(elements[i][j]);
                }
                if ((i > 5 && i <= 8) && (j > 2 && j <= 5)) {
                    $("#box-8").append(elements[i][j]);
                }
                if ((i > 5 && i <= 8) && (j > 5 && j <= 8)) {
                    $("#box-9").append(elements[i][j]);
                }
            }
        }

    }


// FP-12-solve-button
//This function will validate the sudoku table and take the time.
$(".validate").on("click", function(){
    $(".totalTime").html("");
    //Stop the timer
    //clearInterval(Interval);

    let minutes = $("#minutes").text();
    let seconds = $("#seconds").text();
    let tens = $("#tens").text();

    //let sudoku = checkNumbers()
    $(".totalTime").append("You have used to carry out the sudoku: <b>"+minutes+":"+seconds+":"+tens+"</b>");
    $("#checkSudoku").modal("show");

});


//FP-16-fill-game-board

//When the buttons with the class level are clicked we get the level send to the api and get the numbers
//then print the numbers insede the boxes and get the solution
$(".level").on("click", function (){
    $("h1").eq(0).text($(this).text());
    let level = $(this).text().toLowerCase();

    $.ajax({
        url: "https://sugoku.herokuapp.com/board?difficulty="+level,
        method: "GET",
        crossDomain: true,
        dataType: 'json',
        success:function (result){
            showNumbers(result.board);
            //Start Timer
            initTimer();
            result = {board: JSON.stringify(result.board)}
            $.post('https://sugoku.herokuapp.com/solve', result)
                .done(function (response) {
                    solved = response.solution;
                });
        }
    });
});

//This function print the numbers inside the boxes
function showNumbers(numbers){
    for(var i = 0; i<inputArray.length; i++){
        for(var j = 0; j< inputArray[i].length; j++){
            if($(numbers)[i][j] !== 0){
                $(inputArray[i][j]).val($(numbers)[i][j]);
                $(inputArray[i][j]).prop("disabled", true)
            } else {
                $(inputArray[i][j]).val("");
                $(inputArray[i][j]).prop("disabled", false)
            }
        }
    }
}
