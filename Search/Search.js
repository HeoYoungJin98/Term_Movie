$(document).ready(function(){
    function CreateTable(array){ //테이블을 만드는 함수
        let test = array
        test=test.replace("[","");
        test=test.replace("]","");
        const arr = test.split(","); //,단위로 문장 split

        console.log(arr);
    }
    

    $("#Select_Showing").on("click",function(){ //상영중인 영화 클릭
        $.post(
            "../Search/Showing.jsp",//jsp파일에 정보 전달
            {
                Order: 1,
            },
            function(Result){//callback
                CreateTable(Result);
            }
        )
    })

    $("input[name=Order]").on("click",function(){
        let val = $(this).val();
        $.post(
            "../Search/Showing.jsp",
            {
                Order: val,
            },
            function(Result){
                CreateTable(Result);
            }
        )
    })

    $("#Select_Upcoming").on("click",function(){ //개봉 예정 영화 클릭

    })

    $("#Search_btn").on("click",function(){ //검색 버튼 클릭 이벤트
        
    })
})