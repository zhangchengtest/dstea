<%@page contentType="text/html;charset=utf-8" %>
<%@taglib uri="/struts-tags" prefix="s" %>
<%@taglib uri="/WEB-INF/tiles-jsp.tld" prefix="tiles"%>

<table>

　　<tr><td><tiles:insertAttribute name="header"></tiles:insertAttribute></td></tr>

　　<tr><td><tiles:insertAttribute name="content"></tiles:insertAttribute></td></tr>

　　<tr><td><tiles:insertAttribute name="footer"></tiles:insertAttribute></td></tr>

</table>

