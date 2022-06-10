$(document).ready(function(){
    function Create_Table(Arr,value){ //테이블 생성
        let temp = Arr //실제로 넘겨받는 값은 문자열
        temp = temp.replace("[",""); //대괄호 제거
        temp = temp.replace("]","");
        temp = temp.replaceAll("\n",""); //줄바꿈 제거
        const array = temp.split(","); //문자열 split 하여 저장
        let Row = array.length / 9;
        let r = 0;
        while(r < Row){
            let Create_Tr = document.createElement("tr"); //tr태그 생성
            let div = document.getElementById("Result_Part"); //테이블이 생길 곳
            div.appendChild(Create_Tr);
            for(let i = 0; i<9; i++){
                if(array[r*9+i].charAt(0) == " "){ //배열의 첫 문자열이 공백일 경우
                    array[r*9+i] = array[r*9+i].replace(" ",""); //공백 삭제
                }
                let Create_Td = document.createElement("td"); //td 태그 생성
                if(i==8 && value == 4){ //만약 예매 취소를 누른 상황이라면 마지막 값으로
                        let btn = document.createElement("button"); //버튼 생성
                        btn.setAttribute("class","Cancel_btn"); //버튼의 class
                        btn.setAttribute("value", r+1); //버튼의 값
                        let Text = document.createTextNode("취소하기"); //취소하기 Text 노드
                        btn.appendChild(Text);
                        Create_Td.appendChild(btn);
                        Create_Tr.appendChild(Create_Td);
                }else{ //예매 취소가 아닌 내역 조회일 경우
                    let Text = document.createTextNode(array[r*9+i]);
                    Create_Td.appendChild(Text);
                    Create_Tr.appendChild(Create_Td);
                }
            }
            r++;
        }
    }

    function Remove_List_Table(){ //테이블 내부 값 삭제
        let area = document.getElementById("Result_Part");
        while(area.hasChildNodes()){
            area.removeChild(area.firstChild);
        }
    }

    function Bring_List(value, Mnum){ //jsp에서 쿼리문 결과 받아오기
        let p = document.getElementById("Date"); //테이블 header 값
        p.removeChild(p.firstChild); //삭제
        let Text;
        if(value == 1){ //영화 예매 내역
            Text = document.createTextNode("예매 일시");
        }else if(value == 2){ //예매 취소 내역
            Text = document.createTextNode("취소 일시");
        }else if(value == 3){ //영화 관람 내역
            Text = document.createTextNode("관람 일시");
        }else{ //예매 취소
            Text = document.createTextNode("예매 취소");
        } //각 Case에 따라 Head 값 저장
        p.appendChild(Text);
        $.post(
            "Bring_List.jsp",
            {
                Type: value, //불러올 태그의 타입
                Mnum: Mnum, //회원 번호 전달
            },
            function(Result){
                Remove_List_Table(); //테이블 내부 값 삭제
                Create_Table(Result, value) //테이블 생성
            }
        )
    }

    function Cancel(Mnum, Movie, Date){ //예매 취소
        $.post(
            "Cancel.jsp",
            {
                Mnum: Mnum, //회원번호
                Movie: Movie, //영화 이름
                Date: Date, //영화 시간 전달
            },
            function(Result){ //callback 없음

            }
        )
    }

    function Add_Point(Mnum, Cash){ //포인트 저장
        $.post(
            "Add_Point.jsp",
            {
                Mnum: Mnum, //회원 번호
                Cash: Cash, //돌려받을 포인트
            },
            function(Result){

            }
        )
    }

    function Reduce_Schedule(Movie, Time, Mem){ //스케줄에서 예매자수 감소
        $.post(
            "Reduce_Schedule.jsp",
            {
                Movie: Movie, //영화이름
                Time: Time, //영화 시간
                Mem: Mem, //인원수
            },
            function(Result){

            }
        )
    }

    function Reduce_Movie(Movie, Mem){ //영화에서 예매자수 감소
        $.post(
            "Reduce_Movie.jsp",
            {
                Movie: Movie, //영화 이름
                Mem: Mem, //인원수
            },
            function(Result){

            }
        )
    }


    // 페이지 로딩 완료
    const {name, Mnum} = JSON.parse(sessionStorage.getItem("user_info")); //로그인 정보 가져옴
    Bring_List(1, Mnum); //페이지 로딩이 끝나면 예매 내역 조회
    

    $("input[id^='List']").on("click",function(){ //보기를 희망하는 항목 선택 시
        let Click = $(this).val(); //해당 타입 받아옴
        Bring_List(Click, Mnum); //타입에 따라 리스트 받아와 테이블 생성
    })

    $(document).on("click",".Cancel_btn",function(){ //예매 취소 버튼 클릭시
        let r = $(this).val(); //테이블의 몇 번째 행인지 저장
        let temp  = document.getElementsByTagName("td"); //html 내부에 존재하는 td 태그들 선택
        let Name = temp[r*9+1].innerHTML; //해당 행의 2번째는 영화 제목
        let Date = temp[r*9+3].innerHTML; //영화 시간
        let Cash = temp[r*9+5].innerHTML; //현금 결제 금액
        let Point = temp[r*9+6].innerHTML; //포인트 결제 금액
        let mem = temp[r*9+4].innerHTML; //인원수

        Cancel(Mnum,Name,Date); //예매내역에 취소시각 기입
        Add_Point(Mnum, Point); //회원에게 포인트 돌려줌
        Reduce_Schedule(Name,Date,mem); //스케줄에서 예매자수 감소
        Reduce_Movie(Name,mem); //영화에서 예매자수 감소
        alert(Cash+"원이 반환되었습니다."); //반환 완료 알림
    })
})