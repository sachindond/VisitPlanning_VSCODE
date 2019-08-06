({
    // helper to get all visit planning records
    getAllListOfVisitPlanning : function(component, event, helper) {
        var action = component.get('c.getListOfAllVisitPlanning');
        var dateFieldValue = component.get("v.selectedDate");
        action.setParams({'dateVar': dateFieldValue});
        action.setCallback(this,function(res){
            var listOfVisitPlanning = res.getReturnValue();
            component.set("v.VisitPlanningRecords",[]);
            component.set("v.VisitPlanningRecords",listOfVisitPlanning);
            helper.setTotalNumberOfVisitCount(component,listOfVisitPlanning);
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
    updateVisitPlanCheckInLocation : function(component, event, helper) {
        var checkInLat = component.get("v.latitude");
        var checkInLong = component.get("v.longitude");
        var action = component.get('c.updateCheckInLocationOnVisitPlanningRecord');
        var recordId =  component.get("v.visitPlanRecordId");
        component.set('v.loaded',true);
        action.setParams({
            'recordId' :recordId,
            'checkInLat':checkInLat,
            'checkInLong':checkInLong});
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state === "SUCCESS"){
                component.set('v.loaded',false);
                helper.showToastMessage('Checked In Successfully!','Succcess!','success');
                helper.getAllListOfVisitPlanning(component, event, helper);
                
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
        action.setParams({'recordId' :recordId});
        action.setCallback(this,function(res){
            if(res.getReturnValue() == true){
                 helper.getAllListOfVisitPlanning(component, event, helper);
                helper.showToastMessage('Visit Plan deleted successfully!','Succcess!','success');
            }else{
                helper.showToastMessage('Delete unsuccessful! Please contact your administrator.','Error!','error');
            }
        });
        $A.enqueueAction(action);
    },
    // method to get lat long of logged in user
    getLatLongOfLoggedInUser : function(component,event,helper){
        var t0 = performance.now();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                component.set("v.latitude",lat);
                component.set("v.longitude",lon);                    
            });
             helper.updateVisitPlanCheckInLocation(component,event,helper); 
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
    // helper method to clone the visits from source date to future plan date
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
                    helper.getAllListOfVisitPlanning(component, event,helper);
                }else{
                    helper.showToastMessage('Cloned unsuccessful! Please contact your administrator.','Error!','error'); 
                }
            }
        });
        $A.enqueueAction(action);
    }
 })