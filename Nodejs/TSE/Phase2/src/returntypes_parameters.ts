// - `ReturnType` and `Parameters`

// - `ReturnType` extracts the return type of a function type
function getUserName() {
  return "John Doe";
}

type UserName = ReturnType<typeof getUserName>; // string
console.log(typeof getUserName()); // string


// - `Parameters` extracts the parameters of a function type
function getUserInfo(name: string, age: number) {
  return { name, age };
}

type UserInfoParams = Parameters<typeof getUserInfo>; // [string, number]

const userInfoParams: UserInfoParams = ["Alice", 30];
console.log(userInfoParams); // [ 'Alice', 30 ]