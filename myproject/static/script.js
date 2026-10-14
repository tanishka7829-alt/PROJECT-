const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
function loadStudents() {
    fetch("/api/students/")
        .then(response => response.json())
        .then(students => {
            studentList.innerHTML = "";
            students.forEach(student => {
                studentList.innerHTML += `
<tr>
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.course}</td>
    <td>${student.city}</td>
    <td> <button class="delete" onclick="deleteStudent(${student.id})">DELETE</button></td>
</tr>
`;  });  });  }

form.addEventListener( "submit",
    function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const course = document.getElementById("course").value;
        const city = document.getElementById("city").value;
        fetch( "/api/students/add/",
            { method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, email: email, course: course, city: city })
            })
        .then(response => response.json())
        .then(data => { alert(data.message);
            form.reset();
            loadStudents();
        }); });


function deleteStudent(id) {
    fetch( "/api/students/delete/" + id + "/",
        { method: "DELETE" } )
    .then(response => response.json())
    .then(data => { alert(data.message);
        loadStudents();
}); }

loadStudents();