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