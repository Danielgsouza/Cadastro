'use strict'
/*
const openModal = () => {
    document.querySelector('.fade').classList.add('show')
}
*/
const closeModal = () => {
    //let modal = document.querySelector('#exampleModal')
    //modal.setAttribute('style', 'display: block')
    //modal.setAttribute('style', 'visibility: hidden')
    //modal.setAttribute('style', 'display: none')
   // modal.dispose()
   //$ (". Modal-backdrop"). Remove ();
   
   // modal.setAttribute('data-bs-dismiss=', 'modal')

   //document.getElementsByTagName('body').classList.remove('.modal-open')


}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dataClient')) ?? []

const setLocalStorage = (client) => localStorage.setItem('dataClient', JSON.stringify(client))

//CRUD
const deleteClient = (index) => {
    const dClient = readClient()
    dClient.splice(index, 1)
    setLocalStorage(dClient)
}
const updateClient = (index, client) => {
    const dClient = readClient()
    dClient[index] = client
    setLocalStorage(dClient)
}
const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dClient = getLocalStorage()
    dClient.push(client)
    setLocalStorage(dClient)
}

const isValidFields = () => {
    const nome = document.getElementById('nome').value
    const sobrenome =  document.getElementById('sobrenome').value
    const email = document.getElementById('email').value
    const celular = document.getElementById('celular').value

    if (nome != '' && sobrenome != '' && email != '' && celular != '') {
        return true
    }else{
        //alert("Existem campos vazios")
    }

}

 //Interation Screen
 const clearFields = () => {
     const fields = document.querySelectorAll('.form-control')
     fields.forEach(field => field.value = '')
     document.getElementById('email').dataset.index = 'new'
 }

 const saveClient = () => {

    
    if (isValidFields()) {
        
        const client = {
                
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value, 
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value
        } 
            const index = document.getElementById('email').dataset.index
        
            if (index == 'new') {
              createClient(client)
              updateTable()
              clearFields()
              closeModal()
                
            }else{
              updateClient(index, client)
              updateTable()
              clearFields()
              closeModal()
              
             
            }
    }     
       
 }

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
                        <td>${client.nome}</td>
                        <td>${client.sobrenome}</td>
                        <td>${client.email}</td>
                        <td>${client.celular}</td>
                        <td><buton type="button" class="btn btn-primary" id="edit-${index}" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatevernome=${client.nome} data-bs-whateversobrenome=${client.sobrenome} data-bs-whateveremail=${client.email} data-bs-whatevercelular=${client.celular}><i class="fas fa-edit"/></button></td>
                        <td><button type="button" class="btn btn-danger" id="delete-${index}"><i class="fas fa-trash"/></button></td>`

    document.querySelector('#myTable>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#myTable>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dClient = readClient()
    clearTable()
    dClient.forEach(createRow)
}

 const fillFields = (client) => {
    
     document.getElementById('nome').value = client.nome
     document.getElementById('sobrenome').value = client.sobrenome
     document.getElementById('email').value = client.email
     document.getElementById('celular').value = client.celular
        
 }

const editClient = (index) => {

        const client = readClient()[index];
        client.index = index
        

        //fillFields(client)
        /*
        var exampleModal = document.getElementById('exampleModal2')
        var InputNome = exampleModal.querySelector('#nome').value
        var InputSobrenome = exampleModal.querySelector('#sobrenome').value
        var InputEmail = exampleModal.querySelector('#email').value
        var InputCelular = exampleModal.querySelector('#celular').value 
        
        const client = {
        nome: InputNome, 
        sobrenome: InputSobrenome,
        email: InputEmail, 
        celular: InputCelular
        }
        const index = document.getElementById('email').dataset.index
        if (index == 'used') {
            updateClient(index, client)
            updateTable()
            clearFields()
            //closeModal()
            
         
        }else{
            
            
           
        }
*/
} 

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')
        
        if (action == 'delete') {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        } 
        /*
        if (action == 'edit') {
            editClient(index)

        }else{
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            } 
        }*/
    }  
}

updateTable()

 document.getElementById('btnSave').addEventListener('click', saveClient)
 
 document.getElementById('editSave').addEventListener('click', editClient)

 document.querySelector('#myTable>tbody').addEventListener('click', editDelete)