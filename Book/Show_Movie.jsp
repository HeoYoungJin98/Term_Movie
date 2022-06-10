<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //상영중인 영화 이름 받아오기
    int Theater = Integer.parseInt(request.getParameter("Theater")); //극장 번호
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int size = 0;
    String sql = null;

    try{
        sql = "SELECT DISTINCT 스케줄.영화이름 FROM 영화관, 상영관, 스케줄 WHERE 영화관.영화관번호 = "+Theater+" AND 영화관.영화관번호  = 상영관.영화관번호 AND 상영관.상영관번호 = 스케줄.상영관번호 AND 스케줄.시작시간 <= CURRENT_DATE + 7 AND 스케줄.시작시간 >= CURRENT_DATE + 20/(24*60)";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //resultSet의 크기를 알기 위해 포인터를 제일 끝으로 이동
        size = rs.getRow(); //ResultSet의 크기를 size에 저장
        str = new String[size]; //같은 크기의 배열 선언

        rs.beforeFirst(); //결과를 처음부터 저장하기 위함
        while(rs.next()){
            str[i] = rs.getString(1); //SQL문에서 SELECT 결과의 속성은 영화이름 하나기에 getString(1)
            i++;
        }
        out.println(Arrays.toString(str)); //결과 문자열 형태로 보냄
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