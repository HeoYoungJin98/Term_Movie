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
        test=test.replaceAll("\n","");
        const arr = test.split(","); //,단위로 문장 split
        let Row = arr.length / 8;
        let r = 0;
        while(r < Row){
            let Create_Tr = document.createElement("tr");
            let div = document.getElementById("Result_Part");
            div.appendChild(Create_Tr);
            arr[r*8] = arr[r*8].trim(); //영화 제목에 줄바꿈이 포함돼서 돌아옴. 줄바꿈 제거
            arr[r*8+7] = arr[r*8+7].trim(); //마지막에 줄바꿈이 포함돼서 돌아옴. 줄바꿈 제거
            for(let i = 0; i<8; i++){
                let Create_Td = document.createElement("td");
                let Text = document.createTextNode(arr[r*8+i]);
                if(i == 0){
                    let Create_link = document.createElement("button");
                    Create_link.setAttribute("Class","Name_btn");
                    Create_link.appendChild(Text);
                    Create_Td.appendChild(Create_link);
                }else{
                    Create_Td.appendChild(Text);
                }
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

    $(document).on("click",".Name_btn",function(){ //영화 이름 클릭시 이벤트, 개별 상세 정보 제공
        let Name = this.firstChild.nodeValue;
        let now = $("input[name=Select]:checked").val(); //상영중인 영화를 보고 있는지 개봉 예정 영화를 보고 있는지 체크
        $.post(
            "Show_detail.jsp",
            {
                Name: Name,
                Now: now,
            },
            function(Result){
                let test = Result;
                test=test.replace("[","");
                test=test.replace("]","");
                test=test.replaceAll("\n","");
                const arr = test.split(","); //,단위로 문장 split
                arr[0] = arr[0].trim();
                arr[8] = arr[8].trim();
                alert("상세정보\n영화 이름: " + arr[0] + "\n장르: " + arr[1] + "\n개봉일: " + arr[2] + "\n감독: " + arr[3] + "\n출연자: " + arr[4] + "\n총 상영시간: " + arr[5] + "분\n관람등급정보: " + arr[6] + "\n예매자 수: " + arr[7] + "명\n누적관객수: " + arr[8]+ "명");
            }
        )
    })
})