({
    getAllListOfVisitPlanning : function(component, event, helper) {
     
        var action = component.get('c.getListOfAllVisitPlanning');
        var dateFieldValue = component.get("v.selectedDate");
        action.setParams({'dateVar': dateFieldValue});
        action.setCallback(this,function(res){
            var listOfVisitPlanning = res.getReturnValue();
            component.set("v.VisitPlanningRecords",listOfVisitPlanning);
            helper.setTotalNumberOfVisitCount(component,listOfVisitPlanning);
        });
        $A.enqueueAction(action);
    },
    // method to update visitPlanning Record with Checkout Comments and latlong
    updateVisitPlanCheckoutLocation : function(component, event, helper,checkoutLat,checkoutLong) {
       
        var action = component.get('c.updateCheckoutLocationOnVisitPlanningRecord');
        var checkoutComments = component.find("idCheckoutComment").get("v.value");
        var recordId =  component.get("v.visitPlanRecordId");
        component.set('v.loaded',true);
        action.setParams({'checkoutComments': checkoutComments,
                          'recordId' :recordId,
                          'checkoutLat':checkoutLat,
                          'checkoutLong':checkoutLong});
        action.setCallback(this,function(res){
            if(res.getReturnValue() == true){
                component.set('v.loaded',false);
                helper.showToastMessage('Checked out successfully!','Succcess!','success');
                component.set("v.hideShowVisitPlan",true);
                helper.getAllListOfVisitPlanning(component, event, helper);
                component.set('v.loaded',false);
                
            }else{
                component.set('v.loaded',false);
                helper.showToastMessage('Check out failed! Please contact your administrator.','Error!','error');
            }
        });
        $A.enqueueAction(action);
        
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
    },
    // helper method to update Check In Geo location on visit planning
    updateVisitPlanCheckInLocation : function(component, event, helper,checkInLat,checkInLong) {
        
        var action = component.get('c.updateCheckInLocationOnVisitPlanningRecord');
        var recordId =  component.get("v.visitPlanRecordId");
        component.set('v.loaded',true);
        action.setParams({
            'recordId' :recordId,
            'checkInLat':checkInLat,
            'checkInLong':checkInLong});
        action.setCallback(this,function(res){
            if(res.getReturnValue() == true){
                component.set('v.loaded',false);
                helper.showToastMessage('Checked In Successfully!','Succcess!','success');
                helper.getAllListOfVisitPlanning(component, event, helper);
                component.set("v.hideShowVisitPlan",true);
            }else{
                component.set('v.loaded',false);
                helper.showToastMessage('Check In failed! Please contact your administrator.','Error!','error');
            }
        });
        $A.enqueueAction(action);
        
    },
    // helper to delete visit planning record
    deleteVisitPlan:function(component,event,helper){
      
        var action = component.get('c.deleteVisitPlanningRecord');
        var recordId =  component.get("v.visitPlanRecordId");
        component.set('v.loaded',true);
        action.setParams({'recordId' :recordId});
        action.setCallback(this,function(res){
            if(res.getReturnValue() == true){
                component.set('v.loaded',false);
                helper.showToastMessage('Visit Plan deleted successfully!','Succcess!','success');
                helper.getAllListOfVisitPlanning(component, event, helper);
            }else{
                helper.showToastMessage('Delete unsuccessful! Please contact your administrator.','Error!','error');
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
                helper.updateVisitPlanCheckInLocation(component,event,helper,usersCurrentLat,usersCurrentLong);
            }
        }else {
            error('Geo Location Is Not Supported');
        }
    },
    // method to set counts of visits planned,checkin,checkout,missed
    setTotalNumberOfVisitCount: function(component,listOfVisitPlanning){
       
        if(listOfVisitPlanning.length>0){
            var plannedVisits = 0;
            var checkoutVisits = 0;
            var checkinVisits = 0;
            var missedOutVisits = 0;
            for(var i=0;i<listOfVisitPlanning.length;i++){
                if(listOfVisitPlanning[i].status=='Planned'){
                    plannedVisits++;
                }
                if(listOfVisitPlanning[i].status=='Checked In'){
                    checkinVisits++;
                }
                if(listOfVisitPlanning[i].status=='Checked Out'){
                    checkoutVisits++;
                }
                if(listOfVisitPlanning[i].status=='Missed'){
                    missedOutVisits++;
                }
            }
            component.set("v.totalPlannedVisits",plannedVisits);
            component.set("v.totalCheckedInVisits",checkinVisits);
            component.set("v.totalCheckedOutVisits",checkoutVisits);
            component.set("v.totalMissedVisits",missedOutVisits);
        }else{
            component.set("v.totalPlannedVisits",0);
            component.set("v.totalCheckedInVisits",0);
            component.set("v.totalCheckedOutVisits",0);
            component.set("v.totalMissedVisits",0);
        }
    },
    cloneVisitPlans:function(component,event,helper){
      
        var action = component.get("c.cloneVisitPlanRecords");
        var sourceVisitPlanDate = component.get("v.selectedDate");
        var clonedVisitPlanDate = component.get("v.clonedVisitPlanDate");
        action.setParams({"sourceVisitPlanDate":sourceVisitPlanDate,
                          "cloneVisitPlanDate":clonedVisitPlanDate});
        action.setCallback(this,function(res){
            if(res.getState()==="SUCCESS"){
                helper.showToastMessage('Visit Plan Cloned successfully!','Succcess!','success');
                if(res.getReturnValue()==true){
                    component.set('v.isClone',false);
                }else{
                    helper.showToastMessage('Cloned unsuccessful! Please contact your administrator.','Error!','error'); 
                }
            }
        });
        $A.enqueueAction(action);
    }
 })