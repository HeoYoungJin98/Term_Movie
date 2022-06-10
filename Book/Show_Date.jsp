<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //상영 날짜를 보여줌
    String Name = request.getParameter("Name"); //영화 이름
    int Theater = Integer.parseInt(request.getParameter("Theater")); //상영 극장
    ResultSet rs = null;
    Statement stmt = null;
    String[] str; //결과를 저장할 배열
    int i = 0;
    int size = 0;
    String sql = null;

    try{
        sql = "SELECT DISTINCT TO_CHAR(스케줄.시작시간,'yyyy-mm-dd') FROM 상영관, 스케줄 WHERE 상영관.상영관번호 = 스케줄.상영관번호 AND 상영관.영화관번호 = "+Theater+" AND 스케줄.영화이름 = '"+Name+"' AND 스케줄.시작시간 <= CURRENT_DATE + 7 AND 스케줄.시작시간 >= CURRENT_DATE + 20/(24*60)";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //resultSet의 크기를 알기 위해 pointer를 맨 뒤로 보냄
        size = rs.getRow(); //resultSet의 크기 받아오기
        str = new String[size]; //같은 크기의 배열 선언

        rs.beforeFirst(); //다시 결과를 처음부터 저장하기 위해 포인터를 제일 앞으로 가져옴
        while(rs.next()){
            str[i] = rs.getString(1); //배열에 저장
            i++;
        }
        out.println(Arrays.toString(str)); //배열의 결과를 문자열 형태로 반환하여 출력
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