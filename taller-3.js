//PUNTO 1 
function desglosarString(cadena, tipo) {
    const vocales = 'aeiouAEIOU';
    const consonantes = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';

    //Por defecto consonantes
    let caracteres = tipo === 'vocales' ? vocales : consonantes;
    let cantidad = cadena.split('')
        .filter(caracter => caracteres.includes(caracter))
        .length;

    return cantidad;
}

//PUNTO 2
// No estoy seguro del formato si es [[1,2],[3,4]] o todo flat [1,2,3,4]
function twoSum(array, target) {
    let result = [];
    // Usamos el primer map para recorrer el array y para cada elemento, buscamos el par usando el segundo map
    array.map((num1, i) => {
      array.map((num2, j) => {
        if (i !== j && !result.includes(i) && num1 + num2 === target) {
          result.push(i, j);  
        }
      });
    });
  
    return result;
  }
  
  //let numeros = [1,2,5,7,4,8];
  //let objetivo = 9;
  //console.log(twoSum(numeros, objetivo));  

//PUNTO 3
function conversionRomana(romano) {
    // Diccionario para traducir símbolos romanos a valores arábigos
    const diccionario = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    // Usamos reduce para sumar los valores correspondientes
    return romano.split('').reduce((total, actual, index, array) => {
        // Traducir el valor del símbolo actual
        const valorActual = diccionario[actual];
        // Traducir el valor del símbolo siguiente, si existe
        const valorSiguiente = diccionario[array[index + 1]] ?? 0;

        // Si el valor actual es menor que el siguiente, se resta; en caso contrario, se suma
        return valorActual < valorSiguiente ? total - valorActual : total + valorActual;
    }, 0);
}
