@isTest
public class TestShowVisitOnMapController {
    public static testMethod void testgetListOfVisitPlanRecords(){
        // create custom setting
        Visit_Planning_Settings__c vpCustomSetting = new Visit_Planning_Settings__c();
        vpCustomSetting.Object_API_Name__c = 'Account';
        vpCustomSetting.Name='testSetting';
        vpCustomSetting.Object_Label__c ='Account';
        vpCustomSetting.Lookup_Field_Name__c='Visit_To_Account__c';
        insert vpCustomSetting;
        Account a = new Account();
        a.Name = 'TestAccount1';
        insert a;
        
        Profile profile=[SELECT Id FROM Profile WHERE Name='System Administrator'];
        User user= new User();
        user.FirstName = 'testFname';
        user.LastName = 'lastName';
        user.Username = 'testUser-'+ViewPlannedVisitController.generateRandomString(5)+ '@test.com';
        user.Email = 'testUser-'+ViewPlannedVisitController.generateRandomString(5)+'@test.com';
        user.Alias = 'test1'+ViewPlannedVisitController.generateRandomString(2);
        user.TimeZoneSidKey = 'America/New_York';
        user.LocaleSidKey = 'en_US';
        user.EmailEncodingKey = 'UTF-8';
        user.ProfileId = profile.Id;   
        user.LanguageLocaleKey = 'en_US';
        user.IsActive = true;
        insert user;
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        vpRecord.OwnerId = user.Id;
        vpRecord.Check_Out_Location__longitude__s = 12.4444;
        vpRecord.Check_Out_Location__Latitude__s = 12.34444;
        insert vpRecord;
        ShowVisitOnMapController.getListOfVisitPlanRecords(date.today(),string.valueOf(user.Id));
   }
    public static testMethod void testGetSubordinate(){
        Profile profile=[SELECT Id FROM Profile WHERE Name='System Administrator'];
        User user= new User();
        user.FirstName = 'testFname';
        user.LastName = 'lastName';
        user.Username = 'testUser-'+ViewPlannedVisitController.generateRandomString(5)+ '@test.com';
        user.Email = 'testUser-'+ViewPlannedVisitController.generateRandomString(5)+'@test.com';
        user.Alias = 'test1'+ViewPlannedVisitController.generateRandomString(2);
        user.TimeZoneSidKey = 'America/New_York';
        user.LocaleSidKey = 'en_US';
        user.EmailEncodingKey = 'UTF-8';
        user.ProfileId = profile.Id;   
        user.LanguageLocaleKey = 'en_US';
        user.IsActive = true;
        insert user;
       
        User user1= new User();
        user1.FirstName = 'testFname1';
        user1.LastName = 'lastName1';
        user1.Username = 'testUser-'+ViewPlannedVisitController.generateRandomString(5)+ '@test.com';
        user1.Email = 'testUser-'+ViewPlannedVisitController.generateRandomString(5)+'@test.com';
        user1.Alias = 'test1'+ViewPlannedVisitController.generateRandomString(2);
        user1.TimeZoneSidKey = 'America/New_York';
        user1.LocaleSidKey = 'en_US';
        user1.EmailEncodingKey = 'UTF-8';
        user1.ProfileId = profile.Id;   
        user1.LanguageLocaleKey = 'en_US';
        user1.IsActive = true;
        user1.ManagerId = user.Id;
        insert user1;
        ShowVisitOnMapController.getSubordinate();
    }
}