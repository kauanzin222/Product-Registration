
//Masks 
$('#priceInput').mask("000.000.000.000.000,00", { reverse: true });

var products = [
    {
        id: 1,
        name: "Computador M1-TX",
        description: "Intel I7, 16GB, SSD 256, HD 1T",
        price: 4900,
        category: 1,
        promotion: true,
        new: true
    },
    {
        id: 2,
        name: "Computador M2-TX",
        description: "Intel I7, 32GB, SSD 512, HD 1T",
        price: 5900,
        category: 2,
        promotion: false,
        new: true
    },
    {
        id: 3,
        name: "Computador M1-T",
        description: "Intel I5 ,16GB, SSD 512 HD 1T",
        price: 2900,
        category: 3,
        promotion: false,
        new: false
    }
];

var categories = [
    { id: 1, name: "Produção Própria" },
    { id: 2, name: "Nacional" },
    { id: 3, name: "Importado" }
];

//OnLoad 
loadProducts();

//Load all products
function loadProducts() {
    for (let prod of products) {
        addNewRow(prod);
    }
}

//Save a product
function save() {

    var prod = {
        id: products.length + 1,
        name: document.getElementById("nameInput").value,
        description: document.getElementById("descInput").value,
        price: document.getElementById("priceInput").value,
        category: document.getElementById("selectCategory").value,
        promotion: document.getElementById("checkboxPromotion").checked,
        new: document.getElementById("checkboxNewProduct").checked
    };

    addNewRow(prod);

    //Armazena o novo produto no array
    products.push(prod);

    //Limpa os dados do forms
    document.getElementById("formProduct").reset();
}

//Add new row
function addNewRow(prod) {
    var table = document.getElementById("productsTable");

    var newRow = table.insertRow();

    //Insert product id 
    var idNode = document.createTextNode(prod.id);
    newRow.insertCell().appendChild(idNode);

    //Insert product name 
    var nameNode = document.createTextNode(prod.name);
    newRow.insertCell().appendChild(nameNode);

    //Insert  product description
    var descNode = document.createTextNode(prod.description);

    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";

    cell.appendChild(descNode);

    //Insert product price
    var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    var priceNode = document.createTextNode(formatter.format(prod.price));
    newRow.insertCell().appendChild(priceNode);

    //Insert  product category
    for (let category of categories)
        if (category.id == prod.category) {
            var categoryNode = document.createTextNode(category.name);
            break;
        }

    newRow.insertCell().appendChild(categoryNode);

    //Insert product options 
    var options = "";

    if (prod.promotion)
        options = "<span class='badge bg-success me-1'>P</span>";
    if (prod.new)
        options += "<span class='badge bg-primary me-1'>L</span>";

    cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.innerHTML = options;
}