({
    doInit : function(component, event, helper) {
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set('v.selectedDate', today);
        //helper.getVisitPlans(component, event, helper);
        helper.getSubordinateList(component, event, helper);
    },
    // Method shows list of visit planned which is Checkout lat and long
    onChangeDateFilterOfMap : function(component, event, helper) {
        console.log("*******onChangeDateFilterOfMap")
        helper.getVisitPlans(component, event, helper) ;
    },
    onChangeSubordinateList: function(component, event, helper) {
        helper.getVisitPlans(component, event, helper);
    },
    // method set previous date based on selected input date
    onClickPreviousDateButton :function (component, event,helper) {
        var currentDate = new Date(component.get('v.selectedDate'));
        var previousDay = new Date(currentDate);
        previousDay.setDate(currentDate.getDate() - 1);
        var setpreviousDate = $A.localizationService.formatDate(previousDay, "YYYY-MM-DD");
        component.set('v.selectedDate',setpreviousDate);
        helper.getVisitPlans(component, event, helper) ;
        
    },
    // method set Next date based on selected input date
    onClickNextDateButton :function (component, event,helper) {
        var currentDate = new Date(component.get('v.selectedDate'));
        var nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);
        var setNextDate = $A.localizationService.formatDate(nextDay, "YYYY-MM-DD");
        component.set('v.selectedDate',setNextDate);
        helper.getVisitPlans(component, event, helper) ;
    }
})