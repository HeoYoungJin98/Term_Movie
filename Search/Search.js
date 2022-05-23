$(document).ready(function(){
    

    $("#Select_Showing").on("click",function(){ //상영중인 영화 클릭
        $.post(
            "../Search/Showing.jsp",//jsp파일에 정보 전달
            {

            },//전달할 데이터 없음.
            function(Result){//callback
                Create_Table_Head();
            }
        )
    })

    $("#Select_Upcoming").on("click",function(){ //개봉 예정 영화 클릭

    })

    $("#Search_btn").on("click",function(){ //검색 버튼 클릭 이벤트
        
    })
})