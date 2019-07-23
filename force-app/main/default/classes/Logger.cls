/* Class Name: Logger
* Generic Logging method available to log messages in custom object log entry
* Created Date: 25-6-2019
*/
public class Logger {
    
    public static void Log(string type, string message, string function, string requestBody)
    {
        Log_Entry__c newEntry= new Log_Entry__c();
        try
        {
            newEntry.Type__c = type;
            newEntry.Message__c = message;
            newEntry.Function__c = function;
            newEntry.Request_Body__c = requestBody;
            insert newEntry;
        }
        catch(Exception oEx)
        {
            system.debug('Error in Logging Entries: Exception: ' + oEx.getMessage());
        }
    }
}