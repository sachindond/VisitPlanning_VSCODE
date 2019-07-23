({
    // on click of clone button to clone the visit plan
    onClickCloneButton : function(component, event, helper) {
        
        var clonedDate = component.get("v.nextVisitPlanDate");
        var cloneVisitPlanEvent = component.getEvent("cloneVisitPlansEvent"); 
        cloneVisitPlanEvent.setParams({"isCloneButtonClick" : "true",
                                       "clonedDate":clonedDate}); 
        cloneVisitPlanEvent.fire(); 
    }
})