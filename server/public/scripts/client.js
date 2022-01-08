$(document).ready(function() {
	console.log('ready now');
	// Establish click listeners
	$('#addButton').on('click', addTask);
    $(document).on('click', '.deleteButton', deleteTask)
	// load existing tasks on page load
	getTasks();
}); // end doc ready

// TODO

// getTasks function should GET data
// then it should call a render function
function getTasks() {
	// ajax call to server to get tasks
	$.ajax({
		type: 'GET',
		url: '/tasks'
	})
		.then(function(response) {
			console.log('getting tasks:', response);
			renderTasks(response);
		})
		.catch(function(error) {
			console.log('error in /tasks GET', error);
		});
} // end getTasks

// render function should append data to DOM
// don't forget to empty
function renderTasks(tasks) {
	console.log('tasks are:', tasks);
	$('#viewTasks').empty();
	for (let task of tasks) {
		$('#viewTasks').append(`
        <tr data-id = "${task.id}">
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.deadline}</td>
        <td>${task.complete === '1' ? 'Yes' : 'No'}</td>
        <td>
            <button class = "deleteButton">DELETE</button>
        </td>
        </tr>
        `);
	}
}

// click listener on add button should call add function
// add function should grab from DOM and POST new data
function addTask() {
	let newTask = {
		title: $('#title').val(),
		description: $('#details').val(),
		deadline: $('#deadline').val()
	};
	$.ajax({
		type: 'POST',
		url: '/tasks',
		data: newTask
	})
		.then(function(response) {
			console.log('Response from server:', response);
			getTasks();
		})
		.catch(function(error) {
			console.log('Error in POST', error);
			alert('Unable to add task at this time. Please try again later.');
		});
}

// click listener on delete button should call delete function
// delete function should DELETE corresponding task
function deleteTask() {
    console.log('in deleteTask');
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				type: 'DELETE',
				url: `/tasks/${$(this).parents('tr').data('id')}`
			}).then((res) => {
					console.log('DELETE:', res);
					getTasks();
			}).catch((err) => {
					console.log('FAILED:', err);
				});
			Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
		}
	});
}
