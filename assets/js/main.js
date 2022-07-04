
//timer
window.onload = function () {
    var minutes = 0;
    var seconds = 0;
    var tens = 0;
    var appendTens = document.getElementById("tens");
    var appendSeconds = document.getElementById("seconds");
    var appendMinutes = document.getElementById("minutes");
    var buttonStart = document.getElementById("button-start");
    var buttonStop = document.getElementById("button-stop");
    var buttonReset = document.getElementById("button-reset");
    var Interval;

  buttonStart.onclick = function () {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  }

  buttonStop.onclick = function () {
    clearInterval(Interval);
  }

  buttonReset.onclick = function () {
    clearInterval(Interval);
    seconds = "0";
    minutes = "0";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = "0" +seconds;
    appendMinutes.innerHTML = "0" +minutes;
  }

  function startTimer() {
    tens++;

    if (tens <= 9) {
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
      appendTens.innerHTML = tens;
    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds <= 9){
        appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }
    if(seconds > 59){
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes <= 9){
        appendMinutes.innerHTML = "0" + minutes;
    }

    if (minutes > 9) {
      appendMinutes.innerHTML = minutes;
    }
  }
};
const inputArray = [];
    function createBox() {
        for (let n = 1; n <= 9; n++) {
            let squareDiv = $("<div class=squareBox></div>");
            squareDiv.attr("id", "box-" + n);
            $("#tableGame").append(squareDiv);
        };
        $("#tableGame").addClass("outsideDiv");

    };
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
    };

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

    };
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
//This function will validate the sudoku table and take the time.
$(".validate").on("click", function(){
    //Stop the timer
    //clearInterval(Interval);

    let minutes = $("#minutes").text();
    let seconds = $("#seconds").text();
    let tens = $("#tens").text();

    //let sudoku = checkNumbers()
    $(".totalTime").append("You have used to carry out the sudoku: <b>"+minutes+":"+seconds+":"+tens+"</b>");
    $("#checkSudoku").modal("show");

});
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

 //Show Row Column Box
 $("input").focus(function (event) {
    $("input").removeClass("showRowCol");
    var chooseBox = event.target;
    var position = $(chooseBox).attr("data-input").split("-");
    for (var i = 0; i < 9; i++) {
        inputArray[position[0]][i].addClass("showRowCol");
        inputArray[i][position[1]].addClass("showRowCol");
    };
    var parentBox = $(chooseBox).parent().attr("id").split("-");
    $("#box-" + parentBox[1] + " input").addClass("showRowCol");
})
