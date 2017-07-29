var pubs= [];

function upButton(element)
{
    var id=element.parentNode.id;
    var index=pubs.indexOf(id);
    if(index>0)
    {
        pubs[index] = pubs[index-1];
        pubs[index-1] = id;
        updateList();
    }
}

function downButton(element)
{
    var id=element.parentNode.id;
    var index=pubs.indexOf(id);
    if(index < pubs.length-1)
    {
        pubs[index] = pubs[index+1];
        pubs[index+1]=id;
        updateList();
    }

}

function addPub(element)
{
    var id = element.parentNode.id;
    console.log("The pub is " + id);
    var idExists = false;
    for(var i=0;i<pubs.length;i++)
    {
        if(pubs[i] == id)
        {
            idExists = true;
            break;
        }
    }
    if(!idExists)
    {
        pubs.push(id);
        console.log(pubs);
        updateList();
    }
}

function removePub(element)
{
    var index = -1;
    var id = element.parentNode.id;
    index = pubs.indexOf(id);
    if(index > -1)
    {
        pubs.splice(index, 1);
    }
    console.log(pubs);
    updateList();
}

function updateList()
{
    var element = document.getElementById("list");
    console.log(element.id);
    var output = "";
    for(var i=0;i<pubs.length;i++)
    {
        console.log("For loop iteration " + i);
        console.log("Pub ID should be " + pubs[i]);
        output=output.concat("<div id=\"" + pubs[i] + "\">\n" +
        "<button onclick=\"upButton(this)\"><i class=\"chevron up icon\"></i></button>\n" +
        "<button onclick=\"downButton(this)\"><i class=\"chevron down icon\"></i></button>\n" +
        pubs[i] + "\n" +
        "<button onclick=\"removePub(this)\"><i class=\"minus square outline icon\"></i></button>\n" +
        "</div>\n");
    }
    element.innerHTML = output;
    console.log("List updated");
}