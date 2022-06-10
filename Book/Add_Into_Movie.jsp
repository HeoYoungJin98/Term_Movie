<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //개별상세정보_상영중 테이블의 영화에 예매자수를 더함
    String Movie = request.getParameter("Movie"); //Movie 값 받아와 저장
    int mem = Integer.parseInt(request.getParameter("Mem")); //인원수 받아와 저장

    Statement stmt = null;
    String sql = null;

    try{
        sql = "Update 개별상세정보_상영중 SET 예매자수 = 예매자수 + "+mem+" WHERE 영화이름 = '"+Movie+"'";
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