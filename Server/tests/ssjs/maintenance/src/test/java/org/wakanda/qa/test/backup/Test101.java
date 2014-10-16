package org.wakanda.qa.test.backup;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.wakanda.qa.commons.server.ServerAdmin;
import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.test.backup.settings.Configuration;

public class Test101 extends TemplateTestClass {
	Logger logger = Logger.getLogger(TestBackupDataStore_NoJ.class);
	ServerAdmin adm = Configuration.getInstance().getSeverAdmin();

	@Test
	public void testBackupDS_DefaultConf_areFilesCreated_firstBackup()
			throws IOException, URISyntaxException {
		// Dans ce test, on v�rifie just qu'un nouveau dossier est cr�� dans le
		// dossier "Backups"
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// on prend le nombre de backup qui existe
		File backupFolder = Utils.getBackupFolder(
				Utils.getBackupFolder("backup1"), "Backups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = 0;
		if(backups != null)
			num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien cr��
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;

		assertEquals("the backup is not created. Actual: ", new_num_Backups,
				(num_Backups + 2));
	}

	@Test
	public void testBackupDS_DefaultConf_areFilesCreated_secondBackup()
			throws IOException, URISyntaxException {
		// Dans ce test, on v�rifie just qu'un nouveau dossier est cr�� dans le
		// dossier "Backups"
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// on prend le nombre de backup qui existe
		File backupFolder = Utils.getBackupFolder(
				Utils.getBackupFolder("backup1"), "Backups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = 0;
		if(backups != null)
			num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien cr��
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;

		assertEquals("the backup is not created. Actual: ", new_num_Backups,
				(num_Backups + 1));
	}

	@Test
	public void testBackupDS_DefaultConf_isCorrecteName() throws IOException,
			URISyntaxException {
		// Dans ce test on v�rifie que le backup est cr�� avec le nom attendu
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// lancer le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup cr��
		File backupFolder = Utils.getBackupFolder(
				Utils.getBackupFolder("backup1"), "Backups");
		File[] backups = backupFolder.listFiles();
		String name_Backup = backups[backups.length - 4].getName();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");

		assertTrue("the backup is not created with the correct name.",
				name_Backup.startsWith("backup_" + dateFormat.format(date)));
		{
		}
	}

	@Test
	public void testBackupDS_DefaultConf_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on v�rifie que le dossier DataFolder est cr�� �
		// l'int�rieur du backup
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// lancer le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(Utils.getBackupFolder("backup1")
				.substring(0, Utils.getBackupFolder("backup1").length() - 7)
				+ "Backups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 4].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_DefaultConf_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on v�rifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// lancer le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(Utils.getBackupFolder("backup1")
				.substring(0, Utils.getBackupFolder("backup1").length() - 7)
				+ "Backups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = Utils.getDataFolder(backups, 4);
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(1, DataFolder_content.length);
		assertEquals("data.waData", DataFolder_content[0].getName());
	}

	@Test
	public void testBackupDS_DefaultConf_returns_type() throws IOException,
			URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// type
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// lancer le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_Type(Utils
				.getBackupFolder("backup1"));

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertEquals("the type is not correct.", "", propertyValue);
	}

	@Test
	public void testBackupDS_DefaultConf_returns_name() throws IOException,
			URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// name
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_Name(Utils
				.getBackupFolder("backup1"));

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertEquals("the type is not correct.", "backupManifest.json",
				propertyValue);
	}

	@Test
	public void testBackupDS_DefaultConf_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// nameNoExt
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_nameNoExt(Utils
				.getBackupFolder("backup1"));

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertEquals("the type is not correct.", "backupManifest",
				propertyValue);
	}

	@Test
	public void testBackupDS_DefaultConf_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// extension
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_extension(Utils
				.getBackupFolder("backup1"));

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertEquals("the type is not correct.", "json", propertyValue);
	}

	@Test
	public void testBackupDS_DefaultConf_returns_path() throws IOException,
			URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// path
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_path(Utils
				.getBackupFolder("backup1"));
		String pathValue = Utils.getPathValue(
				Utils.getSolutionPath("solution2"), "Backups");

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertTrue("the type is not correct.",
				propertyValue.startsWith(pathValue));
	}

	@Test
	public void testBackupDS_DefaultConf_returns_exists() throws IOException,
			URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// exists
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_exists(Utils
				.getBackupFolder("backup1"));

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found. " + propertyValue,
				(String) "not found", propertyValue);
		assertEquals("the type is not correct.", "true",
				propertyValue.substring(2, 6));
	}

	@Test
	public void testBackupDS_DefaultConf_returns_visible() throws IOException,
			URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// visible
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_visible(Utils
				.getBackupFolder("backup1"));

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertEquals("the type is not correct.", "true",
				propertyValue.substring(2, 6));
	}

	@Test
	public void testBackupDS_DefaultConf_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// readOnly
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_readOnly(Utils
				.getBackupFolder("backup1"));

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertEquals("the type is not correct.", "false",
				propertyValue.substring(2, 7));
	}

	@Test
	public void testBackupDS_DefaultConf_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// creationDate
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		Date oldDate = new Date();
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		Date newDate = new Date();
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_creationDate(Utils
				.getBackupFolder("backup1"));
		Date returnedDate = Utils.parseDate(propertyValue);

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertTrue("the type is not correct.", oldDate.before(returnedDate));
		assertTrue("the type is not correct.", newDate.after(returnedDate));
		assertEquals("time zone not correct.", 'T', propertyValue.charAt(10));
		assertEquals("time zone not correct.", 'Z',
				propertyValue.charAt(propertyValue.length() - 1));
	}

	@Test
	public void testBackupDS_DefaultConf_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on v�rifie le retour de la fonction backupDataStore:
		// lastModifiedDate
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot1");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// on lance le server avec la solution temporaire qui va cr�er un backup
		// de la solution ClosedSol_NoJ_1
		Date oldDate = new Date();
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		Date newDate = new Date();
		// On lit ce qui est enregistr� dans le fichier temporaire
		String propertyValue = Utils.getProperty_lastModifiedDate(Utils
				.getBackupFolder("backup1"));
		Date returnedDate = Utils.parseDate(propertyValue);

		assertNotSame("the return is empty.", (String) "empty", propertyValue);
		assertNotSame("the return of 'backupDataStore' method is 'null'.",
				(String) "null", propertyValue);
		assertNotSame("the type is not found.", (String) "not found",
				propertyValue);
		assertTrue("the type is not correct.", oldDate.before(returnedDate));
		assertTrue("the type is not correct.", newDate.after(returnedDate));
		assertEquals("time zone not correct.", 'T', propertyValue.charAt(10));
		assertEquals("time zone not correct.", 'Z',
				propertyValue.charAt(propertyValue.length() - 1));
	}

}
