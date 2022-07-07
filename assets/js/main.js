//timer
$(".onGame").hide();
$(".onGame").prop("disabled", true);

const inputArray = [];
var solved = [];
var minutes = 0;
var seconds = 0;
var tens = 0;
var Interval;
var level = "";
var name = "";
var numbersArray = [];
var totalInputs = 81;

function createBox() {
    for (let n = 1; n <= 9; n++) {
        let squareDiv = $("<div class=squareBox></div>");
        squareDiv.attr("id", "box-" + n);
        $("#tableGame").append(squareDiv);
    }
    $("#tableGame").addClass("outsideDiv");
}

function assignInputArray() {
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let input = $("<input type='text' data-input='" + i + "-" + j + "' maxlength='1' class='bg-light bg-gradient inputBox'/>");
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

$(document).ready(function (){
    $(".alert-username").hide();
    $("#userNameModal").modal("show");
    $("#username").focus();


    function cleanInputArray(){
        $(".inputBox").removeClass("bg-secondary");
        $(".inputBox").removeClass("input-default");
    }
    //Function for get the user name
    $("#btn-getUser").on("click", function() {
        getUserName();
    });

    function getUserName(){
        $(".alert-username").fadeOut();
        let userName = $("#username").val();
        $(".get-username").text(userName);
        if(userName === ""){
            $(".alert-username").fadeIn();
            $("#username").focus()
            return false;
        }
        name = userName;
        $("#userNameModal").modal("hide");
        $(".scores").fadeIn();
        if(localStorage.length > 0){
            $(".scores").prop("disabled", false);
        }
        return true;
    }

    function initTimer() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        $("#dinoTimer").attr("src", "./assets/img/dinoTimer.gif");
    }

    $(".start-button").on("click", function(){
        initTimer();
    });

    $(".stop-button").on("click", function(){
        clearInterval(Interval);
        $("#dinoTimer").attr("src", "./assets/img/dinoTimerStatic.png");

    });

    $(".button-reset").on("click", function(){
        restartTimer();
    });

    //This function check if the input has a number or an other character
    $(".inputBox").on("change", function(){
        if(isNaN($(this).val()) || $(this).val() == 0){
            $(this).val("");
        }
        if (level === "easy"){
            checkVal();
        }
    });

//This function restore the timer to 00:00
    function restartTimer(){
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        minutes = "00";
        $("#tens").text(tens);
        $("#seconds").text(seconds);
        $("#dinoTimer").attr("src", "./assets/img/dinoTimerStatic.png");

    }

    function startTimer() {
        tens++;


        if (seconds > 9) {
            $("#tens").text(tens);
        }

        if (tens > 99) {
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

// FP-12-solve-button
//This function will validate the sudoku table and take the time.
    $(".validate").on("click", function(){
        $(this).prop("disabled", true);
        $(".totalTime").html("");
        $("#head-score").html("");
        $(".inputBox").prop("disabled", true);
        $(".inputBox").removeClass("showRowCol");
        $("#dinoTimer").attr("src", "./assets/img/dinoTimerStatic.png");

        //Stop the timer
        clearInterval(Interval);
        let minutes = $("#minutes").text();
        let seconds = $("#seconds").text();
        let tens = $("#tens").text();
        let content ="";
        $(".btn-level").prop("disabled", false);

        let result = checkAll();
        localStorage.setItem(parseInt(localStorage.length+1), JSON.stringify(result));

        let text = $("<p class='text-black'></p>")
        if(result.status){
            $("#head-score").append("Congratulations! <b>"+result.user+"</b> &#127881; &#127882;");
            $(".head-result").addClass("alert alert-success");
            content = "You have spent: <b>"+minutes+" min : "+seconds+" sec: "+tens+" msec</b> <br/><br/> Your Score is: <b>"+result.score+"%</b></p><p class='fst-italic alert alert-info'>"+result.message+" </p>";

        } else {
            $("#head-score").append("You didn't get it! <b>"+result.user+"</b> &#10060;")
            $(".head-result").addClass("alert alert-danger");
            content = "You have spent: <b>"+minutes+":"+seconds+":"+tens+"</b> <br/><br/> Your Score is: <b>"+result.score+"%</b></p><p class='fst-italic alert alert-warning'>"+result.message+" </p>";
        }
        text.append(content);
        $(".totalTime").append(text);

        //let sudoku = checkNumbers()
        $("#checkSudoku").modal("show");
    });


//FP-16-fill-game-board
//When the buttons with the class level are clicked we get the level send to the api and get the numbers
//then print the numbers insede the boxes and get the solution
    $(".level").on("click", function (){
        //Clean array
        cleanInputArray();

        $(".inputBox").prop("disabled", false);
        $(".inputBox").removeClass("bg-secondary");
        $(".inputBox").addClass("bg-light");

        $("h1").eq(0).text($(this).text());
        level = $(this).text().toLowerCase();
        level = level.trim();

        //Dino animation
        $("#dino").animate({
            left:"100%"},  2000);
        $("#dino").animate({
            opacity: "0"});
        $("#dino").animate({
            left:"-11%"});
        $("#dino").animate({
            opacity: "100"});

        //Ajax information
        $.ajax({
            url: "https://sugoku.herokuapp.com/board?difficulty="+level,
            method: "GET",
            crossDomain: true,
            dataType: 'json',
            success:function (result){
                $(".btn-level").prop("disabled", true);
                numbersArray = result.board;
                showNumbers(result.board);
                $(".onGame").prop("disabled", false);
                $(".onGame").fadeIn();

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
    function showNumbers(numbers, solved = false){
        totalInputs = 81;
        //Clean the showRolCol Styles
        $(".inputBox").removeClass("showRowCol");
        for(var i = 0; i<inputArray.length; i++){
            for(var j = 0; j< inputArray[i].length; j++){
                if($(numbers)[i][j] !== 0){
                    totalInputs--;
                    $(inputArray[i][j]).val($(numbers)[i][j]);
                    $(inputArray[i][j]).prop("disabled", true)
                    $(inputArray[i][j]).removeClass("bg-light");
                    $(inputArray[i][j]).addClass("bg-secondary");
                    if(!solved){
                        $(inputArray[i][j]).addClass("input-default");
                    }
                } else {
                    $(inputArray[i][j]).val("");
                    $(inputArray[i][j]).addClass("bg-light");
                    $(inputArray[i][j]).prop("disabled", false)
                }
            }
        }
    }

    //Show Row Column Box
    $(document).on("focus", ".inputBox", function (event) {
        if(level === ""  || level === "easy"){
            $(".inputBox").removeClass("showRowCol");
            var chooseBox = event.target;
            var position = $(chooseBox).attr("data-input").split("-");
            for (var i = 0; i < 9; i++) {
                if(!inputArray[position[0]][i].hasClass("bg-warning")){
                    inputArray[position[0]][i].addClass("showRowCol");
                }
                if(!inputArray[i][position[1]].hasClass("bg-warning")){
                    inputArray[i][position[1]].addClass("showRowCol");
                }
            }
            var parentBox = $(chooseBox).parent().attr("id").split("-");
            $("#box-" + parentBox[1] + " input:not(input.bg-warning)").addClass("showRowCol");
        }
    });

    /* Set the width of the side navigation to 385px */
    $("#btn-sideMenu").on("click", function () {
        $("#mySidenav").css("width", "250");
    });

    /* Set the width of the side navigation to 0 */
    $("#btn-clssideMenu").on("click", function () {
        $("#mySidenav").css("width", "0");
    });


//This button gonna clear the game table, reset the time
    $(".new").on("click", function(){

        //Clean array
        cleanInputArray();

        let inputBox = $(".inputBox");
        $(".onGame").prop("disabled", true);
        $(".onGame:first-child, .validate, .onGame:last-child").prop("disabled", false);
        totalInputs = 81;

        restartTimer();
        level = "";

        $("h1").eq(0).text("Timer");
        inputBox.removeClass("bg-secondary");
        inputBox.removeClass("bg-light");
        inputBox.addClass("bg-light");
        inputBox.removeClass("bg-warning");
        inputBox.val("");
        inputBox.prop("disabled", false);
        $(".btn-level").prop("disabled", false);
    });

//This function reset your numbers and reset the timer
    $(".reset").on("click", function() {
        $(".inputBox").removeClass("bg-warning");
        $(".validate").prop("disabled", false);
        showNumbers(numbersArray);
        restartTimer();
        initTimer();
    });

//Event for the button resolve sudoku
    $(".solve").on("click", function(){
        $(".inputBox").removeClass("bg-warning");
        $(".validate").prop("disabled", true);
        showNumbers(solved, true);
        restartTimer();
    });

    function compare(a, b) {
        if (parseFloat(a.score) < parseFloat(b.score) ) {
            return -1;
        }
        if (parseFloat(a.score) > parseFloat(b.score)) {
            return 1;
        }
        return 0;
    }
    $(".scores").on("click", function(){
        let total = 1;
        $(".list-scores").html("");
        let scores = [];
        for(var i = 1; i <=localStorage.length; i++){
            scores.push(JSON.parse(localStorage[i]));
        }
        scores.sort(compare);

        for(var j = scores.length-1; j >= 0; j--){
            let tr = $("<tr></tr>");
            let tdN = $("<td></td>");
            let tdSt = $("<td></td>");
            let tdSc = $("<td></td>");
            let tdL = $("<td></td>");
            let tdP = $("<td></td>");
            console.log(scores[j].status)
            tdP.append(total);
            tdN.append(scores[j].user);
            tdSt.append(scores[j].status+" ");
            tdSc.append(scores[j].score+"%");
            tdL.append(scores[j].level);

            tr.append(tdP);
            tr.append(tdN);
            tr.append(tdSc);
            tr.append(tdSt);
            tr.append(tdL);
            $(".list-scores").append(tr);
            total++;
        }
        $("tbody tr").eq(0).addClass("list-group-item-success");
        $("#modal-scores").modal("show");
    });
//This function read the inputs data and evaluate the score
    function checkAll (){
        let count = 0;
        var inputsTrue = totalInputs;
        let totalScore = 0;
        console.log(inputsTrue)

        for(var n = 0; n<inputArray.length; n++){
            for(var j = 0; j< inputArray[n].length; j++){
                if($(inputArray[n][j]).val() != ""){
                    var rest = true;
                    var inp =inputArray[n][j];
                    var inputData = $(inp).attr("data-input").split("-");

                    inputArray[inputData[0]].splice(inputData[1], 1, inp);
                    let inputBox = $(inp).parent();
                    //Check if the value exist in the same row
                    inputArray[inputData[0]].forEach(function(element, key){
                        console.log(element)
                        if($(element).val() === $(inp).val() && $(element).attr("data-input") !== $(inp).attr("data-input")){
                            $(inp).removeClass("bg-light");
                            $(inp).addClass("bg-warning");
                            $(element).addClass("bg-warning");

                            //If the if is correct we change the rest to false for then we can rest just one time
                            rest = false;
                            if(count !== 1 && count !== 3 && count !== 5 && count !== 7){
                                count += 1;
                            }
                        }
                    });

                    //Check if the value exist in the same col
                    for(var i = 0; i< inputArray.length ; i++){
                        var element = inputArray[i][inputData[1]];
                        if($(element).val() === undefined){
                            console.log($(element).val())
                            return;
                        }
                        if($(element).val() === $(inp).val() && $(element).attr("data-input") !== $(inp).attr("data-input")){
                            $(inp).removeClass("bg-light");
                            $(inp).addClass("bg-warning");
                            $(element).addClass("bg-warning");
                            rest = false;

                            if(count !== 2 && count !== 3 && count !== 6 && count !== 7){
                                count += 2;
                            }
                        }
                    }

                    inputBox.children().each(function(index, element){
                        //Check if the element exist in the box and if the element es different to empty and if element and event have different index
                        if(element.value === $(inp).val() && $(element).index() !== $(inp).index()){
                            $(inp).removeClass("bg-light");
                            $(inp).addClass("bg-warning");
                            $(element).addClass("bg-warning");
                            rest = false;
                            if(count !== 4 && count !== 5 && count !== 6 && count !== 7){
                                count += 4;
                            }
                        }
                    });
                    if(!rest && !$(inp).hasClass("input-default")){
                        inputsTrue--;
                    }
                } else {
                    inputsTrue--;
                }
            }
        }
        // console.log(totalInputs)
        totalScore = (inputsTrue*100/totalInputs).toFixed(2);

        if(inputsTrue === 0 && count === 0){
            count = -1;
        }else if (totalScore != 100){
            count = -2;
        }


        switch (count){
            case 0:
                return {status: true, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "Well Done! You have successfully completed the Sudoku"};
                break;
            case 1:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "You have same values in the same Row"};
                break;
            case 2:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "You have same values in the same Column"};
                break;
            case 4:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "You have same values in the same Box"};
                break;
            case 3:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "You have same values in the same Row and Column"};
                break;
            case 5:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "You have same values in the same Row and Box"};
                break;
            case 6:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "You have same values in the same Column and Box"};
                break;
            case 7:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "You have same values in the same Row, Column and Box"};
                break;
            default:
                return {status: false, user:name, level:$("h1").eq(0).text(), score:totalScore, message: "Your sudoku is incomplete..."};
                break;
        }
    }

    function checkVal (){
        $(".inputBox").removeClass("bg-warning");
        $(".inputBox").addClass("bg-light");
        $(".input-default").addClass("bg-secondary");
        $(".input-default").removeClass("bg-light");

        for(var n = 0; n<inputArray.length; n++){
            for(var j = 0; j< inputArray[n].length; j++){
                if($(inputArray[n][j]).val() != ""){
                    var inp =inputArray[n][j];
                    var inputData = $(inp).attr("data-input").split("-");

                    inputArray[inputData[0]].splice(inputData[1], 1, inp);
                    let inputBox = $(inp).parent();
                    //Check if the value exist in the same row
                    inputArray[inputData[0]].forEach(function(element, key){
                        if($(element).val() === $(inp).val() && $(element).attr("data-input") !== $(inp).attr("data-input")){
                            $(inp).removeClass("bg-light");
                            $(inp).addClass("bg-warning");
                            $(element).addClass("bg-warning");

                            $(inp).removeClass("showRowCol");
                            $(inp).removeClass("showRowCol");

                        }
                    });

                    //Check if the value exist in the same col
                    for(var i = 0; i< inputArray.length ; i++){
                        var element = inputArray[i][inputData[1]];
                        if($(element).val() === undefined){
                            console.log($(element).val())
                            return;
                        }
                        if($(element).val() === $(inp).val() && $(element).attr("data-input") !== $(inp).attr("data-input")){
                            $(inp).removeClass("bg-light");
                            $(inp).addClass("bg-warning");
                            $(element).addClass("bg-warning");

                            $(inp).removeClass("showRowCol");
                            $(inp).removeClass("showRowCol");
                        }
                    }

                    inputBox.children().each(function(index, element){
                        //Check if the element exist in the box and if the element es different to empty and if element and event have different index
                        if(element.value === $(inp).val() && $(element).index() !== $(inp).index()){
                            $(inp).removeClass("bg-light");
                            $(inp).addClass("bg-warning");
                            $(element).addClass("bg-warning");

                            $(inp).removeClass("showRowCol");
                            $(inp).removeClass("showRowCol");
                        }
                    });
                }
            }
        }
    }

});

createBox();
assignInputArray();
assignInputBox(inputArray);
