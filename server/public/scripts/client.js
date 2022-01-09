$(document).ready(function() {
	console.log('ready now');
	// click listener for addTask POST
	$('#addButton').on('click', addTask);
	// click listener for inline DELETE
    $(document).on('click', '.deleteButton', deleteTask)
	//click listener to toggle complete
	$(document).on('click', '.incomplete', toggleComplete)
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
		let deadline = moment(task.deadline).calendar();
		$('#viewTasks').append(`
        <tr data-id = "${task.id}" 
			data-title = "${task.title}"
			data-complete = "${task.complete}">
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${deadline}</td>
        <td class="incomplete btn btn-primary w-100">
		${task.complete === '1' ? 'Yes' : 'No'}</td>
        <td>
            <button class = "deleteButton btn btn-danger">DELETE</button>
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
	if (!newTask.title ||
		!newTask.deadline) {
			return Swal.fire('Your task has to have a title and deadline to continue');
		} else {
	$.ajax({
		type: 'POST',
		url: '/tasks',
		data: newTask
	})
		.then(function(response) {
			console.log('Response from server:', response);
			clearForm();
			getTasks();
		})
		.catch(function(error) {
			console.log('Error in POST', error);
			alert('Unable to add task at this time. Please try again later.');
		});
	}
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

function toggleComplete () {
	let id = $(this).parents('tr').data('id');
	let title = $(this).parents('tr').data('title')
	let isComplete = $(this).parents('tr').data('complete')
	completeAlert(title, isComplete);
	$.ajax({
		method: 'PUT',
		// id in req.params
		url: `/tasks/${id}`,
		data: {
			complete: isComplete
		}
	})
	.then(() => {
		console.log('PUT success!');
		// reload our state from the server
		getTasks();
	})
	.catch((err) => {
		console.log('PUT failed', err);
	
	})
}

// alerts user of changing completion
function completeAlert (title, isComplete) {
	if (isComplete === 0) {
	Swal.fire(`Great job completing: ${title}`)
	} if (isComplete === 1) {
		Swal.fire('Life can only be understood backwards; but it must be lived forwards');	
	}
}

function clearForm () {
	$('#title').val('');
	$('#details').val('');
	$('#deadline').val('');
	$('#title').focus();
}