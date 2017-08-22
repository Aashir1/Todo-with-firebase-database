var rootRef = firebase.database().ref('/todo');
var submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function () { pushData(); });

function pushData() {
    var userInput = document.getElementById('input-field');
    if (userInput.value !== "" && userInput !== null) {
        var obj = {
            task: userInput.value
        }
        rootRef.push(obj);
        userInput.value = "";
    }
    else {
        alert('invalid input');
    }
}


rootRef.on('child_added', function (snapshot) {
    render(snapshot);
});


function render(newChild) {
    var list = document.getElementById('list')
    var obj = {
        data: newChild.val().task,
        id: newChild.key
    }

    console.log(obj.id);
    var li = document.createElement('LI');
    var deleBtn = document.createElement('BUTTON');
    var deleText = document.createTextNode('delete');
    var updateBtn = document.createElement('BUTTON');
    var tasks = document.createTextNode(obj.data);
    var updateBtnText = document.createTextNode('Update');
    var span = document.createElement('SPAN');
    var setUpdateData = document.getElementById('set-updated-data');
    deleBtn.appendChild(deleText);
    deleBtn.setAttribute('class', 'btn btn-danger');
    updateBtn.setAttribute('class', 'btn btn-danger');
    // updateBtn.setAttribute('data-toggle', 'modal');
    // updateBtn.setAttribute('data-target', '#bootstrap-modal');
    updateBtn.appendChild(updateBtnText);
    span.appendChild(updateBtn);
    span.appendChild(deleBtn);
    span.setAttribute('class', 'float-right');
    li.appendChild(tasks);
    li.appendChild(span);
    li.setAttribute('id', obj.id);
    li.setAttribute('class', 'list-group-item list-group-item-light');
    list.appendChild(li);

    deleBtn.addEventListener('click', function () {
        console.log(obj.id);
        deleteItem(obj.id);
    });

    updateBtn.addEventListener('click', function () {
        // setUpdateData.addEventListener('click', function () {
            updateData(obj.id, obj.data);
            console.log(obj.id)
        });


}

function deleteItem(di) {
    console.log(di);
    rootRef.child(di).remove();
}

rootRef.on('child_removed', function (snapshot) {
    document.getElementById(snapshot.key).remove();
});


function updateData(key, data) {
    
    // var userInput = document.getElementById('update-input').value;
    var userInput = prompt('Enter updated data', data)
    console.log(key)
    if (userInput !== "") {
        var newData = {
            task: userInput
        }
        rootRef.child(key).update(newData);
    }
}


rootRef.on('child_changed', function (snapshot) {
    var li = document.getElementById(snapshot.key);
    li.childNodes[0].nodeValue = snapshot.val().task;
})





