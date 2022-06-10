<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //현제 보유중인 포인트 정보 받아오기
    int Mnum = Integer.parseInt(request.getParameter("Mnum")); //회원 번호
    ResultSet rs = null;
    Statement stmt = null;
    String sql = null;

    try{
        sql = "SELECT 포인트 FROM 회원 WHERE 회원번호 = "+Mnum+"";
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