//Punto 1
function convertidorTemp(celsius) {
    return (celsius * 9/5) + 32;
}
let celsius = 20;

console.log(`Prueba convertidor: ${celsius} C equivale a ${convertidorTemp(celsius)} F`);

//Punto 2
//By default the discriminant is positive
function resolvedor(a, b, c, positivo = true) {
    const discriminante = Math.sqrt(b * b - 4 * a * c);
    //Used optional chaining for selecting the correct result
    return positivo ? (-b + discriminante) / (2 * a) : (-b - discriminante) / (2 * a);
};

console.log(`Prueba resolvedor: ${resolvedor(1, 2, -15)}`);

//Punto 3
function mejorParidad(num){
    return (num % 2) === 0;
}

let a = 8;
console.log(`Prueba mejorParidad: Es ${a} par?: ${mejorParidad(a)}`);

//Punto 4 
//Yandere dev way
const peorParidad = num => {
    if (num === 1) {
        return false; 
    } else if (num === 2) {
        return true; 
    } else if (num === 3) {
        return false;
    } else if (num === 4) {
        return true; 
    } else if (num === 5) {
        return false;
    } else if (num === 6) {
        return true; 
    } else if (num === 7) {
        return false; 
    } else if (num === 8) {
        return true; 
    } else if (num === 9) {
        return false; 
    } else if (num === 10) {
        return true; 
    } else {
        return "Número fuera de rango"; 
    }
};

console.log(`Prueba peorParidad: Es ${a} par? ${peorParidad(a)}`);