// task 1

type APIResponse<T> = {
    data: T;
    isError: boolean;
    };
type User = {
    name: string;
    age: number;
};
type Admin = {
    name: string;
    role: string;
};
type UserResponse = APIResponse<User>;
type AdminResponse = APIResponse<Admin>;

type UserOrAdminResponse = UserResponse | AdminResponse;

const user: UserResponse = {
    data: {
        name: "John",
        age: 30,
    },
    isError: false,
};

const admin: AdminResponse = {
    data: {
        name: "Jane",
        role: "admin",
    },
    isError: false,
};

// task 2

type Person = {
    name: string;
    age: number;
};

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
const person: Person = {
    name: "Alice",
    age: 25,
};

const nameValue = getValue(person, "name"); // "Alice"
const ageValue = getValue(person, "age"); // 25
console.log(nameValue); 
console.log(ageValue);

// task 3


type UserOrAdmin = User | Admin;
function printUserOrAdmin(userOrAdmin: UserOrAdmin) {
    if ("age" in userOrAdmin) {
        console.log(`User: ${userOrAdmin.name}, Age: ${userOrAdmin.age}`);
    } else {
        console.log(`Admin: ${userOrAdmin.name}, Role: ${userOrAdmin.role}`);
    }
}

const user1: UserOrAdmin = {
    name: "John",
    age: 30,
};

printUserOrAdmin(user1); // User: John, Age: 30

const admin1: UserOrAdmin = {
    name: "Jane",
    role: "admin",
};

printUserOrAdmin(admin1); // Admin: Jane, Role: admin

// task 4
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop()); // 3
console.log(numberStack.size()); // 2
