<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%
    String Name = request.getParameter("Name");
    int Theater = Integer.parseInt(request.getParameter("Theater"));
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int size = 0;
    String sql = null;

    try{
        sql = "SELECT DISTINCT TO_CHAR(스케줄.시작시간,'yyyy-mm-dd') FROM 상영관, 스케줄 WHERE 상영관.상영관번호 = 스케줄.상영관번호 AND 상영관.영화관번호 = "+Theater+" AND 스케줄.영화이름 = '"+Name+"' AND 스케줄.시작시간 <= SYSDATE + 7 AND 스케줄.시작시간 >= SYSDATE";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last();
        size = rs.getRow();
        str = new String[size];

        rs.beforeFirst();
        while(rs.next()){
            str[i] = rs.getString(1);
            i++;
        }
        out.println(Arrays.toString(str));
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