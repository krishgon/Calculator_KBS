function clearScreen(){
    console.log('clicked');
    document.getElementById('screen').value = '';
}

function appendToScreen(character){
    console.log(character);
    document.getElementById('screen').value += character;
}

function calculate(){
    document.getElementById('screen').value = eval(document.getElementById('screen').value);
}