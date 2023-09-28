//Title constructor function that creates a Title object
var deleteAndEdit = true;

function displayNameAndNUID() {
  document.getElementById('name').innerText = "Name: Qiang Jiang";
  document.getElementById('nuid').innerText = "NUID: 002222665";
}

function toggleRowVisibility(imgElement) {
  // get data-index of img
  const index = imgElement.getAttribute('data-index');
  // use data-index to find dropDownTextArea
  const row = document.querySelectorAll('.dropDownTextArea')[index - 1];

  // change the display of row
  if (row.style.display === 'none' || row.style.display === '') {
    row.style.display = 'table-row'; // display
  } else {
    row.style.display = 'none'; // hide
  }
}

function addRecord() {
  try {
    var table = document.getElementById("myTable");
    var tbody = document.getElementsByTagName("tbody")[0];
    var studentName = table.lastElementChild.lastElementChild?.previousElementSibling?.firstElementChild?.nextElementSibling?.innerHTML || "Student 0";

    var lastIndex = studentName.split(" ")[1];
    var trNode = document.createElement("tr");
    var tdCheckBoxNode = document.createElement("td");
    tdCheckBoxNode.innerHTML = '<input type="checkbox" onclick="onClickCheckBox(this)" />';
    tdCheckBoxNode.innerHTML += '<br /><br />';
    tdCheckBoxNode.innerHTML += '<img src="down.png" width="25px" data-index="' + (parseInt(lastIndex) + 1) + '" onclick="toggleRowVisibility(this)" />'

    var tdStudent = document.createElement("td");
    tdStudent.innerHTML = 'Student ' + (parseInt(lastIndex) + 1)
    var tdAdvisor = document.createElement("td");
    tdAdvisor.innerHTML = 'Teacher ' + (parseInt(lastIndex) + 1)
    var tdAwardStatus = document.createElement("td");
    tdAwardStatus.innerHTML = 'Approved';
    var tdSemester = document.createElement("td");
    tdSemester.innerHTML = 'Fall';
    var tdType = document.createElement("td");
    tdType.innerHTML = 'TA';
    var tdBudgetnum = document.createElement("td");
    tdBudgetnum.innerHTML = '12345';
    var tdPercentage = document.createElement("td");
    tdPercentage.innerHTML = '100%';


    var trDropDownTextArea = document.createElement("tr");
    trDropDownTextArea.className = "dropDownTextArea";
    var tdDetail = document.createElement("td");
    tdDetail.colSpan = 8;
    tdDetail.innerHTML = 'Advisor:<br/><br/> Award Details<br/> Summer 1-2014(TA)<br/>Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />'


    trNode.appendChild(tdCheckBoxNode);
    trNode.appendChild(tdStudent);
    trNode.appendChild(tdAdvisor);
    trNode.appendChild(tdAwardStatus);
    trNode.appendChild(tdSemester);
    trNode.appendChild(tdType);
    trNode.appendChild(tdBudgetnum);
    trNode.appendChild(tdPercentage);

    trDropDownTextArea.appendChild(tdDetail);

    tbody.appendChild(trNode);
    tbody.appendChild(trDropDownTextArea);
    let isRecordAdded = true;
    if (isRecordAdded) {
      alert('Student ' + (parseInt(lastIndex) + 1) + ' Record added successfully');
    }
  } catch (error) {
    alert('Error in adding record');
  }

}


function onClickCheckBox(checkBox) {
  var selectedRow = checkBox.parentElement.parentElement;
  var button = document.getElementById('button');
  var deleteCol = document.getElementById('deleteCol');
  var editCol = document.getElementById('editCol');
  if (checkBox.checked == true) {
    selectedRow.style.backgroundColor = "yellow";

    deleteCol.style.display = 'table-cell';
    editCol.style.display = 'table-cell';

    var deleteButton = document.createElement("td");
    deleteButton.innerHTML = '<button id="deleted" type="button" onclick="onDeleteRow(this)">Delete</button>';
    selectedRow.appendChild(deleteButton);

    var editButton = document.createElement("td");
    editButton.innerHTML = '<button type="button" onclick="onEdit(this)">Edit</button>';
    selectedRow.appendChild(editButton);

    button.disabled = false; // disabled the button

  } else {
    selectedRow.style.backgroundColor = "#fff";
    selectedRow.deleteCell(8);
    selectedRow.deleteCell(8);

    // find is there any check box slected
    var table = document.getElementById("myTable");
    var checkboxes = table.getElementsByTagName('input');
    var isChecked = false;
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type === 'checkbox' && checkboxes[i].checked) {
        isChecked = true;
        break;
      }
    }

    // if no check box slected，hide deleteCol
    if (!isChecked) {
      deleteCol.style.display = 'none';
      editCol.style.display = 'none';

      button.disabled = true; // able the button
    }
  }



}

function onEdit(editButton) {
  var selectedRow = editButton.parentElement.parentElement;
  var studentName = selectedRow.cells[1].innerText;

  var details = window.prompt(`Edit details of ${studentName}\nPlease enter new details:`);

  if (details !== null) { // if user click "ok"
    alert(`Student ${studentName} data updated with: ${details}`);
  }
}

function onDeleteRow(deletedRef) {
  var selectedRow = deletedRef.parentElement.parentElement;
  var selectedRow2 = selectedRow.nextElementSibling;
  var studentName = selectedRow.firstElementChild?.nextElementSibling?.innerHTML;
  var details = window.confirm(`Do you want to delet ${studentName} detail?`);

  if (details !== null) { // if user click "ok"
    var index = selectedRow.rowIndex;
    var index2 = selectedRow2.rowIndex;
    var table = document.getElementById("myTable");
    table.deleteRow(index2);
    table.deleteRow(index);

    // find is there any check box slected
    var checkboxes = table.getElementsByTagName('input');
    var isChecked = false;
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type === 'checkbox' && checkboxes[i].checked) {
        isChecked = true;
        break;
      }
    }

    // if no check box slected，hide deleteCol
    var deleteCol = document.getElementById('deleteCol');
    var editCol = document.getElementById('editCol');
    if (!isChecked) {
      deleteCol.style.display = 'none';
      editCol.style.display = 'none';
    }
    var studentNum = studentName.split(" ")[1];


    alert("Student " + studentNum + " Record deleted successfully");
  }

}