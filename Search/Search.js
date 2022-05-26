$(document).ready(function(){
    //-------------------------functions------------------------------
    function ShowResult(i){ //상영중인 영화 검색 결과를 보여주는 함수
        $.post(
            "../Search/Showing.jsp",//jsp파일에 정보 전달
            {
                Order: i,
            },
            function(Result){//callback
                RemoveAllChild(); //결과를 보여줄 곳에 있는 값들 제거
                CreateTable(Result); //결과에 따라 테이블 생성
            }
        )
    }

    function CreateTable(array){ //테이블을 만드는 함수
        let test = array
        test=test.replace("[","");
        test=test.replace("]","");
        const arr = test.split(","); //,단위로 문장 split
        console.log(test);
        let Row = arr.length / 8;
        let r = 0;
        while(r < Row){
            let Create_Tr = document.createElement("tr");
            let div = document.getElementById("Result_Part");
            div.appendChild(Create_Tr);
            for(let i = 0; i<8; i++){
                let Create_Td = document.createElement("td");
                let Text = document.createTextNode(arr[r*8+i]);
                Create_Td.appendChild(Text);
                Create_Tr.appendChild(Create_Td);
            }
            r++
        }
    }

    function RemoveAllChild(){ //자식노드를 전부 지우는 함수. 검색 결과값 refresh 위함
        let area = document.getElementById("Result_Part");
        while(area.hasChildNodes()){
            area.removeChild(area.firstChild);
        }
    }

    //-------------------------PageLoad----------------------------
    ShowResult(1); //페이지 로딩이 끝나면 상영중인 영화를 개봉일 오름차순으로 기본 표시

    //-------------------------Events------------------------------
    $("#Select_Showing").on("click",function(){ //상영중인 영화 클릭
        ShowResult(1); //정렬방식 1로 검색 결과값 생성. 정렬방식 1은 개봉일 오름차순
    })

    $("input[name=Order]").on("click",function(){ //정렬 방식 클릭
        let now = $("input[name=Select]:checked").val(); //상영중인 영화를 보고 있는지 개봉 예정 영화를 보고 있는지 체크
        let val = $(this).val(); //정렬 방식에 해당하는 값 가져옴
        
        if(now == 1 && val ==1){ //상영중인 영화의 개봉일 오름차순
            ShowResult(1); 
        }else if(now == 1 && val == 2){ //상영중인 영화의 예매자 수 내림차순
            ShowResult(2);
        }else if(now == 2 && val == 1){ //상영 예정 영화의 개봉일 오름차순
            ShowResult(3);
        }else{
            ShowResult(4);
        }
    })

    $("#Select_Upcoming").on("click",function(){ //개봉 예정 영화 클릭
        ShowResult(3);
    })

    $("#Search_btn").on("click",function(){ //검색 버튼 클릭 이벤트
        
    })
})