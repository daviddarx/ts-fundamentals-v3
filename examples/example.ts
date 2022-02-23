

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

myCar2 = ["Honda", 2017, "Accord"];            // throwing error 




// UNION & INTERSECTION TYPES    // OR & AND

// UNION = OR = everything in X groups, groups don't have to have intersections 
// INTERSECTION = AND = only the things in the middle of the groups, intersecting

function flipCoin(): "heads" | "tails" {       // UNION typing, 2 separated value
  if (Math.random() > 0.5) return "heads"
  return "tails"
}

function maybeGetUserInfo():                            // UNION typing with OR and TUPPLES
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  if (flipCoin() === "heads") {
    return [
      "success",
      { name: "Mike North", email: "mike@example.com" },    // user object
    ]
  } else {
    return [
      "error",
      new Error("The coin landed on TAILS"),                // error object  
    ]
  }
}

const outcome = maybeGetUserInfo()                    // we know, the secon element of the tupple is depending of the string in first element

const [first, second] = outcome 
console.log(first);                                   // types set for the both dynmic declarated js variables                      
console.log(second.name);                             // only second.name valid, as it is the only key available for  user and error 
console.log(second.email);                            // email only for user, not for error -> not valid

if (first == "success") console.log(second.email);    // wont work neither, cause only checking on runtime, not on compile time


// NARROW WITH TYPEGUARDS                             // narrow = restreindre

if (second instanceof Error) {                        
  console.log(second);                                // error 
} else {
  console.log(second.email);                          // user:  wokring, now it's sure it's a user 
}


// DISCRIMINITED UNIONS 

if (outcome[0] === "error") {                        // here understand TS that if the first one is error, we 100% know what is in the second tupple element 
  console.log(outcome);                              // this work, because not separated in 2 variables which could be 2 differents things (second = error or user). 
} else {                                             // there is one scenario, and another scenario, because our check is on the first part of the tupple
  console.log(outcome[1].email);                     // this is discriminated union. We have one convenient key on which we can rely on to make define precisely the scenarios. 
}                                                    // can be achieved with property of an object, or value of a tupple, something where we can have a TYPEGUARD outcome[0] === "error"

if (outcome[0] === "success") {                      // also work   
    console.log(outcome[1].email);                              
} else {                                            
    console.log(outcome);  
}
                 


// INTERSECTION TYPES (AND)                                          // way less common, as a function often has if/else (several pathes) and return things according to that (OR)

function makeWeek(): Date & { end: Date } {                         // INTERSECTION TYPING it returns a Date with an additional AND an end object which is a Date, attached to it
    const start = new Date()
    const end = new Date(start.valueOf() + ONE_WEEK)
  
    return { ...start, end }                                        // spread operator: kind of Object.assign, create a new object based on an existing object with adding some keys 
}

const thisWeek = makeWeek(); 
console.log(thisWeek); 
console.log(thisWeek.end);




// TYPE ALIASES                                                    // Create definition files for you types, giving them names

import { UserContactInfo, UserInfoOutcome, SpecialDate } from "./types";         // see types.ts in same folder 

function printContactInfo(info: UserContactInfo) {
    console.log(info)
    console.log(info.email)
}

const painter = {
    name: "Robert Ross",
    email: "bross@pbs.org",
    favoriteColor: "Titanium White",
}
  
printContactInfo(painter)                                          // totally fine, as the definition of what is needed is respected (name, email)

export function maybeGetUserInfo2(): UserInfoOutcome {              // example with the types of previous example 
    // implementation is the same in both examples
    if (Math.random() > 0.5) {
      return [
        "success",
        { name: "Mike North", email: "mike@example.com" },
      ]
    } else {
      return [
        "error",
        new Error("The coin landed on TAILS :("),
      ]
    }
}


const newYearsEve: SpecialDate = {                              // type for extending a Date object
    ...new Date(),
    getReason: () => "Last day of the year",
}

newYearsEve.getReason




// INTERFACES               

// only for object types
// union types won't be allowed there (OR |), cause they are more complicated

import { UserInfo } from "./types";

interface Animal {                                        // interface for animal type
    isAlive(): boolean
}

interface Mammal extends Animal {                         // extends interfaces
    getFurOrHairColor(): string
}

interface Dog extends Mammal {
    getBreed(): string
}

function careForDog(dog: Dog) {
    console.log(dog.getFurOrHairColor);
}

// 

interface AnimalLike {
    eat(food): void
}

class Dog implements AnimalLike {                         // interface used to create classes and make sure they implemented all necessary stuff
    eat() {                                                 // eat becomse mandatory 
    // do something
    }

    bark() {
        return "woof"
    }
}

// 

window.exampleProperty = 45; 
            
interface Window {                                      // augmenting an existing interface 
    exampleProperty: number
}

window.exampleProperty = 45;                            // would be working if scripted added to an html?  




// JSON EXERCICE 

type JSONPrimitive = string | number | boolean | null           // basic json values
type JSONObject = { [k: string]: JSONValue }                    // index signature: object with string that are asigned to values
type JSONArray = JSONValue[]                                    // arrays
type JSONValue = JSONArray | JSONObject | JSONPrimitive         // final, allowing each json value 