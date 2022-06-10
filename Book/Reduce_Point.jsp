<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //포인트를 사용한 결제 시 회원의 보유한 포인트 차감
    int Mnum = Integer.parseInt(request.getParameter("Mnum")); //회원 번호
    int Point = Integer.parseInt(request.getParameter("Point")); //사용한 포인트

    Statement stmt = null;
    String sql = null;

    try{
        sql = "Update 회원 SET 포인트 = 포인트 - "+Point+" WHERE 회원번호 = "+Mnum+"";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        stmt.executeUpdate(sql);
    }catch(SQLException ex){
        out.println("SQLException: " + ex.getMessage());
    }finally{
        if(stmt!=null)
            stmt.close();
        if(conn!=null)
            conn.close();
    }
    %>