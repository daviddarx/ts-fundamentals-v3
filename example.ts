

// VARIABLES 

let startTime = new Date()                            // auto-declaration, par la value de base 
let endTime: Date                                     // declaration manuelle, quand on attribue aucune valeur par defaut 



// FUNCTIONS 

function add1(a: number, b: number) {                 // déclaration sur une fonction  
  return a + b                                        // le compiler sait que cela sera un nombre aussi  
}

function add2(a: number, b: number): number {          // ici, on déclare le type de rendu de la fonction, se qui est aussi pratique car cela force à avoir un return cohérent dans la fonction, sinon erreur la bas
    return a + b;                                                    
}         


// OBJECTS 

let car1 = {                                            // instanciation, auto typing 
  make: "Toyota", 
  model: "Corolla",
  year: 2002
}

let car: {                                            // typing inside a let  
  make: string                                        // pratique car amène l'autocomplete -> car.m... -> model  
  model: string
  year: number
}      


function printCar(car: {                             // typing inside a function  
  make: string
  model: string
  year: number
  chargeVoltage?: number                            // optional argument!  -> type = number or undefined
}) {
    if (typeof car.chargeVoltage !== "undefined"){  // obligatoire pour faire qqch avec le paramètre, sinon il y aura une erreur "attention, cela peut être indefined) 
        car.chargeVoltage.toFixed();                // fait quelquechose si il y a le parametre optionel
    }
}



// OBJECTS COMPLEXES - INDEX SIGNATURES 

const phones1 = {                                   // exemple 
  home: { country: "+1", area: "211", number: "652-4515" },
  work: { country: "+1", area: "670", number: "752-5856" },
  fax: { country: "+1", area: "322", number: "525-4357" },
}

const phones2: {                                    // typing 
  [k: string]: {                                    // k = key, peut être n'importe qu'elle autre key, représente les différentes key de l'object
    country: string
    area: string
    number: string
  }
} = {}                                              // avec cela, il sait que phones2.fax doit être un object avec country, area, number comme strings



// ARRAYS 

const fileExtensions = ["js", "ts"];                // auto-typing: string[] 
const fileExtensions2 = ["js", 2];                  // auto-typing: (string | number)[]

const cars = [                                      // auto typing: {make:string, model:string, year:number}[]
  {
    make: "Toyota",
    model: "Corolla",
    year: 2002,
  },
];



// TUPLES   // arrays de datas dans un ordre précis ou non 
  
let myCar = [2002, "Toyota", "Corolla"];        // auto-type: (string | number)[]

myCar = ["Honda", 2017, "Accord", "Sedan"]      // cela poserait problème avec la déclratation shortcut suivant 

const [year, make, model] = myCar;              // js déclaration shortcut -> year = 2002   -> mais avec cela, pas possible de checker le type

let myCar2: [number, string, string] = [        // typing
  2002,
  "Toyota",
  "Corolla",
]

myCar2 = ["Honda", 2017, "Accord"];