package org.wakanda.debuggerchrome.savevideo;

import java.io.File;
import java.util.Date;

import org.wakanda.debuggerchrome.TemplateChromeDebuggerTests;

public class MainT {

	/**
	 * @param args
	 * @throws InterruptedException 
	 */
	@SuppressWarnings("deprecation")
	public static void main(String[] args) throws InterruptedException {

		// assumes the following: arg0 is input file and arg1 is output file
		String lien = "C:\\WorkspaceP4VVV\\depot\\Wakanda\\main\\Server\\Tests-v2\\remotetools\\debugger\\";
		String name = "1374946721525.mov";
		//aptureScreenToFile.doIT("D:\\DebuggerTests\\viddd.flv", 100);
		//CaptureThrad t=new CaptureThrad();
		String saveIn = "D:\\DebuggerTests\\vidddd.mp4";
		//SimpleCapture s=new SimpleCapture();
		//SimpleCapture.doIT(saveIn, 5);
//		t.start();
//		Thread.sleep(10000);
//		t.stop();
//		t.destroy();
		//12345
		TemplateChromeDebuggerTests.MyCapture  =  new CaptureThrad("D:\\videos\\xxx.flv",20);
		TemplateChromeDebuggerTests.MyCapture.setPriority(Thread.MAX_PRIORITY);
		
		TemplateChromeDebuggerTests.MyCapture.start();

//		ConvertVideo cv=new ConvertVideo(new File("D:\\videos\\breakpointsDisplayed.flv"),new File("D:\\videos\\breakpointsDisplayed.avi"));
//		cv.run();

	}

}
