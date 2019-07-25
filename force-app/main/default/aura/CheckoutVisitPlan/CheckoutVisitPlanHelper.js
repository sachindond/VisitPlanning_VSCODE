({
    // method to update visitPlanning Record with Checkout Comments and latlong
    updateVisitPlanCheckoutLocation : function(component, event, helper,checkoutLat,checkoutLong) {
        var action = component.get('c.updateCheckoutLocationOnVisitPlanningRecord');
        var checkoutComments = component.find("idCheckoutComment").get("v.value");
        console.log("****checkoutComments",checkoutComments);
        var recordId =  component.get("v.visitPlanRecordId");
        console.log("****checkoutLat",checkoutLat);
        console.log("****checkoutLong",checkoutLong);
        console.log("recordId",recordId);
        action.setParams({'checkoutComments': checkoutComments,
                          'recordId' :recordId,
                          'checkoutLat':checkoutLat,
                          'checkoutLong':checkoutLong});
        action.setCallback(this,function(res){
            console.log('Return Values *** ',res.getReturnValue());
            if(res.getReturnValue() == true){
                helper.showToastMessage('Checked In Successfully!','Succcess!','success');
            }else{
                var checkoutVisitPlanEvt = component.getEvent("checkoutVisitPlanEvt"); 
                checkoutVisitPlanEvt.setParams({"isCheckout" : false
                                               }); 
                checkoutVisitPlanEvt.fire(); 
            }
        });
        $A.enqueueAction(action);
        
    },
    // method to get lat long of logged in user
    getLatLongOfLoggedInUser : function(component,event,helper){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success);
            function success(position) {
                var usersCurrentLat = position.coords.latitude;
                var usersCurrentLong = position.coords.longitude;
                helper.updateVisitPlanCheckoutLocation(component, event, helper,usersCurrentLat,usersCurrentLong);
            }
        }else {
            error('Geo Location Is Not Supported');
        }
    },
    // method to show toast message
    showToastMessage : function(message,title,type){
       
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title":title ,
            "message": message,
            "type":type
        });
        toastEvent.fire();
        
        var navigateToComponent = $A.get("e.force:navigateToComponent");
        navigateToComponent.setParams({
            componentDef: "c:ViewPlannedVisits"       
        });
        navigateToComponent.fire();
    }
})