function get_answers(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","/get_all_answer_by_user",true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp = JSON.parse(xmlHttp.response)
        create_table(rsp)
    }
    xmlHttp.send()
}

function get_answers_by_user(link){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",link,true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp = JSON.parse(xmlHttp.response)
        create_answer_all(rsp)
    }
    xmlHttp.send()
}

function create_answer_all(data){
    mainframe = document.getElementById("mainframe")
    mainframe.innerHTML = ""

    document.title = "My library";
    h1 = document.createElement('h1')
    h1.innerHTML = data[0];
    mainframe.appendChild(h1)

    result_table = document.createElement('table')
    result_table.classList.add('result_table_design')
    tbody = document.createElement('tbody')

    for(let i = 1; i < data.length;i++){
        tr = document.createElement('tr')
        td = document.createElement('td')
        td.appendChild(document.createTextNode(data[i]))
        tr.appendChild(td)
        tbody.appendChild(tr)
    }

    back_button = document.createElement('button')
    back_button.classList.add('back_button')
    back_button.addEventListener('click', () => {
        library_main()
    })
    
    result_table.appendChild(tbody)
    mainframe.appendChild(result_table)
    mainframe.appendChild(back_button)
}


function makeCellLibrary(value,link){
    cell = document.createElement('td')
    cell.appendChild(document.createTextNode(value))
    title = link
    cell.addEventListener('click',function(){
        get_answers_by_user('/get_answers_by_user_and_title/'+link);
    })

    return cell
}

function makeRowLibrary(tbody,values){
    r = document.createElement('tr')
    r.appendChild(makeCellLibrary(values[0],values[0]))
    r.appendChild(makeCellLibrary(values[1],values[0]))
    r.appendChild(makeCellLibrary(values[2],values[0]))

    tbody.appendChild(r)
}

function create_table(data){
    mainframe = document.getElementById('mainframe')

    if(data.length == 0){
        base = document.createElement('div')
        base.classList.add("profile")
        show = document.createElement("p")
        show.innerHTML = "You havent answered any of the questionnaries :("
        base.appendChild(show)
        mainframe.appendChild(base)
    }else{

        table = document.getElementById('table_a');
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
        th3.appendChild(document.createTextNode('Answered at'));
        tr.appendChild(th3);
        thead.appendChild(tr);

        for(var i = 0;i < data.length;i++){
            makeRowLibrary(tbody,data[i])
        }

        table.appendChild(thead);
        table.appendChild(tbody);
    }
}





function library_main(){
    mainframe = document.getElementById("mainframe")
    mainframe.innerHTML = ""
    document.title = "My library";
    h1 = document.createElement('h1')
    h1.innerHTML = 'My library';
    mainframe.appendChild(h1)

    answer_table = document.createElement("table");
    answer_table.classList.add("general_table_design");
    answer_table.id = "table_a"
    mainframe.appendChild(answer_table)

    get_answers();
}
