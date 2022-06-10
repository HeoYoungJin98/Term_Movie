$(document).ready(function(){
    function Create_Table(Arr,value){
        let temp = Arr
        temp = temp.replace("[","");
        temp = temp.replace("]","");
        temp = temp.replaceAll("\n","");
        const array = temp.split(",");
        let Row = array.length / 9;
        let r = 0;
        let Name;
        while(r < Row){
            let Create_Tr = document.createElement("tr");
            let div = document.getElementById("Result_Part");
            div.appendChild(Create_Tr);
            for(let i = 0; i<9; i++){
                if(array[r*9+i].charAt(0) == " "){
                    array[r*9+i] = array[r*9+i].replace(" ","");
                }
                let Create_Td = document.createElement("td");
                if(i==8 && value == 4){
                        let btn = document.createElement("button");
                        btn.setAttribute("class","Cancel_btn");
                        btn.setAttribute("value", r+1);
                        let Text = document.createTextNode("취소하기");
                        btn.appendChild(Text);
                        Create_Td.appendChild(btn);
                        Create_Tr.appendChild(Create_Td);
                }else{
                    let Text = document.createTextNode(array[r*9+i]);
                    Create_Td.appendChild(Text);
                    Create_Tr.appendChild(Create_Td);
                }
            }
            r++;
        }
    }

    function Remove_List_Table(){
        let area = document.getElementById("Result_Part");
        while(area.hasChildNodes()){
            area.removeChild(area.firstChild);
        }
    }

    function Bring_List(value, Mnum){ //jsp에서 쿼리문 결과 받아오기
        let p = document.getElementById("Date");
        p.removeChild(p.firstChild);
        let Text;
        if(value == 1){ //영화 예매 내역
            Text = document.createTextNode("예매 일시");
        }else if(value == 2){ //예매 취소 내역
            Text = document.createTextNode("취소 일시");
        }else if(value == 3){ //영화 관람 내역
            Text = document.createTextNode("관람 일시");
        }else{
            Text = document.createTextNode("예매 취소");
        }
        p.appendChild(Text);
        $.post(
            "Bring_List.jsp",
            {
                Type: value,
                Mnum: Mnum,
            },
            function(Result){
                Remove_List_Table();
                Create_Table(Result, value)
            }
        )
    }

    function Cancel(Mnum, Movie, Date){
        $.post(
            "Cancel.jsp",
            {
                Mnum: Mnum,
                Movie: Movie,
                Date: Date,
            },
            function(Result){

            }
        )
    }

    function Add_Point(Mnum, Cash){
        $.post(
            "Add_Point.jsp",
            {
                Mnum: Mnum,
                Cash: Cash,
            },
            function(Result){

            }
        )
    }

    function Reduce_Schedule(Movie, Time, Mem){
        $.post(
            "Reduce_Schedule.jsp",
            {
                Movie: Movie,
                Time: Time,
                Mem: Mem,
            },
            function(Result){

            }
        )
    }

    function Reduce_Movie(Movie, Mem){
        $.post(
            "Reduce_Movie.jsp",
            {
                Movie: Movie,
                Mem: Mem,
            },
            function(Result){

            }
        )
    }


    const {name, Mnum} = JSON.parse(sessionStorage.getItem("user_info"));
    Bring_List(1, Mnum); //페이지 로딩이 끝나면 예매 내역 조회
    

    $("input[id^='List']").on("click",function(){
        let Click = $(this).val();
        Bring_List(Click, Mnum);
    })

    $(document).on("click",".Cancel_btn",function(){
        let r = $(this).val();
        let temp  = document.getElementsByTagName("td");
        let Name = temp[r*9+1].innerHTML;
        let Date = temp[r*9+3].innerHTML;
        let Cash = temp[r*9+5].innerHTML;
        let Point = temp[r*9+6].innerHTML;
        let mem = temp[r*9+4].innerHTML;

        Cancel(Mnum,Name,Date); //예매내역에 취소시각 기입
        Add_Point(Mnum, Point); //회원에게 포인트 돌려줌
        Reduce_Schedule(Name,Date,mem); //스케줄에서 예매자수 감소
        Reduce_Movie(Name,mem); //영화에서 예매자수 감소
        alert(Cash+"원이 반환되었습니다.");
    })
})