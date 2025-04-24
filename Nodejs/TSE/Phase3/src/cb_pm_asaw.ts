// callbacks vs promises vs async/await

// callbacks
function getData(callback: Function) {
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}

/*
getData((data: string) => {
    console.log(data); // Data received
});
*/


// promises
function getDataPromise(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received Through Promise");

        }, 2000);
    });
}

/*
getDataPromise().then((data) => {
    console.log(data); // Data received
});

*/

// async/await
async function getDataAsync(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received Through Async/Await");
        }, 3000);
    });
}

async function fetchData() {
    const data = await getDataAsync();
    console.log(data); // Data received
}


export { getData, getDataPromise, fetchData };