<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%
    request.setCharacterEncoding("utf-8");

    int Order = Integer.parseInt(request.getParameter("Order"));
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int r = 0;
    int size = 0;
    String sql = null;

    try{
        if(Order == 1){ //1= 개봉일 오름차순 2= 예매자 수 내림차순 3= 개봉 예정 영화 개봉일 오름차순 4= 개봉 예정 영화 예매자 수 내림차순
            sql = "SELECT 영화.영화이름, 영화.장르, 영화.개봉일, 영화.감독, 영화.출연자, 영화.총상영시간, 영화.관람등급정보, RANK() OVER (ORDER BY 개별상세정보_상영중.예매자수 DESC) FROM 영화, 개별상세정보_상영중 WHERE 개봉일 >= (CURRENT_DATE -7)  AND CURRENT_DATE >= 개봉일  AND 영화.영화이름 = 개별상세정보_상영중.영화이름 ORDER BY 개봉일 ASC"; //상영중인 영화를 검색하는 SQL문
        }else if(Order == 2){
            sql = "SELECT 영화.영화이름, 영화.장르, 영화.개봉일, 영화.감독, 영화.출연자, 영화.총상영시간, 영화.관람등급정보, RANK() OVER (ORDER BY 개별상세정보_상영중.예매자수 DESC) FROM 영화, 개별상세정보_상영중 WHERE 개봉일 >= (CURRENT_DATE -7)  AND CURRENT_DATE >= 개봉일  AND 영화.영화이름 = 개별상세정보_상영중.영화이름";
        }else if(Order == 3){
            sql = "SELECT 영화.영화이름, 영화.장르, 영화.개봉일, 영화.감독, 영화.출연자, 영화.총상영시간, 영화.관람등급정보, RANK() OVER (ORDER BY 개별상세정보_예정.예매자수 DESC) FROM 영화, 개별상세정보_예정 WHERE 개봉일 > CURRENT_DATE AND 영화.영화이름 = 개별상세정보_예정.영화이름 ORDER BY 개봉일 ASC";
        }else{
            sql = "SELECT 영화.영화이름, 영화.장르, 영화.개봉일, 영화.감독, 영화.출연자, 영화.총상영시간, 영화.관람등급정보, RANK() OVER (ORDER BY 개별상세정보_예정.예매자수 DESC) FROM 영화, 개별상세정보_예정 WHERE 개봉일 > CURRENT_DATE AND 영화.영화이름 = 개별상세정보_예정.영화이름";
        }
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //불러온 ReslutSet의 크기를 알기위함
        size = rs.getRow(); //불러온 ReslutSet의 행의 개수만큼 저장       
        str = new String[size*8]; //ResultSet의 크기만큼 배열 선언 행의개수 * 열의 개수(영화의 열의 개수는 7개)

        rs.beforeFirst();
        while(rs.next()){
            for(i=0; i<=7; i++){
                str[r*8+i] = rs.getString(i+1); //ResultSet의 인덱스를 배열에 할당 ResultSet은 인덱스가 0이 아닌 1부터 시작하기에 +1
            }
            r++;
        }

        out.println(Arrays.toString(str)); //Arrays.toString(str)
    }catch(SQLException ex){
        out.println("SQLException: " + ex.getMessage());
    }finally{
        if(rs!=null)
            rs.close();
        if(stmt!=null)
            stmt.close();
        if(conn!=null)
            conn.close();
    }
%>