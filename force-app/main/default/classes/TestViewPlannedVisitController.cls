@isTest
public class TestViewPlannedVisitController {
    public static testMethod void testgetListOfAllVisitPlanning(){
        date todaysDate = date.today();
        // insert custom settings
        Visit_Planning_Settings__c vpCustomSetting = new Visit_Planning_Settings__c();
        vpCustomSetting.Object_API_Name__c = 'Account';
        vpCustomSetting.Name='testSetting';
        vpCustomSetting.Object_Label__c ='Account';
        vpCustomSetting.Lookup_Field_Name__c='Visit_To_Account__c';
        insert vpCustomSetting;
       
        // insert account
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        system.assertEquals(vpRecord.Visit_Date__c, date.today());
        ViewPlannedVisitController.getListOfAllVisitPlanning(string.valueOf(todaysDate));
        
        
    }
    public static testMethod void testupdateCheckoutLocationOnVisitPlanningRecord(){
        // insert account
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        string checkoutComments = 'testCheckout';
        string recordId = vpRecord.Id;
        decimal checkoutLat = 18.234445;
        decimal checkoutLong = 18.234445;
        ViewPlannedVisitController.updateCheckoutLocationOnVisitPlanningRecord(checkoutComments, recordId, checkoutLat, checkoutLong);
        
    }
    public static testMethod void testupdateCheckInLocationOnVisitPlanningRecord(){
        // insert account
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        string recordId = vpRecord.Id;
        decimal checkInLat = 18.234445;
        decimal checkInLong = 18.234445;
        ViewPlannedVisitController.updateCheckInLocationOnVisitPlanningRecord(recordId, checkInLat, checkInLong);
    }
    public static testMethod void testdeleteVisitPlanningRecord(){
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        string recordId = vpRecord.Id;
        ViewPlannedVisitController.deleteVisitPlanningRecord(recordId);
    }
    public static testMethod void testcloneVisitPlanRecords(){
        // insert custom settings
        Visit_Planning_Settings__c vpCustomSetting = new Visit_Planning_Settings__c();
        vpCustomSetting.Object_API_Name__c = 'Test';
        vpCustomSetting.Name='testSetting';
        vpCustomSetting.Object_Label__c ='Test';
        vpCustomSetting.Lookup_Field_Name__c='Visit_To_Account__c';
        insert vpCustomSetting;
        // insert account
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        date sourceDate = date.today();
        date cloneDate = date.today()+2;
        ViewPlannedVisitController.cloneVisitPlanRecords(string.valueOf(sourceDate), string.valueOf(cloneDate));
    }
    public static testMethod void testExceptionGetVisit(){
        Visit_Planning_Settings__c vpCustomSetting1 = new Visit_Planning_Settings__c();
        vpCustomSetting1.Object_API_Name__c = 'Test';
        vpCustomSetting1.Name='testSetting';
        vpCustomSetting1.Object_Label__c ='Test';
        vpCustomSetting1.Lookup_Field_Name__c='test';
        insert vpCustomSetting1;
        Visit_Plan__c vpRecord1 = new Visit_Plan__c();
        vpRecord1.Check_Out_Comments__c = 'testComment';
        vpRecord1.Visit_Date__c = date.today();
        
        insert vpRecord1;
        date todaysDate = date.today();
        ViewPlannedVisitController.getListOfAllVisitPlanning(string.valueOf(todaysDate));
    }
    public static testMethod void testExceptionUpdateCheckInVp(){
         // insert account
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        string recordId = vpRecord.Id;
        decimal checkInLat = 18.234445;
        decimal checkInLong = null;
        ViewPlannedVisitController.updateCheckInLocationOnVisitPlanningRecord(recordId, checkInLat, checkInLong);
    }
    public static testMethod void testExceptionUpdateCheckoutVp(){
        // insert account
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        string checkoutComments = 'testCheckout';
        string recordId = vpRecord.Id;
        decimal checkoutLat = 18.234445;
        decimal checkoutLong = null;
        ViewPlannedVisitController.updateCheckoutLocationOnVisitPlanningRecord(checkoutComments, recordId, checkoutLat, checkoutLong);
    }
    public static testMethod void testExceptionCloneVp(){
        Account a = new Account();
        a.Name = 'TestAccount';
        insert a;    
        // insert visit plan
        Visit_Plan__c vpRecord = new Visit_Plan__c();
        vpRecord.Check_Out_Comments__c = 'testComment';
        vpRecord.Visit_Date__c = date.today();
        vpRecord.Visit_To_Account__c = a.Id;
        insert vpRecord;
        string recordId = '1233333';
        ViewPlannedVisitController.cloneVisitPlanRecords(string.valueOf(date.today()),null);
	}
}