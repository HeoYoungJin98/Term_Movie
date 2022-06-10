$(document).ready(function(){
    function Remove_Blank(String){ //문자열에서 대괄호나 줄바꿈을 제거하기 위한 함수
        String = String.replace("[",""); //여는 대괄호 제거
        String = String.replace("]",""); //닫는 대괄호 제거
        String = String.replaceAll("\n",""); //모든 줄바꿈 기호 제거

        return String; //제거된 문자열 반환
    }

    function Create_List(String,id,Type){  //id로 받은 곳에 List를 만드는 함수. 첫 인자가 String인 이유는 post의 결과값이 문자열로 나오기 때문
        let temp = String; //temp에 입력받은 String 저장
        temp = Remove_Blank(temp); //문자열의 공백 제거
        const arr = temp.split(","); // , 기준으로 문자열 잘라 배열에 저장
        for(let i = 0; i < arr.length; i++){
            let create_li = document.createElement("li"); //li 태그 생성
            let create_a = document.createElement("a"); //a 태그 생성
            create_a.setAttribute("href","#"); //a 태그의 이동을 막기위해 href = "#" 속성 추가
            create_a.setAttribute("onclick","return false;"); //마찬가지로 이동을 막기 위해 클릭시 false값 리턴
            if(Type == 1){ //극장을 보여줘야 하는 경우
                create_a.setAttribute("class","Theaters"); //링크의 class를 Theater로 설정
                create_a.setAttribute("data-value",i+1); //링크의 data-value 를 설정
            }else if(Type == 2){ //영화 이름을 보여줘야 하는 경우
                create_a.setAttribute("class","Movies"); //class를 Movies로 설정
                create_a.setAttribute("data-value",arr[i]); //내부 data-value를 배열의 값으로 설정
            }else if(Type == 3){ //날짜를 보여줘야 하는 경우 
                create_a.setAttribute("class","Dates"); //class를 Dates로 설정
            }else{ //상영 시간을 보여줘야 하는 경우
                create_a.setAttribute("class","Times"); //class를 Times로 설정
            }
            let create_p = document.createElement("p"); //p태그 생성
            create_p.setAttribute("class","Font"); //p 태그의 class를 Font로 설정
            let Text = document.createTextNode(arr[i]); //내부 text를 배열의 값으로 설정
            create_p.appendChild(Text); //p 태그 안에 text 노드 붙이기
            create_a.appendChild(create_p); //a 태그 안에 p 태그 붙이기
            create_li.appendChild(create_a); //li 태그 안에 p 태그 붙이기 
            document.getElementById(id).appendChild(create_li); //전달 받은 id의 태그 안에 li 붙이기
        }
    }

    function Create_Table(Result){ //인자를 받아와 해당 값들로 테이블을 생성함
        let test = Result; //test에 인자값 저장
        test = Remove_Blank(test); //공백 제거
        const arr = test.split(","); //,단위로 잘라서 배열에 저장
        let Row = arr.length/4; //상영관 번호, 스케줄, 남은 좌석 수, 상영관 타입이므로 길이/4
        let r = 0;
        while(r<Row){
            let Create_Tr = document.createElement("tr"); //tr태그 생성
            let div = document.getElementById("Result"); //테이블을 생성할 곳 저장
            div.appendChild(Create_Tr); //tr태그 생성
            for(let i = 0; i<4; i++){
                let Create_Td = document.createElement("td"); //td태그 생성
                let Text = document.createTextNode(arr[r*4+i]); //배열의 값을 Text 노드로 생성
                if(arr[r*4+i].charAt(0) == " "){ //만약 해당 값의 첫 시작이 공백이라면
                    arr[r*4+i] = arr[r*4+i].replace(" ",""); //공백 제거
                }//간혹 공백으로 인해 인식 못 하는 경우 발생하여 생성함
                Create_Td.appendChild(Text); //td 태그에 text노드 붙이기
                Create_Tr.appendChild(Create_Td); //tr 태그 안에 td 태그 붙이기
            }
            r++; //반복
        }
    }

    function Show_Theater(){ //극장을 보여주는 함수
        $.post(
            "../Theater/Get_theater.jsp", //.jsp 파일에 정보 전달
            {

            },
            function(Result){
                Create_List(Result,"Theater_List",1); //결과 값으로 리스트 생성
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
                Create_List(Result,"Movie_List",2) //결과 값으로 영화 목록 생성
            }
        )
    }

    function Show_Date(Movie_Name,Theater){ //영화 시작 날짜를 보여줌
        $.post(
            "Show_Date.jsp",
            {
                Name: Movie_Name, //넘겨줄 값으로 영화 이름과
                Theater: Theater, //극장 번호 전달
            },
            function(Result){
                Create_List(Result,"Date_List",3) //영화 시작 날짜 리스트 생성
            }
        )
    }

    function Show_Time(Theater, Movie, Date){ //영화 시작 시각을 보여줌
        $.post(
            "Show_Time.jsp",
            {
                Theater: Theater, //극장 번호
                Name: Movie, //영화 이름
                Date: Date, //영화 날짜 전달
            },
            function(Result){
                Create_List(Result,"Time_List",4) //영화 시작 시각 리스트 생성
            }
        )
    }

    function RemoveAllChild(id){ //ChildNode를 전부 삭제. 테이블 내용을 비우기 위함
        let area = document.getElementById(id);
        while(area.hasChildNodes()){ //자식 노드가 없을 때까지
            area.removeChild(area.firstChild); //첫 번쨰 자식 노드 제거
        }
    }

    function Show_Detail(Theater, Movie, Date){ //영화 정보와 상영관 타입을 보여줌
        $.post(
            "Show_Detail.jsp",
            {
                Theater: Theater, //극장 번호
                Name: Movie, //영화 이름
                Date: Date, //상영 시간 전달
            },
            function(Result){
                Create_Table(Result); //결과 값으로 테이블 생성
            }
        )
    }

    function Get_My_Point(Name){ //보유 포인트 가져옴
        $.post(
            "Get_Point.jsp",
            {
                Mnum: Name, //사용자의 회원 번호 전달
            },
            function(Result){
                Result = Remove_Blank(Result); //결과값의 공백 제거
                let p = document.getElementById("My_Points"); //포인트가 보여질 곳
                p.removeChild(p.firstChild); //안에 있던 내용 삭제
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
            }
        )
    }

    function Add_Booker_Into_Movie(Movie, Mem){ //영화 테이블에 예매자수 저장
        $.post(
            "Add_Into_Movie.jsp",
            {
                Movie: Movie, //영화이름
                Mem: Mem, //인원수
            },
            function(Result){

            }
        )
    }

    function Add_Booker_Into_Schedule(Movie,Time,Mem){ //스케줄에 예매자수 저장
        $.post(
            "Add_Into_Schedule.jsp",
            {
                Movie: Movie, //영화이름
                Time: Time, //상영시간
                Mem: Mem, //인원수
            },
            function(Result){
                
            }
        )
    }

    function Add_Point(Mnum, accum){ //포인트 추가
        $.post(
            "Add_Point.jsp",
            {
                Mnum: Mnum, //회원번호
                accum: accum, //누적될 포인트
            },
            function(Result){

            }
        )
    }
    
    function Reduce_Point(Mnum, Point){ //포인트 차감
        $.post(
            "Reduce_Point.jsp",
            {
                Mnum: Mnum, //회원번호
                Point: Point, //사용된 포인트
            },
            function(Result){

            }
        )
    }

    function Reset_Value(){ //성인과 청소년의 수 초기화
        $("#Number_Teen").val(0); //청소년 태그의 값 0으로
        $("#Number_Adt").val(0); //성인 태그의 값 0으로
    }


    //페이지 로딩 완료
    Show_Theater(); //극장 정보 보여줌

    let Selected_Theater = 0; //극장 번호가 저장될 변수
    let Selected_Theater_text; //극장 이름이 저장될 변수
    let Selected_Movie; //선택한 영화 이름이 저장될 변수
    let Selected_Time; //선택한 영화 시간이 저장될 변수
    $(document).on("click",".Theaters",function(){ //극장 선택
        Reset_Value(); //테이블 지우기
        RemoveAllChild("Movie_List"); //영화 목록 삭제
        RemoveAllChild("Date_List"); //날짜 목록 삭제
        RemoveAllChild("Time_List"); //시간 목록 삭제
        RemoveAllChild("Result"); //결과  테이블 삭제
        let temp = $(this).data("value"); //선택한 곳의 극장 번호 저장
        Selected_Theater = temp; //선택한 극장 변수에 저장
        Show_Movie(temp); //해당 극장에서 상영하는 영화 보여줌
        Selected_Theater_text = $(this).text(); //적혀있는 극장 이름 저장
        let p = document.getElementById("Selected_Theater")
        p.removeChild(p.firstChild); //아래쪽 보여질 결과 삭제
        let Text = document.createTextNode("극장: " + Selected_Theater_text); //선택한 극장 정보
        p.appendChild(Text); //출력
    })

    $(document).on("click",".Movies",function(){ //영화 선택
        RemoveAllChild("Date_List"); //날짜 목록 삭제
        RemoveAllChild("Time_List"); //시간 목록 삭제
        RemoveAllChild("Result"); //결과  테이블 삭제
        let temp = $(this).attr("data-value"); //선택한 곳의 data-value 저장
        if(temp.charAt(0) == " "){ //첫 문자가 공백이라면
            temp = temp.replace(" ",""); //공백 삭제
        }
        Selected_Movie = temp; //선택한 영화 변수에 값 저장
        Show_Date(temp,String(Selected_Theater)); //날짜 불러오는 함수 동작
        let p = document.getElementById("Selected_Movie"); //최종 결과 저장할 태그
        p.removeChild(p.firstChild); //있던 값 각제
        let Text = document.createTextNode("영화: " + temp); //새로운 정보 Text 노드
        p.appendChild(Text); //출력
    })

    $(document).on("click",".Dates",function(){ //날짜 선택
        RemoveAllChild("Time_List"); //시간 목록 삭제
        RemoveAllChild("Result"); //결과  테이블 삭제
        let temp = $(this).children().text(); //선택한 날짜 정보 저장
        if(temp.charAt(0) == " "){ //첫 시작이 공백이라면
            temp = temp.replace(" ",""); //공백 제거
        }
        Selected_Time = temp; //변수에 선택한 날짜 저장
        Show_Time(Selected_Theater,Selected_Movie,temp); //시간을 보여주는 함수 동작
        Show_Detail(Selected_Theater,Selected_Movie,temp); //결과 테이블 생성
        let p = document.getElementById("Selected_Date"); //결과 정보가 저장될 태그
        p.removeChild(p.firstChild); //있던 값 삭제
        let Text = document.createTextNode("일시: " + temp); //선택한 값 출력
        p.appendChild(Text);
    })

    $(document).on("click",".Times",function(){ //스케줄 선택시
        let temp = $(this).children().text(); //선택한 시간 저장
        if(temp.charAt(0) == " "){ //첫 글자의 공백 제거
            temp = temp.replace(" ","");
        }
        let p = document.getElementById("Selected_Date"); //결과 정보가 저장될 태그
        p.removeChild(p.firstChild); //있던 값 삭제
        let Text = document.createTextNode("일시: " + temp); //새로운 정보 저장
        Selected_Time = temp; //변수에 정확한 시간 저장
        p.appendChild(Text);
        $("#Result_Space").css("visibility","visible"); //인원수 입력 박스 보여지게 변경
    })

    $("input[type=number]").change(function(){ //인원수 변경시 이벤트
        let p = document.getElementById("Price_p"); //총 가격이 출력될 태그
        p.removeChild(p.firstChild); //있던 값 삭제
        let Teen = 0; //청소년 수
        Teen = parseInt($("#Number_Teen").val()); //태그 내부의 값 저장
        let Adt = 0; //어른 수
        Adt = parseInt($("#Number_Adt").val()); //태그 내부의 값 저장
        if(Teen + Adt > 10){ //총 인원수가 10명이 넘으면
            alert("한 번에 최대 10명까지 예매 가능합니다."); //경고 출력
            $("#Number_Teen").val(0); //청소년 내부값 0으로
            $("#Number_Adt").val(0); //어른 내부값 0으로
        }
        let Sum_Adt = 0; //청소년 총 금액
        let Sum_Teen = 0; //어른 총 금액
        $.post(
            "Get_Type.jsp",
            {
                Theater: Selected_Theater, //선택한 극장
                Name: Selected_Movie, //선택한 영화
                Time: Selected_Time, //선택한 시간
            },
            function(Result){
                Result = Remove_Blank(Result); //결과에서 공백 제거
                if(Result == "일반관"){ //결과가 일반관일 경우
                    Sum_Teen = 8000 * Teen;
                    Sum_Adt = 10000 * Adt;
                }else{ //프리미엄관일 경우
                    Sum_Teen = 13000 * Teen;
                    Sum_Adt = 15000 * Adt;
                }
                let Text = document.createTextNode("총 가격: " + (parseInt(Sum_Adt)+ parseInt(Sum_Teen)) + "원"); //총 가격 출력
                p.appendChild(Text);
            }
        )
        $("#Go_Book").css("visibility","visible"); //예약 정보 보여지게 변경
    })

    $("#Go_Book").on("click",function(){ //예약하기 버튼 클릭 이벤트
        if(sessionStorage.getItem("user_info") == null){ //로그인 하지 않았을 경우
            alert("로그인이 필요합니다.");
        }else{
            $("[id^='User']").css("visibility","visible");
            const {name, Mnum} = JSON.parse(sessionStorage.getItem("user_info")); //로그인한 유저 회원 번호 받아옴
            Get_My_Point(Mnum); //보유 포인트 받아옴
        }
    })

    $("#Check").on("click",function(){ //금액 입력 후 확인 버튼 클릭 이벤트
        let Cash = $("#User_Cash").val(); //현금 결제 금액
        let Point = $("#User_Point").val(); //포인트 결제 금액
        let Price = $("#Price_p").text(); //총 금액
        let regex = /[^0-9]/g; //int형으로 저장하기 위한 정규표현식
        let mem = parseInt($("#Number_Teen").val()) + parseInt($("#Number_Adt").val());
        const {name, Mnum} = JSON.parse(sessionStorage.getItem("user_info"));
        Price = Price.replace(regex,""); //총 금액 숫자로 변환
        if(parseInt(Cash) + parseInt(Point) != Price){
            alert("올바른 금액을 입력해주세요.");
        }else{ //결제 완료
            let accum = 0; //적립될 포인트
            accum = Cash/20; //현금 결제 금액의 5%
            Add_List(Mnum,Selected_Movie,Selected_Theater,Selected_Time,mem,Cash,Point, Price, Mnum); //예매정보 테이블에 값 Insert
            Add_Booker_Into_Movie(Selected_Movie,mem) //영화 테이블에 예매자수 Insert
            Add_Booker_Into_Schedule(Selected_Movie,Selected_Time,mem) //스케줄 테이블에 예매자수 Insert
            if(Point != 0){ //입력한 포인트가 0이 아닐 때
                Reduce_Point(Mnum, Point); //사용한 포인트만큼 차감 후
                Add_Point(Mnum, accum); //다시 현금 결제 금액의 5% 포인트 적립
            }else{
                Add_Point(Mnum, accum); //회원의 포인트 적립
            }
            alert("예매가 완료 되었습니다."); //예매 완료 알림 출력
        }
    })

    $("#User_Point").change(function(){ //포인트 지불 값 변경 시
        let MyPoint = $("#My_Points").text(); //입력한 포인트 값 가져옴
        let regex = /[^0-9]/g;
        MyPoint = MyPoint.replace(regex,"");
        if(MyPoint < $(this).val()){ //입력한 값이 보유 포인트보다 클 경우
            alert("보유 포인트보다 큰 수는 입력할 수 없습니다.");
            $(this).val(0);
        }
    })
})