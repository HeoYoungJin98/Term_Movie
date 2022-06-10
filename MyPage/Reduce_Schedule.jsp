<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //스케줄에서 예매자 수를 줄임
    String Movie = request.getParameter("Movie"); //영화 이름 저장
    int mem = Integer.parseInt(request.getParameter("Mem")); //줄일 회원 수 저장
    String Time = request.getParameter("Time"); //줄일 스케줄의 상영 시간

    Statement stmt = null;
    String sql = null;

    try{
        sql = "Update 스케줄 SET 예매자수 = 예매자수 - "+mem+" WHERE 영화이름='"+Movie+"' AND TO_CHAR(시작시간, 'yyyy-mm-dd HH24:Mi:ss') = '"+Time+"'";
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