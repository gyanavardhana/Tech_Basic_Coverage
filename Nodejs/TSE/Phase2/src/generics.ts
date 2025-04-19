// - Generics (`T`, `<T extends object>`)

// functions works with any type

function identity<T>(value: T): T {
    return value;
  }

const num = identity(10);        // T is number
const str = identity("Gyanavardhan"); // T is string
console.log(num);
console.log(str)

//or

// generics with arrays 
function getSecond<ArrayType>(array:ArrayType[]){
    return array[1]
}
const a=[1,2,3];
const A = getSecond(a); // will take number type

const b=["sd","bf"];
const B=getSecond<string>(b); // will take string type , we can explicitly send the type or else it will take type based on thje given data 

// generics with objects

type APIResponse<TData>={
    data:TData,
    isError:boolean
}
type UserResponse = APIResponse<{name:string,age:number}>
const user:UserResponse={ 
    data:{
        name:"Gyanavardhan",
        age:21,
    },
    isError:false
}
// instead we can call directly generic type data as Generic Types / Aliases
const user1:APIResponse<{name:string,age:number}>={ 
    data:{
        name:"Gyanavardhan",
        age:21,
    },
    isError:false
}

// giving default value for generic type
type APIResponse1<TData={status:number}>={
    data:TData,
    isError:boolean
}
// if we dont pass any data types for TData it will take default value type
const user2:APIResponse1={
    data:{
        status:200
    },
    isError:false
}

// extending object
function printKeys<T extends object>(obj: T): void {
    console.log(Object.keys(obj)); // prints ["name","age"]
  }

printKeys({ name: "Gyanavardhan", age: 25 });