<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //선택한 스케줄이 상영되는 상영관의 타입 받아오기
    int Theater = Integer.parseInt(request.getParameter("Theater")); //극장 번호
    String Name = request.getParameter("Name"); //영화 이름
    String Time = request.getParameter("Time"); //상영 시간
    ResultSet rs = null;
    Statement stmt = null;
    String sql = null;

    try{
        sql = "SELECT 상영관.상영관타입  FROM 상영관, 스케줄, 영화관 WHERE 상영관.영화관번호 = 영화관.영화관번호  AND 스케줄.상영관번호 = 상영관.상영관번호  AND 영화관.영화관번호 = "+Theater+" AND 스케줄.영화이름 = '"+Name+"' AND TO_CHAR(스케줄.시작시간,'yyyy-mm-dd HH24:Mi:ss') = '"+Time+"'";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        while(rs.next()){
            out.println(rs.getString(1));
        }
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