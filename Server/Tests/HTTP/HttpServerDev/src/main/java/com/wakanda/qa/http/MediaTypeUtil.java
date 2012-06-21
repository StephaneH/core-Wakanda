package com.wakanda.qa.http;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


/**
 * @author Ouissam
 * 
 */
public class MediaTypeUtil {

	//private static Logger logger = Logger.getLogger(MediaType.class);

	private final static char[] MULTIPART_CHARS = "-_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
			.toCharArray();

	public static void main(String[] args) throws Exception {
		getMimeTypesXMLFilePath();
	}

	static {

	}

	/**
	 * Returns a map of supported extensions with their corresponding media
	 * types.
	 * 
	 * @return
	 * @throws Exception
	 */
	public static Map<String, String> getMediaTypeMap() throws Exception {

		File mimeTypesFile = new File(getMimeTypesXMLFilePath());

		Map<String, String> map = new HashMap<String, String>();
		if (mimeTypesFile.exists()) {
			// Create a factory
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			// Use the factory to create a builder
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(mimeTypesFile);
			// Get a list of all elements in the document
			NodeList list = doc.getElementsByTagName("*");

			for (int i = 2; i < list.getLength(); i++) {
				Element element = (Element) list.item(i);

				String contentType = element.getAttribute("contentType");
				String[] extensions = element.getAttribute("extensions").split(
						"\\s*;\\s*");
				for (int y = 0; y < extensions.length; y++) {
					String ext = extensions[y];
					if (!ext.equals(""))
						map.put(extensions[y], contentType);
				}
			}

		} else {
			String message = "MediaType mapping file not found: "
					+ mimeTypesFile.getCanonicalPath();
			throw new Exception(message);
		}
		return map;

	}

	/**
	 * Sets all resources corresponding with different extensions in the web
	 * folder of the solution.
	 * 
	 * @throws Exception
	 */
	public static void setMediaTypeResources() throws Exception {

		for (Entry<String, String> entry : getMediaTypeMap().entrySet()) {
			String extension = entry.getKey();
			// String contentType = entry.getValue();
			String filePath = Resources.getMediaTypeFolder() + "/file."
					+ extension;
			File file = new File(filePath);
			if (!file.exists()) {
				file.createNewFile();
				//logger.debug("Created: " + filePath);
			}
		}

	}

	/**
	 * Remove all resources corresponding with different extensions in the web
	 * folder of the solution.
	 * 
	 * @throws Exception
	 */
	public static void removeMediaTypeResources() throws Exception {
		for (Entry<String, String> entry : getMediaTypeMap().entrySet()) {
			String extension = entry.getKey();
			// String contentType = entry.getValue();
			String filePath = Resources.getMediaTypeFolder() + "/file."
					+ extension;
			File file = new File(filePath);
			if (file.exists()) {
				file.delete();
				//logger.debug("Removed: " + filePath);
			}
		}

	}

	public static String generateBoundary() {
		StringBuilder buffer = new StringBuilder();
		Random rand = new Random();
		int count = rand.nextInt(11) + 30; // a random size from 30 to 40
		for (int i = 0; i < count; i++) {
			buffer.append(MULTIPART_CHARS[rand.nextInt(MULTIPART_CHARS.length)]);
		}
		return buffer.toString();
	}
	
	private static String getMimeTypesXMLFilePath() throws IOException{
		String path;
		String serverDirPath;
		String os = System.getProperty("os.name");
		String wakSrvEVName = Resources.getWakandaServerPathEVName();
		String env = System.getenv(wakSrvEVName);
		if (env != null) {
			// When Jenkins environement
			// Calculate the path to the server directory depending on the OS.
			if (os.contains("Mac")) {
				serverDirPath = env + "/../..";
			} else {
				serverDirPath = env + "/..";
			}
			// When Mac or Linux Replace [\\ ] by [ ]
			if (os.contains("Mac") || os.contains("Linux")) {
				serverDirPath = serverDirPath.replace("\\ ", " ");
			}
		} else {
			// otherwise use the server located within the project directory
			serverDirPath = System.getProperty("user.dir")
					+ "/Wakanda Server";
			if (os.contains("Mac"))
				serverDirPath += ".app";
		}

		String relatPathFromServerDir = Resources.getEntitiesProp()
		.getProperty("mimeTypes0");
		path = serverDirPath + "/" + relatPathFromServerDir;

		File tmp = new File(path);
		String cpath = tmp.getCanonicalPath();
		tmp = new File(cpath);
		
		// if the file is not found using server location.
		if (!tmp.exists()) {
			// then get the file from the local perforce workspace
			path = Resources.getEntitiesProp().getProperty("mimeTypes1");
			tmp = new File(path);
		}

		File canonicalfile = tmp.getCanonicalFile();

		// logger.debug("Calculated path to MediaTypes.xml : " + canonicalfile);
		// + (canonicalfile.exists() ? " exists" : " does not exist"));
		return canonicalfile.getCanonicalPath();
	}

}
