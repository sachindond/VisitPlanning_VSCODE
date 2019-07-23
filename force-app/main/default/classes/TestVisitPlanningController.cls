@isTest
public class TestVisitPlanningController {
    public static testMethod void testgetObjectListFromCustomSetting(){
        Visit_Planning_Settings__c vpSettings = new Visit_Planning_Settings__c();
        vpSettings.Name = 'test';
        vpSettings.Object_API_Name__c = 'testAPI';
        vpSettings.Object_Label__c = 'testLabel';
        insert vpSettings;
        VisitPlanningController.getObjectListFromCustomSetting();
    }
    public static testMethod void testgetObjectRecordsSearchResults(){
        Account a = new Account();
        a.Name = 'test';
        insert a;
        VisitPlanningController.getObjectRecordsSearchResults('test', 'Account');
    }
    public static testMethod void testsaveVisitPlanningRecord(){
        // insert custom settings
        Visit_Planning_Settings__c vpCustomSetting = new Visit_Planning_Settings__c();
        vpCustomSetting.Object_API_Name__c = 'Account';
        vpCustomSetting.Name='testSetting1';
        vpCustomSetting.Object_Label__c ='Account';
        vpCustomSetting.Lookup_Field_Name__c='Visit_To_Account__c';
        insert vpCustomSetting;
        
         // insert account
        Account a1 = new Account();
        a1.Name = 'TestAccount123';
        insert a1;   
        VisitPlanningController.saveVisitPlanningRecord('Account', string.valueOf(a1.Id), string.valueOf(date.today()), 'testComment');
    }
    public static testMethod void testExceptionsaveVisitPlanningRecord(){
        // insert custom settings
        Visit_Planning_Settings__c vpCustomSetting = new Visit_Planning_Settings__c();
        vpCustomSetting.Object_API_Name__c = 'Account';
        vpCustomSetting.Name='testSetting1';
        vpCustomSetting.Object_Label__c ='Account';
        vpCustomSetting.Lookup_Field_Name__c='Visit_To_Account__c';
        insert vpCustomSetting;
        
         // insert account
        Account a = new Account();
        a.Name = 'TestAccount123';
        insert a;   
        VisitPlanningController.saveVisitPlanningRecord('Account', string.valueOf(a.Id),null, 'testComment');
    }
    public static testMethod void testExceptiongetObjectRecordsSearchResults(){
        Account a = new Account();
        a.Name = 'test';
        insert a;
        VisitPlanningController.getObjectRecordsSearchResults('abc', 'Test');
    }
    
}