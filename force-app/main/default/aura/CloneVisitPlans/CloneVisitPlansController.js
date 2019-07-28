({
    // on click of clone button to clone the visit plan
    onClickCloneButton : function(component, event, helper) {
        var selectedDate = component.get("v.selectedDate");
        var clonedDate = component.get("v.nextVisitPlanDate");
        var dateField = component.find("idVisitNextPlan");
        if(clonedDate===null || clonedDate==''){
        	dateField.set("v.errors", [{message:"Please select next visit plan date"}]);  
            return false;
        }else if (clonedDate < selectedDate || clonedDate == selectedDate) {  
            dateField.set("v.errors", [{message:"Next visit date should be greater then existing visit Date"}]);  
            return false;
        } 
        var cloneVisitPlanEvent = component.getEvent("cloneVisitPlansEvent"); 
        cloneVisitPlanEvent.setParams({"isCloneButtonClick" : "true",
        cloneVisitPlanEvent.fire(); 
    },
    onClickCancelButton : function(component, event, helper) {
        var clonedDate = component.get("v.nextVisitPlanDate");
        var cloneVisitPlanEvent = component.getEvent("cloneVisitPlansEvent"); 
        cloneVisitPlanEvent.setParams({"isCloneButtonClick" : "false",
        cloneVisitPlanEvent.fire(); 
    },
    dateChange : function(component, event, helper) {
        var dateField = component.find("idVisitNextPlan");
        dateField.set("v.errors", [{}]);  
    }
})