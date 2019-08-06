({
    // method to update visitPlanning Record with Checkout Comments and latlong
    updateVisitPlanCheckoutLocation : function(component,event,helper) {
        var checkoutComments = component.find("idCheckoutComment").get("v.value");
        var expenses = component.find("idExpenses").get("v.value");
        var latitude = component.get("v.latitude");
        var longitude = component.get("v.longitude");
        var recordId =  component.get("v.visitPlanRecordId");
        var action = component.get('c.updateCheckoutLocationOnVisitPlanningRecord');
        var checkoutVisitPlanEvt = component.getEvent("checkoutVisitPlanEvt"); 
        component.set('v.loaded',true);
        action.setParams({'checkoutComments': checkoutComments,
                          'recordId' :recordId,
                          'checkoutLat':latitude,
                          'checkoutLong':longitude,
                          'expenses':expenses});
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state === "SUCCESS"){
                component.set('v.loaded',false);
                helper.showToastMessage('Checked In Successfully!','Succcess!','success');
                checkoutVisitPlanEvt.setParams({"isCheckout" : true }); 
                checkoutVisitPlanEvt.fire(); 
            }else{
                checkoutVisitPlanEvt.setParams({"isCheckout" : false});
                checkoutVisitPlanEvt.fire(); 
            }
        });
        $A.enqueueAction(action);
    },
    // method to get lat long of logged in user
    getLatLongOfLoggedInUser : function(component,event,helper){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                component.set("v.latitude",lat);
                component.set("v.longitude",lon);                    
              });
            helper.updateVisitPlanCheckoutLocation(component,event,helper);   
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
    }
})