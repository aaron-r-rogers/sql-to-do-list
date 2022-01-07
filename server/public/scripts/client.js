
$(document).ready(function(){
    console.log( 'ready now' );
    // Establish click listeners
    
    // load existing tasks on page load
    getTasks();
}); // end doc ready

// TODO

// getTasks function should GET data
// then it should call a render function

// render function should append data to DOM
// don't forget to empty

// click listener on add button should call add function
// add function should grab from DOM and POST new data

// click listener on delete button should call delete function
// delete function should DELETE corresponding task