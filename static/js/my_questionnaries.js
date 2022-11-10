// Answer on questionnare table creator
function get_answers_on_own_questionnare(link){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",link,true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp3 = JSON.parse(xmlHttp.response)
        create_table_for_answers(rsp3)
    }
    xmlHttp.send()
}

function makeCell_answers(value,title,user){
    cell = document.createElement('td')
    cell.appendChild(document.createTextNode(value))
    cell.addEventListener('click',function(){
        get_answers_for_questionnare("/get_answers_by_user_and_title_my_questionnare/"+title+"/"+user)
    })

    return cell
}

function makeRow_answers(tbody,values){
    r = document.createElement('tr')
    r.appendChild(makeCell_answers(values[1],values[0],values[1]))
    r.appendChild(makeCell_answers(values[2],values[0],values[1]))
    
    tbody.appendChild(r)
}


function create_table_for_answers(data3){
    if(data3.length == 0){
        mainframe = document.getElementById("mainframe")
        mainframe.innerHTML = ""
        base = document.createElement('div')
        base.classList.add("profile")
        show = document.createElement("p")
        show.innerHTML = "Noone answered your questionnare :("
        base.appendChild(show)
        mainframe.appendChild(base)

        back_button = document.createElement('button')
        back_button.classList.add('back_button')
        back_button.addEventListener('click', () => {
            my_questionnaries_main()
        })

        mainframe.appendChild(back_button)
    }else{
        mainframe = document.getElementById("mainframe")
        mainframe.innerHTML = ""
        h1 = document.createElement('h1')
        h1.innerHTML = data3[0][0];
        mainframe.appendChild(h1)

        answer_table = document.createElement('table')
        answer_table.classList.add('my_questions_answers_table')
        thead = document.createElement('thead')
        answer_tbody = document.createElement('tbody')

        tr = document.createElement('tr');
        th1 = document.createElement('th');
        th1.appendChild(document.createTextNode('Answered by'));
        tr.appendChild(th1)
        th2 = document.createElement('th');
        th2.appendChild(document.createTextNode('Answered at'));
        tr.appendChild(th2)
        thead.appendChild(tr)

        for(var i = 0;i < data3.length;i++){
            makeRow_answers(answer_tbody,data3[i])
        }

        back_button = document.createElement('button')
        back_button.classList.add('back_button')
        back_button.addEventListener('click', () => {
            my_questionnaries_main()
        })

        mainframe.appendChild(back_button)
        answer_table.appendChild(thead);
        answer_table.appendChild(answer_tbody);
        mainframe.appendChild(answer_table)
    }       
}

// Answer by user creator
function get_answers_for_questionnare(link){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",link,true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp2 = JSON.parse(xmlHttp.response)
        create_answers_by_user(rsp2)
    }
    xmlHttp.send()
}

function create_answers_by_user(data2){
    mainframe = document.getElementById("mainframe")
    mainframe.innerHTML = ""
    h1 = document.createElement('h1')
    h1.innerHTML = data2[0];
    mainframe.appendChild(h1)

    answer_p = document.createElement("p")
    answer_p.innerHTML = "Answered by: "+data2[1]
    answer_p.classList.add("my_q_answer_by")
    mainframe.appendChild(answer_p)
    

    ans_table = document.createElement('table')
    ans_table.classList.add('result_table_design')
    ans_tbody = document.createElement('tbody')

    for(let j=2;j<data2.length;j++){
        row_ans = document.createElement('tr')
        col_ans = document.createElement('td')
        col_ans.appendChild(document.createTextNode(data2[j]))
        row_ans.appendChild(col_ans)
        ans_tbody.appendChild(row_ans)
    }

    back_button = document.createElement('button')
    back_button.classList.add('back_button')
    back_button.addEventListener('click',() => {
        my_questionnaries_main()
    })
    

    ans_table.appendChild(ans_tbody)
    mainframe.appendChild(ans_table)
    mainframe.appendChild(back_button)
}

// My questionnare table creator
function get_my_questionnaries(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","/get_own_questionnaries_by_user",true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp = JSON.parse(xmlHttp.response)
        create_table_mine(rsp)
    }
    xmlHttp.send()
}

function makeCell_my_questionnaire(value,title){
    cell = document.createElement('td')
    cell.appendChild(document.createTextNode(value))
    cell.addEventListener('click',function(){
        get_answers_on_own_questionnare("/get_all_answers_on_questionnare/"+title)
    })

    return cell
}

function makeRow_my_questionnaire(tbody,values){
    r = document.createElement('tr')
    r.appendChild(makeCell_my_questionnaire(values[0],values[0]))
    r.appendChild(makeCell_my_questionnaire(values[1],values[0]))
    
    tbody.appendChild(r)
}

function create_table_mine(data){
    if(data.length == 0){
        mainframe = document.getElementById("mainframe")
        base = document.createElement('div')
        base.classList.add("profile")
        show = document.createElement("p")
        show.innerHTML = "You dont have any questionnares :("
        base.appendChild(show)
        mainframe.appendChild(base)
    }else{
        table = document.getElementById('my_table_q');
        tbody = document.createElement('tbody');
        thead = document.createElement('thead');

        tr = document.createElement('tr');
        th1 = document.createElement('th');
        th1.appendChild(document.createTextNode('Title'));
        tr.appendChild(th1)
        th2 = document.createElement('th');
        th2.appendChild(document.createTextNode('Created at'));
        tr.appendChild(th2)
        thead.appendChild(tr)

        for(var i = 0;i < data.length;i++){
            makeRow_my_questionnaire(tbody,data[i])
        }

        table.appendChild(thead);
        table.appendChild(tbody);
    }
}

// Questionnare creator function
function create_questions_for_questionnare(){
    mainframe = document.getElementById('mainframe')
    mainframe.innerHTML = ""

    creator_box = document.createElement("div")
    creator_box.classList.add("quest_box")

    creator_form = document.createElement("form")
    creator_form.method = "POST"
    creator_form.action = "/add_question"
    creator_form.classList.add("quest_form")

    title = document.createElement('p')
    title.innerHTML = "What is the title for this questionnare?"
    creator_form.appendChild(title)

    title_input = document.createElement('input')
    title_input.type = "text"
    title_input.name = "title"
    title_input.id = "title"
    title_input.required = true
    creator_form.appendChild(title_input)

    for(let i = 1; i < 11; i++){
        question = document.createElement('p')
        question.innerHTML = "What is the "+i+". question?"
        creator_form.appendChild(question)

        text_input = document.createElement('input')
        text_input.type = "text"
        text_input.name = "question" + i
        text_input.id = "question" + i
        text_input.required = true
        creator_form.appendChild(text_input)
    }

    enter = document.createElement("br")
    creator_form.appendChild(enter)
    enter2 = document.createElement("br")
    creator_form.appendChild(enter2)
    enter3 = document.createElement("br")
    creator_form.appendChild(enter3)


    submit_button = document.createElement("button")
    submit_button.innerHTML = "Save your questionnare"
    submit_button.id = "save_button"
    creator_form.appendChild(submit_button)


    back_button = document.createElement('button')
    back_button.classList.add('back_button')
    back_button.addEventListener('click', () => {
        my_questionnaries_main()
    })

    creator_box.appendChild(creator_form)
    mainframe.appendChild(creator_box)
    mainframe.appendChild(back_button)
}

// Main function
function my_questionnaries_main(){
    mainframe = document.getElementById("mainframe")
    mainframe.innerHTML = ""
    document.title = "My questionnares";
    h1 = document.createElement('h1')
    h1.innerHTML = 'My questionnares';
    mainframe.appendChild(h1)

    add_quest_button = document.createElement('button')
    add_quest_button.classList.add('question_plus_button')
    add_quest_button.addEventListener('click', () => {
        create_questions_for_questionnare()
    })

    mainframe.appendChild(add_quest_button)
    my_questions_table = document.createElement("table");
    my_questions_table.classList.add("my_questions_table");
    my_questions_table.id = "my_table_q"
    mainframe.appendChild(my_questions_table)

    get_my_questionnaries()
}
