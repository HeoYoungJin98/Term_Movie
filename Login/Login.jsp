<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>

<%
    request.setCharacterEncoding("utf-8");

    String ID = request.getParameter("ID"); // 넘겨받은 ID값 저장
    String PWD = request.getParameter("PWD");

    ResultSet rs = null;
    Statement stmt = null;
    String result = null;

    try{
        String sql = "SELECT 이름 FROM 회원 WHERE 회원번호 = "+ID+" AND 비밀번호 = '"+PWD+"'";
        stmt = conn.createStatement();
        rs = stmt.executeQuery(sql);
        if(rs.next()){
            result = rs.getString("이름");
        }
        if(result != null){
            out.println(result);
        }
    }catch(SQLException ex){
        out.println("SQLException: "+ex.getMessage());
    }finally{
        if(rs!=null){
            rs.close();
        }
        if(stmt != null)
            stmt.close();
        if(conn != null)
            conn.close();
    }
    %>