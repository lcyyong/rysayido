/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package myapp;

import java.io.ByteArrayInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class IndexAction extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws IOException {
		  
	String fullName = (String)req.getParameter("fullName");
    System.out.println("----> get : " + fullName);
	
	resp.setContentType("text/plain");
    resp.getWriter().println("{ \"name\": "+fullName+" }");
  }
  
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp)
      throws IOException {
		  
	String fullName = (String)req.getParameter("fullName");
	String contactNo = (String)req.getParameter("contactNo");
	String guessOf = (String)req.getParameter("guessOf");
	String choiceMenu = (String)req.getParameter("choiceMenu");
	String partnersNoStr = (String)req.getParameter("partnersNo");
	
	String body = "";
	body += " \nFull Name : " + fullName;
	body += " \nContact No : " + contactNo;
	body += " \nGuess Of : " + guessOf;
	body += " \nMenu : " + choiceMenu;
	body += " \nPartner No : " + partnersNoStr;
	
	double partnersNo = 0;
	try {
		partnersNo = Double.parseDouble(partnersNoStr);
	}catch(Exception e) {
		e.printStackTrace();
	}
	
	for(int i=0; i<partnersNo; i++) {
		String pFullName = (String)req.getParameter("pFullName"+i);
		body += " \nPartner Name : " + pFullName;
	}
	
	resp.setContentType("text/plain");
    resp.getWriter().println("{ \"name\": \""+fullName+"\" }");
    
    String type = (String)req.getParameter("type");
    if (type != null && type.equals("multipart")) {
      resp.getWriter().print("Sending HTML email with attachment.");
      sendMultipartMail();
    } else {
      resp.getWriter().print("Sending simple email.");
      sendSimpleMail(body);
    }
  }

  private void sendSimpleMail(String body) {
    // [START simple_example]
    Properties props = new Properties();
    Session session = Session.getDefaultInstance(props, null);

    try {
      Message msg = new MimeMessage(session);
      msg.setFrom(new InternetAddress("lcyyong2@gmail.com"));
      msg.addRecipient(Message.RecipientType.TO,
                       new InternetAddress("ruiyongloveee@hotmail.com", "Hi RY"));
      msg.setSubject("Got new Participant!");
      msg.setText(body);
      Transport.send(msg);
      System.out.println("Successfull Delivery.");
    } catch (AddressException e) {
      // ...
    	System.out.println("====>>>error : " + e.getMessage());
    	e.printStackTrace();
    } catch (MessagingException e) {
      // ...
    	System.out.println("====>>>error : " + e.getMessage());
    	e.printStackTrace();
    } catch (UnsupportedEncodingException e) {
      // ...
    	System.out.println("====>>>error : " + e.getMessage());
    	e.printStackTrace();
    }
    // [END simple_example]
  }

  private void sendMultipartMail() {
    Properties props = new Properties();
    Session session = Session.getDefaultInstance(props, null);

    String msgBody = "...";

    try {
      Message msg = new MimeMessage(session);
      msg.setFrom(new InternetAddress("lcyyong2@gmail.com"));
      msg.addRecipient(Message.RecipientType.TO,
                       new InternetAddress("ruiyongloveee@hotmail.com", "Hi RY"));
      msg.setSubject("Got new Participant with Attachment!");
      msg.setText(msgBody);

      // [START multipart_example]
      String htmlBody = "";          // ...
      byte[] attachmentData = null;  // ...
      Multipart mp = new MimeMultipart();

      MimeBodyPart htmlPart = new MimeBodyPart();
      htmlPart.setContent(htmlBody, "text/html");
      mp.addBodyPart(htmlPart);

      MimeBodyPart attachment = new MimeBodyPart();
      InputStream attachmentDataStream = new ByteArrayInputStream(attachmentData);
      attachment.setFileName("manual.pdf");
      attachment.setContent(attachmentDataStream, "application/pdf");
      mp.addBodyPart(attachment);

      msg.setContent(mp);
      // [END multipart_example]

      Transport.send(msg);

    } catch (AddressException e) {
      // ...
    } catch (MessagingException e) {
      // ...
    } catch (UnsupportedEncodingException e) {
      // ...
    }
  }
   
}
