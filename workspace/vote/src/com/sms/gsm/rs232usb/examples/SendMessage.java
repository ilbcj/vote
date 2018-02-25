// SendMessage.java - Sample application.
//
// This application shows you the basic procedure for sending messages.
// You will find how to send synchronous and asynchronous messages.
//
// For asynchronous dispatch, the example application sets a callback
// notification, to see what's happened with messages.

package com.sms.gsm.rs232usb.examples;

import org.smslib.IOutboundMessageNotification;
import org.smslib.Library;
import org.smslib.OutboundMessage;
import org.smslib.Service;
import org.smslib.Message.MessageEncodings;
import org.smslib.modem.SerialModemGateway;

public class SendMessage
{
	public void doIt() throws Exception
	{
		Service srv;
		OutboundMessage msg;
		OutboundNotification outboundNotification = new OutboundNotification();
		System.out.println("Example: Send message from a serial gsm modem.");
		System.out.println(Library.getLibraryDescription());
		System.out.println("Version: " + Library.getLibraryVersion());
		srv = new Service();
		
		SerialModemGateway gateway = new SerialModemGateway("modem.com5", "COM5", 9600, "SIMENES", "17254");
		gateway.setInbound(true);
		gateway.setOutbound(true);
		gateway.setSimPin("0000");
		gateway.setOutboundNotification(outboundNotification);
		srv.addGateway(gateway);
		srv.startService();
		System.out.println("Modem Information:");
		System.out.println("  Manufacturer: " + gateway.getManufacturer());
		System.out.println("  Model: " + gateway.getModel());
		System.out.println("  Serial No: " + gateway.getSerialNo());
		System.out.println("  SIM IMSI: " + gateway.getImsi());
		System.out.println("  Signal Level: " + gateway.getSignalLevel() + "%");
		System.out.println("  Battery Level: " + gateway.getBatteryLevel() + "%");
		System.out.println();
		// Send a message synchronously.
		
		msg = new OutboundMessage("10478968754", "评标通知：舒征，请您于2016年04月20日14时30分到长春市政府集合参加评标，如能准时参加回复1，本短信在100分钟内回复有效。");
		msg.setEncoding(MessageEncodings.ENCUCS2);
		boolean test = srv.sendMessage(msg);
		System.out.println("boolean:" + test);
		System.out.println(msg);
		
		msg = new OutboundMessage("23488789644", "连续发送：第二条：评标通知：舒征，请您于2016年04月20日14时30分到长春市政府集合参加评标，如能准时参加回复1，本短信在100分钟内回复有效。");
		msg.setEncoding(MessageEncodings.ENCUCS2);
		test = srv.sendMessage(msg);
		System.out.println("boolean:" + test);
		System.out.println(msg);
		
		msg = new OutboundMessage("138123456789", "测试短信：[通知：xxxx，请您于2016年04月20日14时30分到xxxxxxxx参加同学聚会，如能准时参加回复1，本短信在100分钟内回复有效。]");
		msg.setEncoding(MessageEncodings.ENCUCS2);
		test = srv.sendMessage(msg);
		System.out.println("boolean:" + test);
		System.out.println(msg);
		
		System.out.println("Now Sleeping - Hit <enter> to terminate.");
//		System.in.read();
		srv.stopService();
	}

	public class OutboundNotification implements IOutboundMessageNotification
	{
		public void process(String gatewayId, OutboundMessage msg)
		{
			System.out.println("Outbound handler called from Gateway: " + gatewayId);
			System.out.println(msg);
		}
	}

	public static void main(String args[])
	{
		SendMessage app = new SendMessage();
		try
		{
			app.doIt();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
}
