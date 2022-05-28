$(document).ready(function(){
    function Get_Theater(){
        $.post(
            "Get_theater.jsp",
            {

            },
            function(Result){
                let test = Result;
                test = test.replace("[","");
                test = test.replace("]","");
                test = test.replaceAll("\n","");
                test = test.replaceAll(" ","");
                const arr = test.split(",");
                let create_li = document.createElement("li");
                let create_btn = document.createElement("button");
                
                // 버튼 생성해서 영화관 이름 받아온 결과 붙이기
                
            }
        )
    }

    Get_Theater();
})