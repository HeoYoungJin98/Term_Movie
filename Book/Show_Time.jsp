<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //상영 스케줄에서 시간을 가져옴
    String Name = request.getParameter("Name"); //영화 이름
    int Theater = Integer.parseInt(request.getParameter("Theater")); //극장 번호
    String Date = request.getParameter("Date"); //상영 날짜
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int size = 0;
    String sql = null;

    try{
        sql = "SELECT 스케줄.시작시간 FROM 상영관, 스케줄 WHERE 상영관.상영관번호 = 스케줄.상영관번호 AND 상영관.영화관번호 = "+Theater+" AND 스케줄.영화이름 = '"+Name+"' AND TO_CHAR(스케줄.시작시간,'yyyy-mm-dd')='"+Date+"'";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //ResultSet의 크기를 알기 위해 포인터를 제일 뒤로 보냄
        size = rs.getRow(); //크기를 size에 저장
        str = new String[size]; //같은 크기의 배열 선언

        rs.beforeFirst(); //처음부터 값을 집어넣기 위해 포인터를 제일 앞으로 이동
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