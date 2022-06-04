$(document).ready(function(){
    function Remove_Blank(String){
        String = String.replace("[","");
        String = String.replace("]","");
        String = String.replaceAll("\n","");

        return String;
    }

    function Create_List(String,id,Type){  //id로 받은 곳에 List를 만드는 함수. 첫 인자가 String인 이유는 post의 결과값이 문자열로 나오기 때문
        let temp = String;
        temp = Remove_Blank(temp);
        const arr = temp.split(",");
        for(let i = 0; i < arr.length; i++){
            let create_li = document.createElement("li");
            let create_a = document.createElement("a");
            create_a.setAttribute("href","#");
            create_a.setAttribute("onclick","return false;");
            if(Type == 1){
                create_a.setAttribute("class","Theaters");
                create_a.setAttribute("data-value",i+1);
            }else if(Type == 2){
                create_a.setAttribute("class","Movies");
                create_a.setAttribute("data-value",arr[i]);
            }else if(Type == 3){
                create_a.setAttribute("class","Dates");
            }else{
                create_a.setAttribute("class","Times");
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

    function Create_Table(Result){
        let test = Result;
        test = Remove_Blank(test);
        const arr = test.split(",");
        let Row = arr.length/4;
        let r = 0;
        while(r<Row){
            let Create_Tr = document.createElement("tr");
            let div = document.getElementById("Result");
            div.appendChild(Create_Tr);
            for(let i = 0; i<4; i++){
                let Create_Td = document.createElement("td");
                let Text = document.createTextNode(arr[r*4+i]);
                if(arr[r*4+i].charAt(0) == " "){
                    arr[r*4+i] = arr[r*4+i].replace(" ","");
                }
                Create_Td.appendChild(Text);
                Create_Tr.appendChild(Create_Td);
            }
            r++;
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

    function Show_Time(Theater, Movie, Date){
        $.post(
            "Show_Time.jsp",
            {
                Theater: Theater,
                Name: Movie,
                Date: Date,
            },
            function(Result){
                Create_List(Result,"Time_List",4)
            }
        )
    }

    function RemoveAllChild(id){
        let area = document.getElementById(id);
        while(area.hasChildNodes()){
            area.removeChild(area.firstChild);
        }
    }

    function Show_Detail(Theater, Movie, Date){
        $.post(
            "Show_Detail.jsp",
            {
                Theater: Theater,
                Name: Movie,
                Date: Date,
            },
            function(Result){
                Create_Table(Result);
            }
        )
    }

    function Get_My_Point(Name){
        $.post(
            "Get_Point.jsp",
            {
                Mnum: Name,
            },
            function(Result){
                Result = Remove_Blank(Result);
                let p = document.getElementById("My_Points");
                p.removeChild(p.firstChild);
                let Text = document.createTextNode("보유 포인트: "+ Result);
                p.appendChild(Text);
            }
        )
    }

    function Add_List(Mnum, Movie, Theater, Time, Mem, Cash, Point, Total, Mnum){ //예매 정보 저장
        $.post(
            "Add_List.jsp",
            {
                Mnum: Mnum, //회원번호
                Movie: Movie, //영화이름
                Theater: Theater, //극장번호
                Time: Time, //관람일자
                Mem: Mem, //관람 인원
                Cash: Cash, //현금결제
                Point: Point, //포인트결제
                Total: Total, //총 금액
                Mnum: Mnum,
            },
            function(Result){
                alert("예매가 완료되었습니다.");
            }
        )
    }

    function Add_Booker_Into_Movie(Movie, Mem){ //영화 테이블에 예매자수 저장
        $.post(
            "Add_Into_Movie.jsp",
            {
                Movie: Movie,
                Mem: Mem,
            },
            function(Result){

            }
        )
    }

    function Add_Booker_Into_Schedule(Movie,Time,Mem){ //스케줄에 예매자수 저장
        $.post(
            "Add_Into_Schedule.jsp",
            {
                Movie: Movie,
                Time: Time,
                Mem: Mem,
            },
            function(Result){
                
            }
        )
    }

    Show_Theater();

    let Selected_Theater = 0;
    let Selected_Theater_text;
    let Selected_Movie;
    let Selected_Time;
    $(document).on("click",".Theaters",function(){ //극장 선택
        RemoveAllChild("Movie_List");
        RemoveAllChild("Date_List");
        RemoveAllChild("Time_List");
        RemoveAllChild("Result");
        let temp = $(this).data("value");
        Selected_Theater = temp;
        Show_Movie(temp);
        Selected_Theater_text = $(this).text();
        let p = document.getElementById("Selected_Theater")
        p.removeChild(p.firstChild);
        let Text = document.createTextNode("극장: " + Selected_Theater_text);
        p.appendChild(Text);
    })

    $(document).on("click",".Movies",function(){ //영화 선택
        RemoveAllChild("Date_List");
        RemoveAllChild("Time_List");
        RemoveAllChild("Result");
        let temp = $(this).attr("data-value");
        if(temp.charAt(0) == " "){
            temp = temp.replace(" ","");
        }
        Selected_Movie = temp;
        Show_Date(temp,String(Selected_Theater));
        let p = document.getElementById("Selected_Movie");
        p.removeChild(p.firstChild);
        let Text = document.createTextNode("영화: " + temp);
        p.appendChild(Text);
    })

    $(document).on("click",".Dates",function(){ //날짜 선택
        RemoveAllChild("Time_List");
        RemoveAllChild("Result");
        let temp = $(this).children().text();
        if(temp.charAt(0) == " "){
            temp = temp.replace(" ","");
        }
        Selected_Time = temp;
        Show_Time(Selected_Theater,Selected_Movie,temp);
        Show_Detail(Selected_Theater,Selected_Movie,temp);
        let p = document.getElementById("Selected_Date");
        p.removeChild(p.firstChild);
        let Text = document.createTextNode("일시: " + temp);
        p.appendChild(Text);
    })

    $(document).on("click",".Times",function(){ //스케줄 선택시
        let temp = $(this).children().text();
        if(temp.charAt(0) == " "){
            temp = temp.replace(" ","");
        }
        let p = document.getElementById("Selected_Date");
        p.removeChild(p.firstChild);
        let Text = document.createTextNode("일시: " + temp);
        Selected_Time = temp;
        p.appendChild(Text);
        $("#Result_Space").css("visibility","visible");
    })

    $("input[type=number]").change(function(){ //인원수 박스 변경시 이벤트
        let p = document.getElementById("Price_p");
        p.removeChild(p.firstChild);
        let Teen = 0; 
        Teen = parseInt($("#Number_Teen").val());
        let Adt = 0;
        Adt = parseInt($("#Number_Adt").val());
        if(Teen + Adt > 10){
            alert("한 번에 최대 10명까지 예매 가능합니다.");
            $("#Number_Teen").val(0);
            $("#Number_Adt").val(0);
        }
        let Sum_Adt = 0;
        let Sum_Teen = 0;
        $.post(
            "Get_Type.jsp",
            {
                Theater: Selected_Theater,
                Name: Selected_Movie,
                Time: Selected_Time,
            },
            function(Result){
                Result = Remove_Blank(Result);
                if(Result == "일반관"){
                    Sum_Teen = 8000 * Teen;
                    Sum_Adt = 10000 * Adt;
                }else{
                    Sum_Teen = 13000 * Teen;
                    Sum_Adt = 15000 * Adt;
                }
                let Text = document.createTextNode("총 가격: " + (parseInt(Sum_Adt)+ parseInt(Sum_Teen)) + "원");
                p.appendChild(Text);
            }
        )
        $("#Go_Book").css("visibility","visible");
    })

    $("#Go_Book").on("click",function(){ //예약하기 버튼 클릭 이벤트
        if(sessionStorage.getItem("user_info") == null){
            alert("로그인이 필요합니다.");
        }else{
            $("[id^='User']").css("visibility","visible");
            const {name, Mnum} = JSON.parse(sessionStorage.getItem("user_info"));
            Get_My_Point(Mnum);
        }
    })

    $("#Check").on("click",function(){ //금액 입력 후 확인 버튼 클릭 이벤트
        let Cash = $("#User_Cash").val();
        let Point = $("#User_Point").val();
        let Price = $("#Price_p").text();
        let regex = /[^0-9]/g;
        let mem = parseInt($("#Number_Teen").val()) + parseInt($("#Number_Adt").val());
        const {name, Mnum} = JSON.parse(sessionStorage.getItem("user_info"));
        Price = Price.replace(regex,"");
        if(parseInt(Cash) + parseInt(Point) != Price){
            alert("올바른 금액을 입력해주세요.");
        }else{ //결제 완료
            Add_List(Mnum,Selected_Movie,Selected_Theater,Selected_Time,mem,Cash,Point, Price, Mnum); //예매정보 테이블에 값 Insert
            Add_Booker_Into_Movie(Selected_Movie,mem) //영화 테이블에 예매자수 Insert
            Add_Booker_Into_Schedule(Selected_Movie,Selected_Time,mem) //스케줄 테이블에 예매자수 Insert
            alert("예매가 완료 되었습니다.");
        }
    })

    $("#User_Point").change(function(){ //포인트 지불 값 변경 시
        let MyPoint = $("#My_Points").text();
        let regex = /[^0-9]/g;
        MyPoint = MyPoint.replace(regex,"");
        if(MyPoint < $(this).val()){
            alert("보유 포인트보다 큰 수는 입력할 수 없습니다.");
            $(this).val(0);
        }
    })
})