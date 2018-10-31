var fetch = require("node-fetch");
var schedule = require("node-schedule");
var fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
 



async function getKurse(){
    
    var res = await fetch("https://vorlesungsplan.dhbw-mannheim.de/index.php?action=list&gid=3067001");
    var content = await res.text();
    //console.log(content);
    
    //var content = await sendRequest("https://vorlesungsplan.dhbw-mannheim.de/index.php?action=list&gid=3067001");
    //var content = fs.readFileSync("1.html", "utf8");
    //console.log(content);
    
    const dom = new JSDOM(content);

    var jahr = dom.window.document.querySelectorAll("div.ui-grid-e [class^='ui-block']");
    
    var kurse = {};

    for(var i = 0; i < jahr.length; i++){

        var bezeichnung = jahr[i].querySelector("h1").innerHTML;


        var kurs = {};

        var subkurse = {};

        var subkurseElemente = jahr[i].querySelectorAll("a.cal-user");
        //console.log(subkurseElemente.length);
        
        for(var j = 0; j < subkurseElemente.length; j++){
            subkurse[subkurseElemente[j].innerHTML] = { link: subkurseElemente[j].getAttribute("href") };


            //fetch plan

            var t_d = await fetch("https://vorlesungsplan.dhbw-mannheim.de/"+ subkurseElemente[j].getAttribute("href") );
            var con = await t_d.text();

            //compute fetched data
            var f_content = extractPlan(con);
            var c_name = bezeichnung + "-" + subkurseElemente[j].innerHTML;

            fs.writeFileSync("./tmp/" + c_name + ".html", f_content);



        }

        //, link: subkurseElemente[i].getAttribute("href")

        kurs.subkurse = subkurse;
        
        kurse[bezeichnung] = kurs;


    }


    return kurse || [];
}

var tasks = {};
tasks.tasks = {};
tasks.status = {};

tasks.addTask = function(name, fnc, intervall){

    tasks.tasks[name] = schedule.scheduleJob(intervall, fnc);

    tasks.status[name] = 1;

}

tasks.stopTask = function(name){

    tasks.tasks[name].cancel();
    tasks.status[name] = 0;

}

tasks.activateTask = function(name){

    tasks.tasks[name].reschedule();
    tasks.status[name] = 1;

}


tasks.getStatus = function(name){
    return name ? tasks.status[name] : tasks.status;
}


 
var kurseSync = async function(){

    //console.log(await getKurse());
    
    var kurse = await getKurse();

    

    if(kurse != []){

        fs.writeFileSync("./tmp/kurs.html", JSON.stringify(kurse), "utf8");
    
        console.log("--new kurs fetch");

    } else {

        console.log("--fetch failed");
        

    }
    


};


//tasks.addTask("kurseSync", kurseSync, { second: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]});
tasks.addTask("kurseSync", kurseSync, { minute: [59]});


kurseSync()

module.exports = tasks;
