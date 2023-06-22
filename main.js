let jsonData = `
{
    "consoles": [
      {
        "ref": "NINTENDO SWITCH OLED",
        "prix": 4500,
        "manettes": 2,
        "image": "Images/img1.jpg"
      },
      {
        "ref": "PLAYSTATION CONSOLE PSS",
        "prix": 8500,
        "manettes": 1,
        "image": "images/Img2.jpg"
      },
      {
        "ref": "XBOX SERIES 512G",
        "prix": 4600,
        "manettes": 2,
        "image": "Images/img3.jpg"
      },
      {
        "ref": "PLAYSTATION PS4 1TO PRO",
        "prix": 5300,
        "manettes": 1,
        "image": "Images/img4.jpg"
      }
    ]
  }   
`


let selectedItem = document.getElementById("console")
let addToPannier = document.getElementById("add")

addToPannier.addEventListener("click", (e) => {

  e.preventDefault()
  validerConsole()
  addConsoleToCart()
})

function validerConsole() {
  let quantite = Number(document.getElementById("quantite").value)

  if (selectedItem.value === "" || selectedItem.value === null) {

    alert("veuiller selectionner une console")
    throw new Error("veuiller selectionner une console");
  }
  else if (Number.isInteger(quantite) == false || quantite < 1 || quantite > 20) {
    alert("veuiller selectionner une quatité logique")
    throw new Error("veuiller selectionner une quatité logique");

  }

}
const objData = JSON.parse(jsonData)

function remplirconsole() {
  for (item of objData.consoles) {
    let elt = document.createElement("option")
    elt.textContent = item.ref
    elt.value = item.ref
    selectedItem.appendChild(elt)

  }
}
remplirconsole()

function addConsoleToCart() {
  let quantite = Number(document.getElementById("quantite").value)
  let tdarray = []

  for (item of objData.consoles) {
    if (selectedItem.value == item.ref) {
      tr = document.createElement("tr")

      for (let i = 0; i < 4; i++) {
        td = document.createElement("td")
        tdarray.push(td)
      }
      tdarray[0].textContent = item.ref
      tdarray[1].textContent = quantite
      tdarray[2].innerHTML = `<img src="${item.image}">`
      let supBtn = document.createElement("button")
      supBtn.textContent = "supprimer"
      supBtn.setAttribute("class", "sup")
      supBtn.addEventListener("click", deleteConsoleFromCart);
      tdarray[3].appendChild(supBtn)
      for (let td of tdarray) {
        tr.appendChild(td)
      }
      table.appendChild(tr)
    }



  }

}


let table = document.getElementById("tableConsole");
let deleteConsoleFromCart = (e) => {
  e.preventDefault();
  let trparent = e.target.parentNode.parentNode;
  table.removeChild(trparent);
}


function calculerPrixHT(e) {

  e.preventDefault();
  let trs = document.querySelectorAll("tr");
  let ht = document.getElementById("ht")
  let totalPrix = 0;
  var prixHT = 0
  for (let tr of trs) {
    let tdValue = tr.children[0].textContent.trim();

    for (item of objData.consoles) {
      if (tdValue == item.ref) {
        totalPrix += item.prix * parseInt(tr.children[1].textContent);
        prixHT = totalPrix - totalPrix * 0.1
      }
    }
  }
  ht.innerHTML = prixHT + " " + "dhs"
  return prixHT
}
let prixht = document.getElementById("prixht")
prixht.addEventListener("click", calculerPrixHT)
document.getElementById("prixttc").addEventListener("click", calculerPrixTTC)
function calculerPrixTTC(e) {
  e.preventDefault()
  let prixReduit = calculerPrixHT(e)
  let prixttc = prixReduit + prixReduit * 0.2
  document.getElementById("ttc").innerHTML = prixttc + " " + "DHs"
}
function jsonSerializer(e) {
  e.preventDefault();
  let trs = document.querySelectorAll("tr:nth-child(n+2)");
  let consoletable = {
    consoles: []
  }
  for (let tr of trs) {
    let ref = tr.children[0].textContent.trim();
    let qtee = tr.children[1].textContent.trim();
    let obj = {
      code: ref,
      qte: qtee
    }
    consoletable.consoles.push(obj)
  }
  consoletojson = JSON.stringify(consoletable, null, 2)
  console.log(consoletojson)
}
document.getElementById("commander").addEventListener("click", jsonSerializer)
