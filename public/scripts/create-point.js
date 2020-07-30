function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option> `
            console.log(state.nome)
        }
    })
}



populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text /*id estado select*/ 

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios/`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then( cities => {

        
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 

// document
//     .querySelector("select[name=uf]")
//     .addEventListener("change", () => {
//         console.log("Mudei") 
//     })

    // .then(function(res){return res.json()})
    // .then(function(data){console.log(data)})



//Itens de coleta
//todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = [] /*itens selecionados na tela */

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou remover classe
    itemLi.classList.toggle("select") /*add ou rem class visual*/ 

    const itemId = event.target.dataset.id

    
    //verificar se existem itens selecionados, se sim
    //pegar os itens
    const alreadySelected = selectedItems.findIndex( function(item) {
        return item == itemId
    })

    //se ja estiver selecionado tirar seleção
    if ( alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter( item => {
            return item != itemId //false
        })
        selectedItems = filteredItems
    } else {
     //se nao estiverselecionado adicionar seleção
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
    console.log(selectedItems)
    //atualizar campo escondido com os itens selecionados
}

