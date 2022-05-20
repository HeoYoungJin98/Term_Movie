$(document).ready(function(){
    $("#template_space").load("../template/template_Logo.html");
    $("#template_nav_space").load("../template/template_nav.html");

    function Login(){ //Login function
        let ID = $("#MNum").val(); //ID 값 가져옴
        let PW = $("#Password").val(); //PW 값 가져옴

        $.post( //jsp 파일에 정보 전달
            "Main.jsp", //정보 전달할 location
            {
                ID: ID, //전달 key와 값.
                PWD: PW,
            },
            function(Result){ //결과를 받아와 callback
                alert(Result);
            }
        )
    }
    
    $("#Login_btn").on("click", function(){ //로그인 클릭시 이벤트
        Login();
    })
})