$(document).ready(function(){
    function Login(e){ // 로그인 상태로 변경하는 함수
        $("#Not_Login").css("visibility","hidden"); // 로그인 버튼 비활성화
    }

    if(localStorage.getItem("user_num") != null){ // localStorage에 저장된 값이 있을 경우
        const { Mnum } = JSON.parse(localStorage.getItem("user_num")); //회원 번호를 Mnum에 저장
        Login(Mnum);
    }else{// 로그인하지 않은 상태일 경우
        $("#Login_div").load("../template/Not_Login.html");
        $("#Login_btn").on("click", function(){
            var ID = $("#ID").val(); // 회원정보 가져옴
            var PWD = $("#PWD").val(); // 비밀번호 가져옴

            $.post( //  Login.jsp 파일에 정보 전달
                "../Login/Login.jsp",
                {
                    ID: ID,
                    PWD: PWD,
                },
                function(Result){//callback
                    
                }
            )
        })
    }
})