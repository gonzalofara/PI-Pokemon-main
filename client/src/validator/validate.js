export default function validate(inputs){
    let error = {}
    if(!inputs.name) {error.name = "Name is require"};
    if(inputs.name.search("[0-9]") !== -1 ) {error.name = "The name must not have numbers"};
    if(inputs.name.search("[^A-Za-z0-9_]") !== -1) {error.name = "The name must not have symbols"} ;
    if(inputs.type1 === "" && inputs.type2 === "") {error.types = "At least one type is required"};
    if(inputs.health.search("[0-9]") === -1) {error.health = "Health only accept numbers"};
    if(inputs.attack.search("[0-9]") === -1) {error.attack = "Attack only accept numbers"};
    if(inputs.defense.search("[0-9]") === -1) {error.defense = "Defense only accept numbers"};
    if(inputs.speed.search("[0-9]") === -1) {error.speed = "Speed only accept numbers"};
    if(inputs.weight.search("[0-9]") === -1) {error.weight = "Weight only accept numbers"};
    if(inputs.height.search("[0-9]") === -1) {error.height = "Height only accept numbers"};
    return error;
}