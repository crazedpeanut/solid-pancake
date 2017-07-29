var pubs=["pub1", "pub2"];

function crawlSelect(element)
{
    id=element.id;
    console.log(id);
    for(var i=0;i<pubs.length;i++)
    {
        document.getElementById(pubs[i]).style.backgroundColor = "white";
        document.getElementById(pubs[i]).style.boxShadow="inset 0 0 0";
    }
    document.getElementById(id).style.backgroundColor = "darkgrey";
    document.getElementById(id).style.boxShadow = "inset 0 0 5px #000000";

    document.getElementById()
}