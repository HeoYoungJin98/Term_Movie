<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //상세 정보 보기
    request.setCharacterEncoding("utf-8");

    String Name = request.getParameter("Name"); //영화 이름
    int Now = Integer.parseInt(request.getParameter("Now")); //현재 선택한 타입. 상영중인지 예정인지
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int size = 0;
    String sql = null;

    try{
        if(Now == 1){ //상영중인 영화의 상세 정보
            sql = "SELECT 영화.영화이름, 영화.장르, 영화.개봉일, 영화.감독, 영화.출연자, 영화.총상영시간, 영화.관람등급정보, 개별상세정보_상영중.예매자수, 개별상세정보_상영중.누적관객수 FROM 영화, 개별상세정보_상영중 WHERE 개봉일 >= (CURRENT_DATE -7)  AND CURRENT_DATE >= 개봉일  AND 영화.영화이름 = 개별상세정보_상영중.영화이름 AND 영화.영화이름 = '"+Name+"'"; //상영중인 영화의 상세정보
        }else{ //상영 예정 영화의 상세 정보
            sql = "SELECT 영화.영화이름, 영화.장르, 영화.개봉일, 영화.감독, 영화.출연자, 영화.총상영시간, 영화.관람등급정보, 개별상세정보_예정.예매자수 FROM 영화, 개별상세정보_예정 WHERE 개봉일 > CURRENT_DATE AND 영화.영화이름 = 개별상세정보_예정.영화이름 AND 영화.영화이름 = '"+Name+"'"; //상영 예정 영화의 상세정보
        }
        
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //불러온 ReslutSet의 크기를 알기위함
        size = rs.getRow(); //불러온 ReslutSet의 행의 개수만큼 저장       
        str = new String[size*9]; //ResultSet의 크기만큼 배열 선언 행의개수 * 열의 개수(영화의 열의 개수는 7개)

        rs.beforeFirst();
        while(rs.next()){
            if(Now == 1){
                for(i=0; i<=8; i++){
                    str[i] = rs.getString(i+1); //ResultSet의 인덱스를 배열에 할당 ResultSet은 인덱스가 0이 아닌 1부터 시작하기에 +1
                }
            }else{
                for(i=0; i<=7; i++){
                    str[i] = rs.getString(i+1);
                }
            }
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