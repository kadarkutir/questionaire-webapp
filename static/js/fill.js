function get_questionaries(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","/get_questions_for_questionnaire",true)
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
    enter4 = document.createElement("br")
    main_form.appendChild(enter4)


    div_button = document.createElement('div')
    div_button.classList.add("save_box")
    submit_button = document.createElement("button")
    submit_button.innerHTML = "Save your answers"
    submit_button.id = "save_button"
    div_button.appendChild(submit_button)

    main_form.appendChild(div_button)
    div_form.appendChild(main_form)
    mainframe.appendChild(div_form)
}


window.addEventListener('DOMContentLoaded',() => {
    get_questionaries()
})