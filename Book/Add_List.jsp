<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../Conn/dbconn.jsp" %>
<%@ page import="java.util.Arrays" %>

<%  //영화 예매 내역에 칼럼 추가
    int Mnum = Integer.parseInt(request.getParameter("Mnum")); //회원 번호 받아와 저장
    String Movie = request.getParameter("Movie"); //영화 이름 받아와 저장
    int Theater = Integer.parseInt(request.getParameter("Theater")); //극장 번호 받아와 저장
    String Time = request.getParameter("Time"); //상영 시간 받아와 저장
    int mem = Integer.parseInt(request.getParameter("Mem")); //인원수 받아와 저장
    int Cash = Integer.parseInt(request.getParameter("Cash")); //현금 결제 금액
    int Point = Integer.parseInt(request.getParameter("Point")); //포인트 결제 금액
    int Total = Integer.parseInt(request.getParameter("Total")); //총 결제 금액

    Statement stmt = null;
    String sql = null;

    try{
        sql = "INSERT INTO 영화예매내역 VALUES (영화예매내역_SEQ.NEXTVAL,'"+Movie+"','"+Theater+"',TO_DATE('"+Time+"','yyyy-mm-dd HH24:Mi:ss'), "+mem+", "+Cash+", "+Point+", "+Total+", CURRENT_DATE, NULL, "+Mnum+")";
        //영화 예매 내역_SEQ.NEXTVAL은 예매 번호를 Auto Increment 하기 위함.
        stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        stmt.executeUpdate(sql);
    }catch(SQLException ex){
        out.println("SQLException: " + ex.getMessage());
    }finally{
        if(stmt!=null)
            stmt.close();
        if(conn!=null)
            conn.close();
    }
    %>