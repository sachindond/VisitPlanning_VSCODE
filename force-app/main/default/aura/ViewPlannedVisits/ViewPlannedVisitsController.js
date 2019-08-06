({
    // In do init we fetch the list of visit planning
    // we used date filter here.
    doInit : function(component, event, helper) {
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set('v.selectedDate', today);
        //helper to get visit planning records
        helper.getAllListOfVisitPlanning(component, event, helper);
    },
    // method to show on checkout button click a text field to accept comments and upload files
    onClickCheckedOutButton :function (component, event) {
        var recordId = event.getSource().get("v.name");
        component.set("v.visitPlanRecordId",recordId);
        //component.set("v.hideShowVisitPlan",false);
        var getAllRecords = component.get("v.VisitPlanningRecords");
        for(var i = 0;i<getAllRecords.length;i++){
            if(getAllRecords[i].recordId ==recordId ){
                component.set("v.singleVisitPlanningRecord",getAllRecords[i]);
            }
        }
        component.set("v.isCheckout",true);
    },
    // we store check in location and date time of user
    onClickCheckedInButton:function (component,event,helper) {
        var recordId = event.getSource().get("v.name");
        component.set("v.visitPlanRecordId",recordId);
        helper.getLatLongOfLoggedInUser(component,event,helper);
    },
    // Method to delete visit plan record
    onClickDeleteButton:function (component,event,helper) {
        var recordId = event.getSource().get("v.name");
        component.set("v.visitPlanRecordId",recordId); 
        // called lightning overlays as confirmation box 
        $A.createComponent("c:DeleteVisitPlanningConfirmationPopup",{},
                           function(content,status){
                               if(status==="SUCCESS"){
                                   var mbody = content;
                                   component.find("overlayLib").showCustomModal({
                                       header: "Are you sure you want to delete this Visit Plan?",
                                       body: mbody, 
                                       showCloseButton: false,
                                       closeCallback: function(ovl) {
                                           console.log('Not Confirm');
                                       }
                                   }).then(function(overlay){
                                       console.log('Confirmed');
                                   });
                               }
                           }
                          );
    },
    // method get call on date filter change and get visit plan based 
    // on Visit Date matching with Date filter
    onChangeDateFilter :function (component, event,helper) {
        helper.getAllListOfVisitPlanning(component, event,helper);
    },
    // method called when application event fire 
    handleDeleteConfirmation :function (component, event,helper) {
        var message = event.getParam("message");
        if(message == 'Yes')
        {
            helper.deleteVisitPlan(component,event,helper);
        }
    },
    // method set previous date based on selected input date
    onClickPreviousDateButton :function (component, event,helper) {
        var currentDate = new Date(component.get('v.selectedDate'));
        var previousDay = new Date(currentDate);
        previousDay.setDate(currentDate.getDate() - 1);
        var setpreviousDate = $A.localizationService.formatDate(previousDay, "YYYY-MM-DD");
        component.set('v.selectedDate',setpreviousDate);
        helper.getAllListOfVisitPlanning(component, event,helper);
        
    },
    // method set Next date based on selected input date
    onClickNextDateButton :function (component, event,helper) {
        var currentDate = new Date(component.get('v.selectedDate'));
        var nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);
        var setNextDate = $A.localizationService.formatDate(nextDay, "YYYY-MM-DD");
        component.set('v.selectedDate',setNextDate);
        helper.getAllListOfVisitPlanning(component, event,helper);
    },
    // method call on click of clone button
    onClickCloneButton:function (component, event,helper) {
        component.set('v.isClone',true);
    },
    // Method to handle clone visit plan event 
    handleCloneVisitPlansEvent:function (component, event,helper) {
        var isCloneButtonClick = event.getParam("isCloneButtonClick"); 
        var clonedDate = event.getParam("clonedDate"); 
        component.set("v.clonedVisitPlanDate",clonedDate);
        if(isCloneButtonClick=='true'){
            helper.cloneVisitPlans(component, event,helper);
        }
        if(isCloneButtonClick =='false'){
            component.set("v.isClone",false);
        }
    },
    // method to handle checkout event
    handleCheckoutEvent :function (component, event,helper) {
        var isCheckout = event.getParam("isCheckout"); 
        if(isCheckout == true){
            helper.getAllListOfVisitPlanning(component, event,helper);
            component.set("v.isCheckout",false);
        }else{
            component.set("v.isCheckout",false);
        }
    }
    
})