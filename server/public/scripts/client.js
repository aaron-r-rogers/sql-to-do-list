$(document).ready(function() {
	console.log('ready now');
	// click listener for addTask POST
	$('#addButton').on('click', addTask);
	// click listener for inline DELETE
	$(document).on('click', '.deleteButton', deleteTask);
	//click listener to toggle complete
	$(document).on('click', '.incomplete', toggleComplete);
	// load existing tasks on page load
	getTasks();
}); // end doc ready

// getTasks function GETs data from db
// then calls renderTasks function
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

// empties then appends data to DOM
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
        <td class="incomplete">
			<button class = "btn btn-success w-100">
			${task.complete === '1' ? moment(task.completed_at).calendar() : 'No'}
			</button>
		</td>
        <td>
            <button class = "deleteButton btn btn-danger">
				DELETE
			</button>
        </td>
        </tr>
        `);
	}
} // end renderTasks function

// click listener on add button calls addTask function
// grabs values from DOM and POSTs new data
function addTask() {
	let newTask = {
		title: $('#title').val(),
		description: $('#details').val(),
		deadline: $('#deadline').val()
	};
	if (!newTask.title || !newTask.deadline) {
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
} // end addTask function

// click listener on delete button calls deleteTask
// deletes corresponding task and confirms w/ user
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
			})
				.then((res) => {
					console.log('DELETE:', res);
					getTasks();
				})
				.catch((err) => {
					console.log('FAILED:', err);
				});
			Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
		}
	});
} // end deleteTask function

// flips SQL bit on click
function toggleComplete() {
	let id, title, isComplete;
	id = $(this).parents('tr').data('id');
	title = $(this).parents('tr').data('title');
	isComplete = $(this).parents('tr').data('complete');
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
		});
} // end toggleComplete function

// alerts user of changing completion
function completeAlert(title, isComplete) {
	if (isComplete === 0) {
		Swal.fire(`Great job completing: ${title}`);
	}
	if (isComplete === 1) {
		Swal.fire('Life can only be understood backwards; but it must be lived forwards');
	}
} // end completeAlert function

// clears inputs in form and returns cursor to title
function clearForm() {
	$('#title').val('');
	$('#details').val('');
	$('#deadline').val('');
	$('#title').focus();
} // end clearForm function

function searchOnKeyUp() {
	var filter, tr, td, txtValue;
	filter = $('#searchFilter').val().toUpperCase();
	tr = $('tr');

	// loop through all rows, hide non-matches
	for (let i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
} // end searchOnKeyUp function
