<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //해당하는 스케줄에 예매자수를 더함
    String Movie = request.getParameter("Movie"); //영화제목 받아와 저장
    int mem = Integer.parseInt(request.getParameter("Mem")); //인원수 받아와 저장
    String Time = request.getParameter("Time"); //영화 상영 시간 받아와 저장

    Statement stmt = null;
    String sql = null;

    try{
        sql = "Update 스케줄 SET 예매자수 = 예매자수 + "+mem+" WHERE 영화이름='"+Movie+"' AND TO_CHAR(시작시간, 'yyyy-mm-dd HH24:Mi:ss') = '"+Time+"'";
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