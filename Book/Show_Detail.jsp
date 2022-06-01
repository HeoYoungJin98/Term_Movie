<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%
    request.setCharacterEncoding("utf-8");

    String Name = request.getParameter("Name");
    int Theater = Integer.parseInt(request.getParameter("Theater"));
    String Date = request.getParameter("Date");
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int r = 0;
    int size = 0;
    String sql = null;

    try{
        sql = "SELECT 스케줄.상영관번호 , 스케줄.시작시간 , (상영관.총좌석수-스케줄.예매자수) FROM 상영관, 스케줄 WHERE 상영관.상영관번호 = 스케줄.상영관번호 AND 상영관.영화관번호 = "+Theater+" AND 스케줄.영화이름 = '"+Name+"' AND TO_CHAR(스케줄.시작시간,'yyyy-mm-dd')='"+Date+"'";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //불러온 ReslutSet의 크기를 알기위함
        size = rs.getRow(); //불러온 ReslutSet의 행의 개수만큼 저장       
        str = new String[size*3]; //ResultSet의 크기만큼 배열 선언 행의개수 * 열의 개수

        rs.beforeFirst();
        while(rs.next()){
            for(i=0; i<=2; i++){
                str[r*3+i] = rs.getString(i+1); //ResultSet의 인덱스를 배열에 할당 ResultSet은 인덱스가 0이 아닌 1부터 시작하기에 +1
            }
            r++;
        }

        out.println(Arrays.toString(str)); //Arrays.toString(str)
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