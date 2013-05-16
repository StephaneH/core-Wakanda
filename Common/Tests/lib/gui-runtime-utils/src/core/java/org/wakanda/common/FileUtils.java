package org.wakanda.common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.JarURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

import org.apache.commons.lang.StringUtils;
import static org.wakanda.common.Common.*;

public class FileUtils 
{
	private static int BUFFER_SIZE = 1024;
	
	/**
	 * Makes sure that a folder is existing. Otherwise create it.
	 * 
	 *@author Aleph
	 * @param f
	 * @return
	 */
	private static boolean ensureDirectoryExists(final File f) {
		return f.exists() || f.mkdir();
	}

	/**
	 * Writes an InputStream resource to a File object.
	 * 
	 *@author Aleph
	 * @param is
	 * @param f
	 * @return
	 */
	private static boolean copyStream(final InputStream is, final File f) 
	{
		try 
		{
			return FileUtils.copyStream(is, new FileOutputStream(f));
		} 
		catch (final FileNotFoundException e) 
		{
			logger.warning("Resources could not be found. Failed to retrieve File streams: " + e);
		}
		return false;
	}

	/**
	 * Copies an InputStream resource to a OutputStream object.
	 * 
	 *@author Aleph
	 * @param is
	 * @param os
	 * @return
	 */
	private static boolean copyStream(final InputStream is, final OutputStream os) 
	{
		try 
		{
			final byte[] buf = new byte[BUFFER_SIZE];
	
			int len = 0;
			while ((len = is.read(buf)) > 0) 
			{
				os.write(buf, 0, len);
			}
			is.close();
			os.close();
			return true;
		} 
		catch (final IOException e) 
		{
			logger.warning("Failed to read IO streams: " + e);
		}
		return false;
	}

	/**
	 * Copies a java.io.File source object to a destination object of the same type.<br/><br/>
	 * 
	 * The procedure uses FileUtils.copyStream where both source and destination File objects<br/>
	 * are streamed from a FileInputStream to a FileOutputStream.
	 * 
	 *@author Aleph
	 * @param toCopy
	 * @param destFile
	 * @return
	 */
	public static boolean copyFile(final File toCopy, final File destFile) 
	{
		try 
		{
			// Uses IO streams to copy File objects.
			return FileUtils.copyStream(new FileInputStream(toCopy), new FileOutputStream(destFile));
		} 
		catch (final FileNotFoundException e) 
		{
			logger.warning("Resources could not be found. Failed to retrieve File streams: " + e);
		}
		return false;
	}

	/**
	 * Copies files of subfolders recursively into a destination folder.<br/>
	 * This is a alternative of CopyDirectoryToDirectory using IO streams instead of File objects.
	 * 
	 * 
	 *@author Aleph
	 * @param toCopy
	 * @param destDir
	 * @return
	 */
	private static boolean copyFilesRecusively(final File toCopy, final File destDir) 
	{
		// Makes sure the destination folder is actually a directory.
		assert destDir.isDirectory();

		// If it is not a directory, we assume it is a File object then we call upon our copyFile() method.
		if (!toCopy.isDirectory()) 
		{
			return FileUtils.copyFile(toCopy, new File(destDir, toCopy.getName()));
		} 
		else 
		{
			final File newDestDir = new File(destDir, toCopy.getName());

			// We initialize the process of copy by creating the destination directory
			// If It has not yet been created.
			if (!newDestDir.exists() && !newDestDir.mkdir()) 
			{
				return false;
			}

			// Recursively we proceed to copying the whole subfolders and files.
			for (final File child : toCopy.listFiles()) 
			{
				if (!FileUtils.copyFilesRecusively(child, newDestDir)) 
				{
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * This is a neat work-around of the very known Exception: URI is not hierarchical:<br/><br/>
	 * 
	 * This method allows to copy recursively a whole directory with its subfolders and files<br/>
	 * to a destination folder using an URL.<br/><br/>
	 * 
	 * This is practical when copying resources from a JAR archive <br/>
	 * where an URL is encapsulated within two protocoles: <br/><br/>
	 * 
	 * jar:/file:/[path_to_jar_file]!/[path_to_inner_resource]<br/>
	 * 
	 *@author Aleph
	 * @param originUrl
	 * @param destination
	 * @return
	 */
	public static boolean copyResourcesRecursively(final URL originUrl, final File destination) 
	{
		try 
		{
			// Opens a connection to the resource's URL within the JAR archive
			final URLConnection urlConnection = originUrl.openConnection();
	
			// Makes sure the URL retrieve is a JAR archive
			if (urlConnection instanceof JarURLConnection) 
			{
				// Executes a recursive copy of the wanted resources from within the JAR archive.
				return FileUtils.copyJarResourcesRecursively(destination, (JarURLConnection) urlConnection);
			} 
			else 
			{
				// In case the files can be retrieved as File objects, we call upon the usual recursive copying method.
				return FileUtils.copyFilesRecusively(new File(originUrl.getPath()), destination);
			}
		} 
		catch (final IOException e) 
		{
			logger.warning("Failed to copy resources from JAR archive: " + e);
		}
	
		return false;
	}

	/**
	 * Extracts and copies recursively 'files' from a JAR archive to a remote 
	 * 
	 *@author Aleph
	 * @param destDir
	 * @param jarConnection
	 * @return
	 * @throws IOException
	 */
	public static boolean copyJarResourcesRecursively(final File destDir, final JarURLConnection jarConnection) throws IOException 
	{
		final JarFile jarFile = jarConnection.getJarFile();

		for (final Enumeration<JarEntry> e = jarFile.entries(); e.hasMoreElements();) 
		{
			final JarEntry entry = e.nextElement();

			if (entry.getName().startsWith(jarConnection.getEntryName())) 
			{
				final String filename = StringUtils.removeStart(entry.getName(), jarConnection.getEntryName());

				final File f = new File(destDir, filename);

				if (!entry.isDirectory()) 
				{
					final InputStream entryInputStream = jarFile.getInputStream(entry);

					if(!FileUtils.copyStream(entryInputStream, f))
					{
						return false;
					}
					entryInputStream.close();
				} 
				else 
				{
					if (!FileUtils.ensureDirectoryExists(f)) 
					{
						throw new IOException("Could not create directory: " + f.getAbsolutePath());
					}
				}
			}
		}

		return true;
	}
	
	/**
	 * Reads a File object's content into a String.
	 * 
	 * @author Aleph
	 * @param filename
	 * @return
	 * @throws IOException
	 */
	public static String readFromFile(String filename) throws IOException 
	{
			BufferedReader reader = new BufferedReader(new FileReader(filename));
			StringBuilder builder = new StringBuilder();
			String line;

			// For every line in the file, append it to the string builder
			while ((line = reader.readLine()) != null) 
			{
				builder.append(line);
			}

			return builder.toString();
	}

	/**
	 * Writes a String object's value into a File.
	 * 
	 * @author Aleph
	 * @param filename
	 * @param data
	 * @return
	 */
	public static boolean writeToFile(File filename, String data) 
	{
		try
		{
		// Create file
		FileWriter fstream = new FileWriter(filename);
		BufferedWriter out = new BufferedWriter(fstream);

		out.write(data);

		// Close the output stream
		out.close();

		return true;
		} catch (Exception e) 
		{
			// Catch exception if any
			System.err.println("Error: " + e.getMessage());
			return false;
		}
	}
}