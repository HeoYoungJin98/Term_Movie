$(document).ready(function(){
    function Login(e){ // 로그인 상태로 변경하는 함수
        $("#Not_Login").css("display","none"); // 로그인 버튼 비활성화
        let div = document.createElement("div")
        div.setAttribute("id","Success_Login")
        let p = document.createElement("p");//p태그 생성
        p.setAttribute("class","Font");
        let text = document.createTextNode(e + "님 환영합니다.");
        p.appendChild(text);
        div.appendChild(p);
        $("#Login_div").append(div);
    }

    if(localStorage.getItem("user_info") != null){ // localStorage에 저장된 값이 있을 경우
        const { name } = JSON.parse(localStorage.getItem("name")); //이름을 저장
        Login(name);
    }else{// 로그인하지 않은 상태일 경우
        $("#Login_div").load("../template/Not_Login.html");
    }

    $(document).on("click","#Login_btn",function(){
        var ID = $("#ID").val(); // 회원정보 가져옴
        var PWD = $("#PWD").val(); // 비밀번호 가져옴

        $.post( //  Login.jsp 파일에 정보 전달
            "../Login/Login.jsp",
            {
                ID: ID,
                PWD: PWD,
            },
            function(Result){//callback
                if(Result != null){ //검색 결과가 있을 경우, 결과는 이름
                    Login(Result);//로그인 함수 실행
                    const user_info = {//로컬 스토리지에 저장하기 위함
                        name: Result,
                        Mnum: ID,
                    }

                    localStorage.setItem("user_info", JSON.stringify(user_info));//로컬 스토리지에 저장
                }
            }
        )
})
})