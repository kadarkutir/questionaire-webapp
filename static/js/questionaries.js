function get_questionaries(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","/get_all_questionaries",true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp = JSON.parse(xmlHttp.response)
        create_table_question(rsp)
    }
    xmlHttp.send()
}


function makeCell(value,link){
    cell = document.createElement('td')
    cell.appendChild(document.createTextNode(value))
    cell.addEventListener('click',function(){
        // let np = window.open('/fill/'+link,"_self")
        check_user_filled(link)
    })

    return cell
}

function check_user_filled(link){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","/check_user_filled/"+link,true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp = JSON.parse(xmlHttp.response)
        if(rsp == "True"){
            alert("You already filled this questionnaire\n"+link)
        }else{
            let fill_page = window.open('/fill/'+link,'_self')
        }
    }
    xmlHttp.send()
}

function makeRow(tbody,values){
    r = document.createElement('tr')
    r.appendChild(makeCell(values[0],values[0]))
    r.appendChild(makeCell(values[1],values[0]))
    r.appendChild(makeCell(values[2],values[0]))

    tbody.appendChild(r)
}

function create_table_question(data){
    table = document.getElementById('table_q');
    tbody = document.createElement('tbody');
    thead = document.createElement('thead');

    tr = document.createElement('tr');
    th1 = document.createElement('th');
    th1.appendChild(document.createTextNode('Title'));
    tr.appendChild(th1)
    th2 = document.createElement('th');
    th2.appendChild(document.createTextNode('Created by'));
    tr.appendChild(th2)
    th3 = document.createElement('th');
    th3.appendChild(document.createTextNode('Created at'));
    tr.appendChild(th3);
    thead.appendChild(tr);

    for(var i = 0;i < data.length;i++){
        makeRow(tbody,data[i])
    }

    table.appendChild(thead);
    table.appendChild(tbody);
}


function questions_main(){
    mainframe = document.getElementById("mainframe");
    mainframe.innerHTML = "";
    document.title = "Questionnares";
    h1 = document.createElement('h1')
    h1.innerHTML = 'Questionnares';
    mainframe.appendChild(h1)
    questions_table = document.createElement("table");
    questions_table.classList.add("question_table");
    questions_table.id = "table_q"
    mainframe.appendChild(questions_table)

    get_questionaries();

}    
