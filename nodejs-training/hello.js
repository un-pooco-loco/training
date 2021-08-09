function Greet(name) {
    console.log('Hello', name + "! Welcome to nodeJS");
}

function GreetAgain(name) {
    console.log(name, "How you doin?");
}

module.exports.Greet = Greet;
exports.GreetAgain = GreetAgain;
//Greet('Maitri');