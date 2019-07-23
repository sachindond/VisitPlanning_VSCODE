public class VisitPlanningController {
    /***************************** New Development Started 24/6/2018 By Sachin Dond *********************/
    // This method access custom setting from which we get object list where user plan to visits
    @AuraEnabled
    public static List<CustomSettingWrapper> getObjectListFromCustomSetting(){
         List<CustomSettingWrapper> lstOfObjectAPINames = new List<CustomSettingWrapper>();
        // access custom setting;
        try{
           
            List<Visit_Planning_Settings__c> lstOfVisitPlanningCustomSetting = Visit_Planning_Settings__c.getall().values();
            if(lstOfVisitPlanningCustomSetting.size()>0){
                for(Visit_Planning_Settings__c vpObj : lstOfVisitPlanningCustomSetting){
                    // create map of Object label and Object API key
                    CustomSettingWrapper wrapperObj = new CustomSettingWrapper();
                    wrapperObj.objectLabel = vpObj.Object_Label__c;
                    wrapperObj.objectAPIName =  vpObj.Object_API_Name__c;
                    lstOfObjectAPINames.add(wrapperObj);
                }
            }
            system.debug('**list of Objects and API keys'+lstOfObjectAPINames);
            return lstOfObjectAPINames;
        }Catch(Exception oEx){
            Logger.Log('Error','Line Number: ' + oEx.getLineNumber() + ' Message: ' + oEx.getMessage(), 'VisitPlanningController.getObjectListFromCustomSetting', '');    
            return lstOfObjectAPINames;
        }
    }
    // This is method used fetch lookup values based on Object Name 
    @AuraEnabled
    public static List<sObject> getObjectRecordsSearchResults(String searchKeyWord, String ObjectName) {
        List < sObject > returnList = new List < sObject > ();
        try{
        system.debug('ObjectName-->' + ObjectName);
        String searchKey = searchKeyWord + '%';
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5   
        String sQuery =  'select id, Name from ' +ObjectName + ' where Name LIKE: searchKey order by createdDate DESC limit 5';
        List < sObject > lstOfRecords = Database.query(sQuery);
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
        }Catch(Exception oEx){
            Logger.Log('Error','Line Number: ' + oEx.getLineNumber() + ' Message: ' + oEx.getMessage(), 'VisitPlanningController.getObjectRecordsSearchResults', '');    
            return returnList;
        }
    }
    // Method to save Visit Planning Record
    // Logic : We used here dynamic method of apex to set value to the field : objectInstance.put('APINAME',Value)
    @AuraEnabled
    public static boolean saveVisitPlanningRecord(string objectAPIName,string objectRecordId,string selectedVisitDate,string reasonForVisit ){
        // get the custom setting and create map of API name and Correspoinding lookup field to access it;
        try{
            List<Visit_Plan__c> lstInsertVisitPlanningRecord = new List<Visit_Plan__c>();
            List<Visit_Planning_Settings__c> lstOfVisitPlanningCustomSetting = Visit_Planning_Settings__c.getall().values();
            Map<String,String> mapAPINameWithLookupField = new Map<String,String>();
            if(lstOfVisitPlanningCustomSetting.size()>0){
                for(Visit_Planning_Settings__c vpObj : lstOfVisitPlanningCustomSetting){
                    mapAPINameWithLookupField.put(vpObj.Object_API_Name__c,vpObj.Lookup_Field_Name__c);
                }
            }
            system.debug('***map of API mapAPINameWithLookupField '+mapAPINameWithLookupField);
            // create Visit Planning Record and User Map to get Look up field Name
            Visit_Plan__c vpRecordObj = new Visit_Plan__c();
            // this is dynamic way to assign value to api name we access it via map created from custom setting
            vpRecordObj.put(mapAPINameWithLookupField.get(objectAPIName),objectRecordId);
            vpRecordObj.Reason_For_Visit__c = reasonForVisit;
            vpRecordObj.Visit_Date__c = date.valueOf(selectedVisitDate);
            lstInsertVisitPlanningRecord.add(vpRecordObj);
            system.debug('** list to insert Visit Planning Records**'+lstInsertVisitPlanningRecord);
            if(lstInsertVisitPlanningRecord.size()>0){
                insert lstInsertVisitPlanningRecord;
            }
            return true;
        }Catch(Exception oEx){
            Logger.Log('Error','Line Number: ' + oEx.getLineNumber() + ' Message: ' + oEx.getMessage(), 'VisitPlanningController.saveVisitPlanningRecord', '');    
            return false;
        }
    }    
    // Wrapper class used to store custom setting records
    public class CustomSettingWrapper{
        @AuraEnabled public String objectLabel{get;set;}
        @AuraEnabled public String objectAPIName{get;set;}    
    }
}