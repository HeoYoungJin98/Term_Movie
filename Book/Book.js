$(document).ready(function(){
    function Create_List(String,id){  //id로 받은 곳에 List를 만드는 함수. 첫 인자가 String인 이유는 post의 결과값이 문자열로 나오기 때문
        let temp = String;
        temp = temp.replace("[","");
        temp = temp.replace("]","");
        temp = temp.replaceAll("\n","")
        const arr = temp.split(",");
        for(let i = 0; i < arr.length; i++){
            let create_li = document.createElement("li");
            let create_a = document.createElement("a");
            let create_p = document.createElement("p");
            create_p.setAttribute("class","Font");
            let Text = document.createTextNode(arr[i]);
            create_p.appendChild(Text);
            create_a.appendChild(create_p);
            create_li.appendChild(create_a);
            document.getElementById(id).appendChild(create_li);
        }
    }

    function Show_Theater(){ //극장을 보여주는 함수
        $.post(
            "Show_Theater.jsp",
            {

            },
            function(Result){
                Create_List(Result,"Theater_List");
            }
        )
    }

    function Show_Movie(Name){ //극장을 선택하면 영화들을 보여주는 함수
        $.post(
            "Show_Moie.jsp",
            {
                Theater: Name, //넘겨줄 값으로 영화관 이름이 필요함
            },
            function(Result){
                Create_List(Result,"Movie_List")
            }
        )
    }

    
})