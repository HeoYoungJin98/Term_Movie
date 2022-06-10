<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //상세정보보기를 눌렀을 때 누적 관객수 저장
    String Movie = request.getParameter("Name"); //영화이름

    Statement stmt = null;
    String sql = null;

    try{
        sql = "UPDATE 개별상세정보_상영중 M SET M.누적관객수 = (SELECT SUM(예매자수) FROM 스케줄 WHERE 시작시간 <= CURRENT_DATE AND 영화이름 = '"+Movie+"' GROUP BY 영화이름) WHERE M.영화이름 ='"+Movie+"'";
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