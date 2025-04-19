// Discriminated Unions

// Discriminated unions are a powerful way to model data that can take on different shapes.

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; sideLength: number }
    | { kind: "rectangle"; width: number; height: number };
function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "rectangle":
            return shape.width * shape.height;
    }
}   

// Example usage
const circle: Shape = { kind: "circle", radius: 5 };
const square: Shape = { kind: "square", sideLength: 4 };
const rectangle: Shape = { kind: "rectangle", width: 3, height: 6 };
console.log(area(circle)); // 78.53981633974483
console.log(area(square)); // 16
console.log(area(rectangle)); // 18

