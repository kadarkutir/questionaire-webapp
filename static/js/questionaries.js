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

function create_questionaire_from_data(link){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","/get_questions_for_questionnaire/"+link,true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp = JSON.parse(xmlHttp.response)
        create_questionaire(rsp)
    }
    xmlHttp.send()
}

function create_questionaire(data){
    mainframe = document.getElementById("mainframe")
    mainframe.innerHTML = "";
    document.title = data[0];
    h1 = document.createElement('h1')
    h1.innerHTML = data[0];
    mainframe.appendChild(h1)

    div_form = document.createElement('div')
    div_form.classList.add("quest_box")
    main_form = document.createElement('form')
    main_form.action = "/fill_post"
    main_form.method = "POST"
    main_form.classList.add("quest_form")

    for(let i = 1; i < data.length; i++){
        question = document.createElement('p')
        question.innerHTML = data[i]
        main_form.appendChild(question)

        text_input = document.createElement('input')
        text_input.type = "text"
        text_input.name = "answer" + i
        text_input.id = "answer" + i
        text_input.required = true
        main_form.appendChild(text_input)
    }
    enter = document.createElement("br")
    main_form.appendChild(enter)
    enter2 = document.createElement("br")
    main_form.appendChild(enter2)
    enter3 = document.createElement("br")
    main_form.appendChild(enter3)


    
    submit_button = document.createElement("button")
    submit_button.innerHTML = "Save your answers"
    submit_button.id = "save_button"
    main_form.appendChild(submit_button)

    back_button = document.createElement('button')
    back_button.innerHTML = "Back"
    back_button.classList.add('back_button')
    back_button.addEventListener('click', () => {
        questions_main()
    })

    div_form.appendChild(main_form)
    mainframe.appendChild(div_form)
    mainframe.appendChild(back_button)
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
            create_questionaire_from_data(link)
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
    questions_table.classList.add("general_table_design");
    questions_table.id = "table_q"
    mainframe.appendChild(questions_table)

    get_questionaries();

} 

window.addEventListener('DOMContentLoaded', () => {
    questions_main()
})
