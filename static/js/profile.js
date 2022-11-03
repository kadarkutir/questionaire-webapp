function get_user_data(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","/get_user_data",true)
    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xmlHttp.onload = function(){
        rsp = JSON.parse(xmlHttp.response)
        create_div(rsp)
    }
    xmlHttp.send()
}

function create_div(data){
    base = document.createElement('div')
    base.classList.add("profile")
    username = document.createElement("p")
    username.innerHTML = "Username: "+data[0]
    base.appendChild(username)
    email = document.createElement("p")
    email.innerHTML = "E-mail: " + data[1]
    base.appendChild(email)

    mainframe.appendChild(base)
}


function profile_main(){
    mainframe = document.getElementById("mainframe")
    mainframe.innerHTML = ""
    document.title = "Profile";
    h1 = document.createElement('h1')
    h1.innerHTML = 'Profile';
    mainframe.appendChild(h1)

    get_user_data()
}