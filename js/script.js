$( document ).ready(function() {
    console.log( "ready!" );
    $("h2").after('<div class="student-search page-header"><input type="text" id="searchForm" placeholder="Search for students..."><button>Search</button></div>'); //insert search bar and button on page load.
    launcher(); //run launcher function on page load.
    buttonPress();
});


/////////////////////////////////////////////////////////////////
// Variables
/////////////////////////////////////////////////////////////////
var $allStudents = $("student-list"); //stores the entire student list. A constant that is never altered.
var $studentsToShow; // stores LIs that match search or $allStudents, depending on conditional executed.
var studentsPerPage; //only needs to be global for pagination function to access it.

function launcher() {
     if(document.getElementById("searchForm").value ==='') {
     //if search bar is empty (as it will be on page load and if content of search bar area deleted, set value of $studentsToShow to all students.
         $studentsToShow = $( "ul.student-list" ).children( "li" ); //Sets value to all students, but not using the $allStudents variable, as for some reason this won't work?
         pages();
     }
}

/////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////

//Search Function
$(function() {
    var $textInput = $('input:text').change( function () {}).keyup( function () { //below is run when a change is detected in the search bar.
    console.log("Search function has fired");

   $(".pagination").detach(); //this removes any previous pagination div and li elements. Re-inserted as required below.
   $(".message").detach(); //this remove the 'no matches' message if present. Re-inserted as required below.
   $(this).change(); //'this' is referring to the whole input element and its classes.
   console.log(this);

   var $newText = $textInput.val().toLowerCase(); //stores search bar text. Any capitals converted to lower case.
   console.log($newText);
   $( "ul.student-list" ).children( "li" ).hide(); // hide all students.
   $studentsToShow = $( "li" ).filter( ":contains('" + $newText + "')" ); //$studentsToShow contains only those that match the search text.
   pages();
});});


//All elements have been hidden as they arrive to this point.
function pages() {
    console.log("Pages function has fired");
    var $arrayLength = $studentsToShow.length; //calc no. of students in the filtered results.
    studentsPerPage = 10; //number of students per page. Global Var as used in more than one function.
    var numberOfPages = Math.ceil($arrayLength/studentsPerPage); //calc no. of pages required. Needs to be .ceil as if were to use .floor you'd lose any LI's after the last ten from having rounded down.
    console.log($arrayLength); //checking things are OK
    console.log(numberOfPages); //checking things are OK

    if ($arrayLength == '0') { //if array length is zero display message.
        console.log("pages IF has fired...");
        $("ul.student-list" ).after('<p class="message">No matches have been found. Please try another search. </p>');


    } else { //where $studentsToShow contains students, create required number of pages
        console.log("pages ELSE has fired...");

        //listItemsPag = '<li>'+'<a href="#" class="active">'+1+'</a>'+'</li>'; //ADDING CLASS TO FIRST LI HERE. This seems a bit cheeky...
        var listItemsPag =''; //if set up like this 'var listItemsPag;' undefined is returned. A curiosity to figure out later.
        for (var i =1; i<=numberOfPages; i+=1) { //starts at 2 as already made page 1 above
            listItemsPag += '<li>'+'<a href="#">'+i+'</a>'+'</li>';}
            //console.log(listItemsPag);

        var paginationDiv = '<div class="pagination"><ul>' + listItemsPag + '</ul></div>';
        $( "ul").after(paginationDiv); //inserts pagination html after the student list ul.
        //$($studentsToShow).show().css( "background-color", "green" ); //This moved down to paginate function.
        paginate();
    }
}

function paginate() {
    $( "div.pagination" ).find( "a" ).first().addClass("active");
    var index = $(".active").parent().index(); //The links are not siblings to each other but the parent li's are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.
    console.log("Index is:" + " " +index);
    var upper = (index+1)*studentsPerPage; //this needs to be calculated before the lower value.
    var lower = upper - studentsPerPage + 1;
    console.log("Lower nth value:" + " " +lower);
    console.log("Upper nth value:" + " " +upper);
    $( "ul.student-list" ).children( "li" ).fadeOut("fast");
    $($studentsToShow).slice(lower - 1, upper).fadeIn("fast");
    pagination2();
}


function pagination2 () {
$( "div.pagination" ).find( "a" ).on('click', function(){
    console.log("Page turner function has fired"); //to know that the function is firing on click.
    $("a").removeClass("active"); //removes any "active" value from the list items
    $( "ul.student-list" ).children( "li" ).fadeOut("fast"); //hide all the students
    $(this).addClass("active"); //make the clicked page "active"

    var index = $(".active").parent().index(); //The links are not siblings to each other but the parent li's are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.

    var upper = (index+1)*studentsPerPage;
    var lower = upper - studentsPerPage + 1;

    $($studentsToShow).slice(lower - 1, upper).fadeIn("fast");
});
}

function buttonPress () {
$( "div.student-search page-header" ).find( "button" ).on('click', function(){
    console.log("Button has been pressed");

});
}
