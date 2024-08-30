//Punto 1
function findMax(numbers) {
    if (numbers.length === 0) 
        return null; 

    let max = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

//Punto 2 target no nulo por defecto
function includes(numbers, target = 0) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            return true;
        }
    }
    return false;
}

//Punto 3
function sum(numbers) {
    let total = 0;
    
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

//Punto 4
function missingNumbers(numbers) {
    let min = numbers[0];
    let max = numbers[0];
    
    // Encontrar el menor y el mayor número
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    
    let missing = [];
    
    // Recorrer desde el menor al mayor
    for (let i = min; i <= max; i++) {
        //Usando funcion includes se verifica si estan todos los intermedios
        if (!numbers.includes(i)) {
            missing.push(i);
        }
    }
    return missing;
}
