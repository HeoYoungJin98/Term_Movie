<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%
    request.setCharacterEncoding("utf-8");

    int Type = Integer.parseInt(request.getParameter("Type"));
    int Mnum = Integer.parseInt(request.getParameter("Mnum"));
    ResultSet rs = null;
    Statement stmt = null;
    String[] str;
    int i = 0;
    int r = 0;
    int size = 0;
    String sql = null;

    try{
        if(Type == 1 || Type == 4){ //영화 예매 내역
            sql = "SELECT L.예매번호, L.관람영화, T.영화관이름, L.관람일시, L.관람인원, L.현금결제금액, L.포인트결제금액, L.총결제금액, L.예매시각 FROM 영화관 T, 영화예매내역 L WHERE L.관람영화관_상영관 = T.영화관번호 AND L.회원번호 = "+Mnum+" AND L.취소시각 IS NULL AND L.관람일시 >= CURRENT_DATE ORDER BY L.예매시각 DESC";
        }else if(Type == 2){ //예매 취소 내역
            sql = "SELECT L.예매번호, L.관람영화, T.영화관이름, L.관람일시, L.관람인원, L.현금결제금액, L.포인트결제금액, L.총결제금액, L.취소시각 FROM 영화관 T, 영화예매내역 L WHERE L.관람영화관_상영관 = T.영화관번호 AND L.회원번호 = "+Mnum+" AND L.취소시각 IS NOT NULL ORDER BY L.취소시각 DESC";
        }else if(Type == 3){ //영화 관람 내역
            sql = "SELECT L.예매번호, L.관람영화, T.영화관이름, L.관람일시, L.관람인원, L.현금결제금액, L.포인트결제금액, L.총결제금액, L.관람일시 FROM 영화관 T, 영화예매내역 L WHERE L.관람영화관_상영관 = T.영화관번호 AND L.회원번호 = "+Mnum+" AND L.취소시각 IS NULL AND L.관람일시 <= CURRENT_DATE ORDER BY L.관람일시 DESC";
        }
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        rs = stmt.executeQuery(sql);

        rs.last(); //불러온 ReslutSet의 크기를 알기위함
        size = rs.getRow(); //불러온 ReslutSet의 행의 개수만큼 저장       
        str = new String[size*9]; //ResultSet의 크기만큼 배열 선언 행의개수 * 열의 개수(영화의 열의 개수는 7개)

        rs.beforeFirst();
        while(rs.next()){
            for(i=0; i<=8; i++){
                str[r*9+i] = rs.getString(i+1); //ResultSet의 인덱스를 배열에 할당 ResultSet은 인덱스가 0이 아닌 1부터 시작하기에 +1
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