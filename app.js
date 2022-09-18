document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => app(data["data"]));
});

document.querySelector().addEventListener('click',function(event){
    if(event.target.className==="delete-row-btn"){
        deleteRowById(event.target.dataset.id);
    }
    if(event.target.className==="edit-row-btn"){
        editRowById(event.target.dataset.id)
    }
});

function editRowById(id){
    // the new form to update data opens up
    const updateSection=document.querySelector('#update-row');
    updateSection.hidden=false;
    document.querySelector('#update-row-btn').dataset.id=id;
}

updateBtn.onclick= function(){
    const name=document.querySelector('#update-name-input')
    fetch('http://localhost:5000/update',{
        method:'PATCH',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id:document.querySelector('#')
        }),
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            location.reload();
        }
    });
}

function deleteRowById(id){
    fetch('http://localhost:5000/delete/'+id,{
        method:'DELETE'
    })
    .then(response=>response.json())
    .then(data=>{    //reloads table on each delete
        if(data.success){
            location.reload();
        }
    });
}

// const addBtn=
addBtn.onclick=function(){
    fetch('http://localhost:5000/insert',{
        headers:{
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify()
    })
    .then(response=>response.json())
    .then(data=>insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data){
    
}

function app(data) {
  if (data.length === 0) {
    <h1>Helloooooooooo</h1>;
  }
}
