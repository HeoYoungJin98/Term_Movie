<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int size = 0;
    String sql = null;

    try{
        sql = "SELECT 영화관이름 FROM 영화관";
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