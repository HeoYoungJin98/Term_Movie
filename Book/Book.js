$(document).ready(function(){
    function Create_List(String,id,Type){  //id로 받은 곳에 List를 만드는 함수. 첫 인자가 String인 이유는 post의 결과값이 문자열로 나오기 때문
        let temp = String;
        temp = temp.replace("[","");
        temp = temp.replace("]","");
        temp = temp.replaceAll("\n","");
        const arr = temp.split(",");
        for(let i = 0; i < arr.length; i++){
            let create_li = document.createElement("li");
            let create_a = document.createElement("a");
            if(Type == 1){
                create_a.setAttribute("class","Theaters");
                create_a.setAttribute("data-value",i+1);
            }else if(Type == 2){
                create_a.setAttribute("class","Movies");
                create_a.setAttribute("data-value",arr[i]);
            }else{
                create_a.setAttribute("class","Dates");
            }
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
            "../Theater/Get_theater.jsp",
            {

            },
            function(Result){
                Create_List(Result,"Theater_List",1);
            }
        )
    }

    function Show_Movie(Name){ //극장을 선택하면 영화들을 보여주는 함수
        $.post(
            "Show_Movie.jsp",
            {
                Theater: Name, //넘겨줄 값으로 영화관 이름이 필요함
            },
            function(Result){
                Create_List(Result,"Movie_List",2)
            }
        )
    }

    function Show_Date(Movie_Name,Theater){
        $.post(
            "Show_Date.jsp",
            {
                Name: Movie_Name,
                Theater: Theater,
            },
            function(Result){
                Create_List(Result,"Date_List",3)
            }
        )
    }

    function RemoveAllChild(id){
        let area = document.getElementById(id);
        while(area.hasChildNodes()){
            area.removeChild(area.firstChild);
        }
    }

    Show_Theater();

    let Selected_Theater = 0;
    $(document).on("click",".Theaters",function(){ //극장 선택
        RemoveAllChild("Movie_List");
        RemoveAllChild("Date_List");
        RemoveAllChild("Time_List");
        Show_Movie($(this).attr("data-value"));
        let temp = $(this).data("value");
        Selected_Theater = temp;
    })

    $(document).on("click",".Movies",function(){ //영화 선택
        RemoveAllChild("Date_List");
        RemoveAllChild("Time_List");
        let temp = $(this).attr("data-value");
        if(temp.charAt(0) == " "){
            temp = temp.replace(" ","");
        }
        Show_Date(temp,String(Selected_Theater));
    })

    $(document).on("click",".Dates",function(){ //날짜 선택
        RemoveAllChild("Time_List");
        
    })
})