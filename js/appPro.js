//Random Elements
function ordenarBloques(){
  $$('.elemento').each(function(item){
    item.setStyle({order: makeUniqueRandom()})
  })
}
var uniqueRandoms = [];
var numRandoms = 49;
function makeUniqueRandom() {
    // refill the array if needed
    if (!uniqueRandoms.length) {
        for (var i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];

    // now remove that value from the array
    uniqueRandoms.splice(index, 1);
    Console.log(val)
    return val;
}

//Onload Prototype
var $j = jQuery.noConflict();
document.observe("dom:loaded", function(){ 
    ordenarBloques();
})