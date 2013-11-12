package org.wakanda.debuggerchrome;

import java.io.IOException;

import org.apache.commons.io.IOUtils;
import org.wakanda.wastudio.common.Utils;

public class Main {

	/**
	 * @param args
	 * @throws IOException 
	 * @throws InterruptedException 
	 */
	public static void main(String[] args) throws IOException, InterruptedException {
		// TODO Auto-generated method stub
		Process p = Runtime.getRuntime().exec("cmd /c for /f \"usebackq tokens=5\" %i in (`\"netstat -aon | findstr \"0.0:8080\"\"`) do @wmic PROCESS get ProcessId | findstr \"%i\"");
		
		 
        String result = IOUtils.toString(p.getInputStream());
        System.out.println(result);

      Process  p2=Runtime.getRuntime().exec("cmd /c taskkill /F /im "+result);
       p2.waitFor();

	}

}
