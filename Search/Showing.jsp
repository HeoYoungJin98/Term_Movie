<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%
    request.setCharacterEncoding("utf-8");

    int Order = request.getParameter("Order");
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int r = 0;
    int size = 0;

    try{
        if(Order == 1){ //1이면 개봉일 오름차순 2이면 예매순위 오름차순
            String sql = "SELECT * FROM 영화 WHERE 개봉일 >= (SYSDATE -7) AND SYSDATE >= 개봉일 ORDER BY 개봉일 ASC"; //상영중인 영화를 검색하는 SQL문
        }
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //불러온 ReslutSet의 크기를 알기위함
        size = rs.getRow(); //불러온 ReslutSet의 행의 개수만큼 저장       
        str = new String[size*7]; //ResultSet의 크기만큼 배열 선언 행의개수 * 열의 개수(영화의 열의 개수는 7개)

        rs.beforeFirst();
        while(rs.next()){
            for(i=0; i<=6; i++){
                str[r*7+i] = rs.getString(i+1); //ResultSet의 인덱스를 배열에 할당 ResultSet은 인덱스가 0이 아닌 1부터 시작하기에 +1
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