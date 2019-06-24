
var arrayofitems = [];
arrayofitems[0] = [];
arrayofitems[1] = [];
arrayofitems[2] = [];
var arrayofprices = [];
arrayofprices[0] = [];
arrayofprices[1] = [];
arrayofprices[2] = [];
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var price = parseInt(document.getElementById(ev.target.id).children[1].innerText);
    document.getElementById(ev.target.id).children[1].innerText = price + (parseInt(document.getElementById(data).children[1].innerText));
    document.getElementById(ev.target.id).children[2].innerText = parseInt(document.getElementById(ev.target.id).children[2].innerText) + 1;
    var id = parseInt((ev.target.id).substring(1));
    arrayofitems[id - 1][(arrayofitems[id - 1].length)++] = document.getElementById(data).getAttribute('value');
    arrayofprices[id - 1][(arrayofprices[id - 1].length)++] = document.getElementById(data).children[1].innerText;
}

function suggestion() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('table');
    filter = input.value.toUpperCase();
    ul = document.getElementById("tableslist");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        txtValue = a.textContent || a.value;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function menusuggestion() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('menu');
    filter = input.value.toUpperCase();
    ul = document.getElementById("menulist");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        txtValue = a.textContent || a.value;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
var i = 0;
var clickedid;
var quantity;
var deletebutton;
function countelements(array, element) {

    var countelement = 0;
    for (var a = 0; a < array.length; a++) {
        if (array[a] === element)
            countelement++;
    }
    return countelement;
}

function ElementExists(tableid){
    var dec = document.getElementById("popup").childElementCount;
    var elementexists = true;
     for (var d = 0; d < dec; d++) {
                if ((document.getElementById('popup').children[d].innerText) != (arrayofitems[tableid - 1][i] + "   " + arrayofprices[tableid - 1][i])) {
                    elementexists = false;
                }
                else { elementexists = true; break; }
     }
     return elementexists;
}
function tabledesc(clicked_id) {
    clicked_id=clicked_id.substring(1);
    clicked_id=parseInt(clicked_id);
    var total = document.createElement('p');
    total.setAttribute("id", "totalid");
    var totalPrice = parseInt(0);
    clickedid = parseInt(clicked_id);

    var quantityid = 10;

    for (i = 0; i < arrayofitems[clicked_id - 1].length; i++) {
        var itemandprice = document.createElement('p');
        itemandprice.setAttribute("id", "para");
        itemandprice.innerHTML = arrayofitems[clicked_id - 1][i] + "   " + arrayofprices[clicked_id - 1][i];
        totalPrice += parseInt(arrayofprices[clicked_id - 1][i]);
        var elementexists = ElementExists(clickedid);
        if (document.getElementById('popup').children[0] === undefined)
            document.getElementById('popup').appendChild(itemandprice);
        else {
            if (elementexists == false)
                document.getElementById('popup').appendChild(itemandprice);
        }

        quantity = document.createElement('input');
        quantity.setAttribute("type", "number");
        quantity.setAttribute("id", quantityid);
        var countelement = countelements(arrayofitems[clicked_id - 1], arrayofitems[clicked_id - 1][i]);
        quantity.setAttribute("value", countelement);
        quantity.setAttribute("dish", arrayofitems[clicked_id - 1][i]);
        quantity.setAttribute("price", arrayofprices[clicked_id - 1][i]);
        quantity.setAttribute("onchange", "QuantityChange(this.id,clickedid,totalid)");
        deletebutton = document.createElement('button');
        deletebutton.innerHTML = "Delete";
        deletebutton.setAttribute("id", arrayofitems[clicked_id - 1][i]);
        deletebutton.setAttribute("onclick", "funcDelete(arrayofitems[clickedid-1],this.id,clickedid)");
        if (document.getElementById('popup').children[1] === undefined) {
            document.getElementById('popup').appendChild(quantity);
            document.getElementById('popup').appendChild(deletebutton);
        }
        else {
            if (elementexists == false) {
                document.getElementById('popup').appendChild(quantity);
                document.getElementById('popup').appendChild(deletebutton);
            }
        }
        quantityid++;
    }

    total.innerHTML = "Total price: " + totalPrice;
    document.getElementById('popup').appendChild(total);

    var btn = document.createElement('button');
    btn.innerHTML = "X";
    btn.setAttribute("onclick", "func()");
    document.getElementById('popup').appendChild(btn);

    var closesession = document.createElement('button');
    closesession.innerHTML = "Close session(GenerateBill)";
    closesession.setAttribute("onclick", "funcCloseSess(clickedid)");
    document.getElementById('popup').appendChild(closesession);
    popup.style.display = 'block';

}
var item = "";
var itemvalue = parseInt(1);
var priceofitem = 0;
var saveindex=0;
function QuantityChange(quantityid, tableno, totalid) {

    var count = 0;
    tableno = parseInt(tableno) - 1;
    tableno=parseInt(tableno);
    item = document.getElementById(quantityid).getAttribute("dish");
    itemvalue = parseInt(document.getElementById(quantityid).value);
    priceofitem = parseInt(document.getElementById(quantityid).getAttribute("price"));


    for (var j = 0; j < arrayofitems[tableno].length; j++) {
        if (arrayofitems[tableno][j] === item) {
            count++;
            saveindex=j;
        }
    }
    if (itemvalue > count) {
        tableno = tableno + 1;
        arrayofitems[tableno - 1][(arrayofitems[tableno - 1].length)] = item;
        arrayofprices[tableno - 1][(arrayofprices[tableno - 1].length)] = priceofitem;
        document.getElementById("t"+tableno).children[2].innerText = parseInt(document.getElementById("t"+tableno).children[2].innerText) + 1;
        var updatedPrice = parseInt(document.getElementById("t"+tableno).children[1].innerText);

        updatedPrice += parseInt(priceofitem);
        document.getElementById("t"+tableno).children[1].innerText = updatedPrice;

        document.getElementById("totalid").innerHTML = "Total price: " + updatedPrice;
    }

    else if (itemvalue < count) {
        tableno = tableno + 1;
        document.getElementById("t"+tableno).children[2].innerText = parseInt(document.getElementById("t"+tableno).children[2].innerText) - 1;
        var updatedPrice = parseInt(document.getElementById("t"+tableno).children[1].innerText);
        arrayofitems[tableno - 1].splice([saveindex], 1);
        arrayofprices[tableno - 1].splice([saveindex], 1);
        updatedPrice -= parseInt(priceofitem);
        document.getElementById("t"+tableno).children[1].innerText = updatedPrice;
        document.getElementById("totalid").innerHTML = "Total price: " + updatedPrice;
    }
}

function funcCloseSess(tableid) {
    var bill = document.createElement('p');
    var totalprice = (document.getElementById("totalid").innerText).substring(13);
    bill.innerHTML = "Total bill: " + totalprice;
    document.getElementById("popup").appendChild(bill);
    document.getElementById("t"+tableid).children[1].innerText = 0;
    document.getElementById("t"+tableid).children[2].innerText = 0;
    arrayofitems[tableid - 1] = [];
    arrayofprices[tableid - 1] = [];
}
function funcDelete(array1, element, tableid) {
    var counti = 0;
    var newprice;
    for (var ind = 0; ind < array1.length; ind++) {
        if (array1[ind] === element) {
            counti++;

          //  document.getElementById("t"+tableid).children[2].innerHTML = parseInt(document.getElementById("t"+tableid).children[2].innerHTML)-1
            newprice=parseInt(document.getElementById("t"+tableid).children[1].innerHTML) - parseInt(arrayofprices[tableid-1][ind]);
           // document.getElementById("t"+tableid).children[1].innerHTML = newprice;
            var remove = arrayofitems[tableid-1].splice(ind, 1);
            remove = arrayofprices[tableid-1].splice(ind, 1);
        }
    }
    document.getElementById("t"+tableid).children[2].innerHTML = parseInt(document.getElementById("t"+tableid).children[2].innerHTML)-counti;
    document.getElementById("t"+tableid).children[1].innerHTML = newprice;
    func();
    tabledesc("t"+tableid);
}
function func() {
    popup.style.display = 'none';
    document.getElementById("popup").innerHTML = "";
}
