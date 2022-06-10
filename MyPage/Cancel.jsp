<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //예매 취소
    int Mnum = Integer.parseInt(request.getParameter("Mnum")); //회원 번호
    String Movie = request.getParameter("Movie"); //취소할 영화 이름
    String Date = request.getParameter("Date"); //취소할 시간

    Statement stmt = null;
    String sql = null;

    try{
        sql = "Update 영화예매내역 SET 취소시각 = CURRENT_DATE WHERE 관람영화 = '"+Movie+"' AND TO_CHAR(관람일시,'yyyy-mm-dd HH24:Mi:ss') = '"+Date+"' AND 회원번호 = "+Mnum+"";
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