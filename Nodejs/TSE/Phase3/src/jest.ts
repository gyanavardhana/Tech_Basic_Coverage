export const add = (a: number, b: number): number => a + b;

export const subtract = (a: number, b: number): number => a - b;

export const multiply = (a: number, b: number): number => a * b;

export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
};



type User = {
    username: string;
    password: string;
  };
  
  const mockUsers: User[] = [
    { username: 'gyan', password: 'secure123' },
    { username: 'mami', password: 'helloWorld' },
  ];
  
  export const findUser = (username: string): User | undefined => {
    return mockUsers.find(user => user.username === username);
  };
  
  export const login = (username: string, password: string): boolean => {
    const user = findUser(username);
    return user ? user.password === password : false;
  };