({
    // method to close popup on click of no button
    onClickNoButton : function(component, event, helper) {
        var appEvent = $A.get("e.c:DeleteVisitPlanningConfirmationEvt");
        appEvent.setParams({
            "message" : "No" });
        appEvent.fire();
        component.find("overlayLib").notifyClose();
    },
    onClickYesButton : function(component, event, helper) {
        var appEvent = $A.get("e.c:DeleteVisitPlanningConfirmationEvt");
        appEvent.setParams({
            "message" : "Yes" });
        appEvent.fire();
        component.find("overlayLib").notifyClose();
    }
})