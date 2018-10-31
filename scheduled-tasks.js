var fetch = require("node-fetch");
var schedule = require("node-schedule");
var fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
 

function len(a){
    return a.length;
}

function print(a){
    console.log(a);
}

async function extractPlan(a){

    let output = {};


    let adom = new JSDOM(a);
    let document = adom.window.document;

    let saeulen = document.querySelectorAll("div.ui-grid-e [class^='ui-block']");

    for(var i = 0; i < saeulen.length; i++){
        

        let time = saeulen[i].querySelector("ul");
        let timed = time.firstChild;

        

        let ex = timed.innerHTML.split(", ");
        let day = ex[0];
        let date = ex[1];
        
        output[date] = { day: day };

        let tmp = [];

        for(var j = 0; j < time.childNodes.length; j++){

            if(j != 0){

                let lec = {}

                lec.time = time.childNodes[j].querySelector(".cal-time").innerHTML;
                lec.title = time.childNodes[j].querySelector(".cal-title").innerHTML;
                lec.res = time.childNodes[j].querySelector(".cal-res").innerHTML;

                if(time.childNodes[j].querySelector(".cal-text") != null){
                    lec.text = time.childNodes[j].querySelector(".cal-text").innerHTML;
                }

                tmp.push(lec);

            }

        }

        output[date].lectures = tmp;

        

    }

    return output;


}


async function getKurse(){
    
    var res = await fetch("https://vorlesungsplan.dhbw-mannheim.de/index.php?action=list&gid=3067001");
    var content = await res.text();
    //console.log(content);
    
    //var content = await sendRequest("https://vorlesungsplan.dhbw-mannheim.de/index.php?action=list&gid=3067001");
    //var content = fs.readFileSync("1.html", "utf8");
    //console.log(content);
    
    let dom = new JSDOM(content);

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

            var extr = await extractPlan(con);

            //compute fetched data
            var f_content = JSON.stringify(extr);
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
