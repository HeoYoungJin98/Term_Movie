<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%
    int Mnum = Integer.parseInt(request.getParameter("Mnum"));
    String Movie = request.getParameter("Movie");
    int Theater = Integer.parseInt(request.getParameter("Theater"));
    String Time = request.getParameter("Time");
    int mem = Integer.parseInt(request.getParameter("Mem"));
    int Cash = Integer.parseInt(request.getParameter("Cash"));
    int Point = Integer.parseInt(request.getParameter("Point"));
    int Total = Integer.parseInt(request.getParameter("Total"));

    Statement stmt = null;
    String sql = null;

    try{
        sql = "INSERT INTO 영화예매내역 VALUES (영화예매내역_SEQ.NEXTVAL,'"+Movie+"','"+Theater+"',TO_DATE('"+Time+"','yyyy-mm-dd HH:Mi:ss'), "+Mem+", "+Cash+", "+Point+", "+Total+", SYSDATE, NULL)";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        stmt.executeUpdate(sql);
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