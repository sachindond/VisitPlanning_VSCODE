({
    doInit: function(component, event, helper) {
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set("v.nextVisitPlanDate",today);
    },
    // on click of clone button to clone the visit plan
    onClickCloneButton : function(component, event, helper) {
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        var selectedDate = component.get("v.selectedDate");
        var clonedDate = component.get("v.nextVisitPlanDate");
        var dateField = component.find("idVisitNextPlan");
        if(clonedDate===null || clonedDate==''){
        	dateField.set("v.errors", [{message:"Please select next visit plan date"}]);  
            return false;
        }else if (clonedDate < today ) {  
            dateField.set("v.errors", [{message:"Next visit date should be greater todays date"}]);  
            return false;
        } 
        var cloneVisitPlanEvent = component.getEvent("cloneVisitPlansEvent"); 
        cloneVisitPlanEvent.setParams({"isCloneButtonClick" : "true",
                                       "clonedDate":clonedDate}); 
        cloneVisitPlanEvent.fire(); 
    },
    onClickCancelButton : function(component, event, helper) {
        var clonedDate = component.get("v.nextVisitPlanDate");
        var cloneVisitPlanEvent = component.getEvent("cloneVisitPlansEvent"); 
        cloneVisitPlanEvent.setParams({"isCloneButtonClick" : "false",
                                       "clonedDate":clonedDate}); 
        cloneVisitPlanEvent.fire(); 
    },
    dateChange : function(component, event, helper) {
        var dateField = component.find("idVisitNextPlan");
        dateField.set("v.errors", [{}]);  
    }
})