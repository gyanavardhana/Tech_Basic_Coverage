const grpc= require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('greeter.proto');

const grpcObject = grpc.loadPackageDefinition(packageDef);

const Greet= grpcObject.Greeting;


function GreetRequest(call,callback){
    const name= call.request.name;
    callback(null, {message: `Hello ${name}`});

}

function Streamlogs(call){
    const query= call.request.query;
    let count=0;
    const interval = setInterval(() => {
        if(count>10){
            clearInterval(interval);
            call.end();
            return;
        }
        call.write({log: `Log ${count} for query ${query}`});
        count++;
    },1000);
}


const server= new grpc.Server();

server.addService(Greet.service, {
    SayHI: GreetRequest,
    Streamlogs: Streamlogs
});


server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), ()=>{
    console.log('Server running at http://localhost:50051');
    
}
);