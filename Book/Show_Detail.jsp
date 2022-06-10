<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //상영관 타입을 포함한 정보를 가져옴
    request.setCharacterEncoding("utf-8");

    String Name = request.getParameter("Name"); //영화 이름
    int Theater = Integer.parseInt(request.getParameter("Theater")); //극장 번호
    String Date = request.getParameter("Date"); //상영 시간
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int r = 0;
    int size = 0;
    String sql = null;

    try{
        sql = "SELECT 스케줄.상영관번호 , 스케줄.시작시간 , (상영관.총좌석수-스케줄.예매자수), 상영관.상영관타입 FROM 상영관, 스케줄 WHERE 상영관.상영관번호 = 스케줄.상영관번호 AND 상영관.영화관번호 = "+Theater+" AND 스케줄.영화이름 = '"+Name+"' AND TO_CHAR(스케줄.시작시간,'yyyy-mm-dd')='"+Date+"'";
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //불러온 ReslutSet의 크기를 알기위해 포인터를 제일 뒤로 이동
        size = rs.getRow(); //불러온 ReslutSet의 행의 개수만큼 저장       
        str = new String[size*4]; //ResultSet의 크기만큼 배열 선언 행의개수 * 열의 개수

        rs.beforeFirst(); //결과를 처음부터 저장하기 위해 포인터를 제일 앞으로 이동
        while(rs.next()){
            for(i=0; i<=3; i++){//결과가 4개이므로 4번 반복
                str[r*4+i] = rs.getString(i+1); //ResultSet의 인덱스를 배열에 할당 ResultSet은 인덱스가 0이 아닌 1부터 시작하기에 +1
            }
            r++;
        }

        out.println(Arrays.toString(str)); //배열을 문자열 형태로 반환하여 결과를 보냄
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