$(document).ready(function(){
    function Get_Theater(){
        $.post(
            "Get_theater.jsp",
            {

            },
            function(Result){
                let test = Result;
                test = test.replace("[","");
                test = test.replace("]","");
                test = test.replaceAll("\n","");
                test = test.replaceAll(" ","");
                const arr = test.split(",");
                let create_li = document.createElement("li");
                
            }
        )
    }

    Get_Theater();
})