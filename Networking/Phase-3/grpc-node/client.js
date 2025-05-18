const grpc= require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const packageDef = protoLoader.loadSync('greeter.proto');

const grpcObject = grpc.loadPackageDefinition(packageDef);

const Greet= grpcObject.Greeting;


const client = new Greet('localhost:50051', grpc.credentials.createInsecure());

client.SayHI({ name: 'Data bots'},(error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Greeting:', response.message);
    }
})

const stream=client.Streamlogs({ query : 'Hello world'});


stream.on('data', (data) => {
    console.log('Received log:', data);
}
)

stream.on('end',()=>{
    console.log('Stream ended');
})