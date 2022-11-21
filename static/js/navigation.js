function openNav(){
    document.getElementById("mySidenav").style.width = "300px";
}

document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('mySidenav');
    if (!container.contains(e.target)) {
        container.style.width = "0";
    }
});

function openNavProfile(){
    document.getElementById("mySidenavProfile").style.width = "250px";
}

document.addEventListener('mouseup', function(e) {
    var container2 = document.getElementById('mySidenavProfile');
    if (!container2.contains(e.target)) {
        container2.style.width = "0";
    }
});