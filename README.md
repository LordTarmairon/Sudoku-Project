# Jurassic Doraemon Sudoku-Project
This is the final JavaScript project.


# CHEATS

var cheats = [{status: false, user:"Jose Luis", level:"Hard", score:28.00, message: "You have same values in the same Row, Column and Box"},
{status: false, user:"June", level:"Medium", score:99.00, message: "You have same values in the same Box"},
{status: false, user:"Henry", level:"Easy", score:45.00, message: "You have same values in the same Row and Column"},
{status: false, user:"Alyce", level:"Hard", score:66.66, message: "You have same values in the same Column"},
{status: true, user:"Jupiter God", level:"Hard", score:100.00, message: "By Jupiter! Well Done! You have successfully completed the Sudoku"}];

function cheatsOn (){
  for(var i = 0; i < cheats.length; i++){
    localStorage.setItem(parseInt(localStorage.length+1), JSON.stringify(cheats[i]));
  }
}

cheatsOn();
