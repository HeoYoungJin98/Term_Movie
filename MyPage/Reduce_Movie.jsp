<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //영화의 예매자수를 줄임 
    String Movie = request.getParameter("Movie"); //영화 제목
    int mem = Integer.parseInt(request.getParameter("Mem")); //줄일 예매자 수

    Statement stmt = null;
    String sql = null;

    try{
        sql = "Update 개별상세정보_상영중 SET 예매자수 = 예매자수 - "+mem+" WHERE 영화이름 = '"+Movie+"'";
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