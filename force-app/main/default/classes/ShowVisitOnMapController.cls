/** Date : 05/7/2019
*  Controller for ShowVisitOnMap lightning component
**/

public class ShowVisitOnMapController {
    
    // Wrapper class to store lat long and name of visited record
    public class VisitPlanWrapper{
        @AuraEnabled public decimal latitude{get;set;}
        @AuraEnabled public decimal longitude{get;set;}
        @AuraEnabled public string lookupRecordName{get;set;}
        @AuraEnabled public string lookupRecordId{get;set;}
        @AuraEnabled public string recordId{get;set;}
        @AuraEnabled public string visitRecordName{get;set;}
        @AuraEnabled public date visitDate{get;set;}
    }
    // Wrapper class for store list of Subordinate - Users.
    public class SubordinateWrapper{
        @AuraEnabled public string userName{get;set;}
        @AuraEnabled public string userId{get;set;}
    }
    
    // Method to get visit plan of logged in user with  lat long
    @AuraEnabled
    public static list<VisitPlanWrapper> getListOfVisitPlanRecords(date dateVar,string selectedUser){
        system.debug('__getListOfVisitPlanRecords'+string.valueOf(dateVar));
        string stringDateVar = string.valueOf(dateVar);
        if(string.isNotBlank(stringDateVar) && string.isNotBlank(selectedUser)){
            try{
                List<VisitPlanWrapper> lstOfGetAllVisitWrapper = new List<VisitPlanWrapper>();
                List<string> lstOfLookupFields = new List<string>();
                // get the custom setting values
                List<Visit_Planning_Settings__c> lstOfVisitPlanningCustomSetting = Visit_Planning_Settings__c.getall().values();
                // Prepare base query and append lookup field values 
                string strBaseQuery = 'select id,Visit_Date__c,Name,Status__c';
                string strLookupFields = '';
                string strLookupFieldRecordName = '';
                if(lstOfVisitPlanningCustomSetting.size()>0){
                    for(Visit_Planning_Settings__c vpSettings:lstOfVisitPlanningCustomSetting){
                        strLookupFields += ','+ vpSettings.Lookup_Field_Name__c; 
                        lstOfLookupFields.add(vpSettings.Lookup_Field_Name__c);
                        
                    }
                    if(string.isNotBlank(strLookupFields))
                        strLookupFieldRecordName = strLookupFields.replace('__c','__r.Name');
                    // prepare complete query and use database.query to execute it.
                    // we use replace here to get name of correspoing lookup record
                    //string loggedInUserId = UserInfo.getUserId();
                    string strCompleteQuery = strBaseQuery+strLookupFields+strLookupFieldRecordName+' '+',Check_Out_Location__latitude__s, Check_Out_Location__longitude__s from Visit_Plan__c where Visit_Date__c ='+stringDateVar+' '+'and OwnerId=\''+selectedUser+'\''+' '+' and Check_Out_Location__longitude__s!=null'+ ' Order by Name';
                    system.debug('**Complete QueryString ***'+strCompleteQuery);
                    List<Visit_Plan__c> lstOfVisitPlan = database.query(strCompleteQuery);
                    system.debug('****list of visist plans *** '+lstOfVisitPlan);
                    if(lstOfVisitPlan.size()>0){
                        for(Visit_Plan__c vp :lstOfVisitPlan){
                            VisitPlanWrapper visitsWrapperObj = new VisitPlanWrapper();
                            visitsWrapperObj.recordId = vp.Id;
                            visitsWrapperObj.visitRecordName = vp.Name;
                            visitsWrapperObj.visitDate = vp.Visit_Date__c;
                            visitsWrapperObj.latitude = vp.Check_Out_Location__latitude__s;
                            visitsWrapperObj.longitude = vp.Check_Out_Location__longitude__s;
                            
                            for(string s : lstOfLookupFields){
                                if((string)vp.get(s)!=null){
                                    visitsWrapperObj.lookupRecordId =(string)vp.get(s);
                                    visitsWrapperObj.lookupRecordName = string.valueOf(getFieldValue(vp,s.replace('__c','__r.Name')));
                                }
                            }
                            lstOfGetAllVisitWrapper.add(visitsWrapperObj);
                        }
                    }
                }
                system.debug('*** list of visits Wrapper Class ***'+lstOfGetAllVisitWrapper);
                return lstOfGetAllVisitWrapper;
            }catch(exception oEx){
                Logger.Log('Error','Line Number: ' + oEx.getLineNumber() + ' Message: ' + oEx.getMessage(), 'ShowVisitOnMapController.getListOfVisitPlanRecords', '');    
                return null;
            }
           
        }
         return null;
    }
    /* This is method used to get values from related fields
Logic: if we want to access any lookup field such ass lookup__r.Name in that case,
sObject get method throws an error so solution below method  
*/	
    public static Object getFieldValue(SObject o,String field){
        if(o == null){
            return null;
        }
        if(field.contains('.')){
            String nextField = field.substringAfter('.');
            String relation = field.substringBefore('.');
            return getFieldValue((SObject)o.getSObject(relation),nextField);
        }else{
            return o.get(field);
        }
    }
    /** Method to Show list of SubOrdinate where logged in User as Manager Of some One **/
    @AuraEnabled
    public static List<SubordinateWrapper> getSubordinate(){
        List<SubordinateWrapper> listSubordinate = new List<SubordinateWrapper>();
        system.debug('listSubordinate**'+listSubordinate);
        for(User user :[SELECT name,Id FROM User WHERE IsActive = true 
                        and( ManagerId=: UserInfo.getUserId() or ID =:UserInfo.getUserId())]){
                            SubordinateWrapper subOrdinate = new SubordinateWrapper();
                            subOrdinate.userName = user.name;
                            subOrdinate.userId = user.Id;
                            listSubordinate.add(subOrdinate);
                        }
        return  listSubordinate;
    }
}