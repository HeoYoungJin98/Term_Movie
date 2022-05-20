<%@ page import="java.sql.*" %>
<%
  Connection conn = null;

  String url = "jdbc:oracle:thin:@db202203041250_high?TNS_ADMIN=/Users/YoungJin/Desktop/Wallet_DB202203041250/";
  String user = "ADMIN";
  String password = "Baechu143@@00";

  Class.forName("oracle.jdbc.OracleDriver");
  conn = DriverManager.getConnection(url, user, password);

  %>
