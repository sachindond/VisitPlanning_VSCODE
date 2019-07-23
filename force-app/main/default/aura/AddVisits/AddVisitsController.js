({
    doInit : function(component, event, helper) {
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set('v.selectedDate', today);
		console.log("** do Init **");
        helper.getObjectList(component, event, helper);
	},
	saveVisits : function(component, event, helper) {
		var selectedObjectAPIName = component.get('v.selectedValue');
        var selectedObjectRecord = component.get("v.selectedLookUpRecord");
        console.log("****selectedLookUpRecord***",selectedObjectRecord);
        var selectedVisitDate = component.find("idVisitDate").get("v.value");
        console.log("selectedVisitDate****",selectedVisitDate);
        var reasonForVisit = component.find("idVisitReason").get("v.value");
        console.log("***reasonForVisit",reasonForVisit);
        
        // save visit record
        if(typeof(selectedObjectRecord.Id)=='undefined'){
             helper.showToastMessage('Incomplete Information! Please make sure to select whom do you want to visit (Visit To).','Error!','error');
            return false;
        }
        if(reasonForVisit==''){
            console.log("****reasonForVisit null");
            var visitsTextBox = component.find("idVisitReason");
            visitsTextBox.set("v.errors", [{message:"Please add reason for visit."}]);
            return false;
        }
        
        var action = component.get("c.saveVisitPlanningRecord");
        action.setParams({'objectAPIName':selectedObjectAPIName,
                          'objectRecordId':selectedObjectRecord.Id,
                          'selectedVisitDate':selectedVisitDate,
                          'reasonForVisit' :reasonForVisit});
        action.setCallback(this,function(res){
            
            if(res.getState()==='SUCCESS'){
                var returnResponse = res.getReturnValue();
                console.log("***Return After Save ***",returnResponse);
                if(returnResponse == true){
                    // call helper to show toast message
                    helper.showToastMessage('Visit plan added successfully!','Success!','success');
                    var reasonForVisit = component.find("idVisitReason").set("v.value","");
                    component.set("v.selectedLookUpRecord",{});
                }else{
                    helper.showToastMessage('Something went wrong! Please contact your administrator.','Error!','error');
                }
            }
        });
        $A.enqueueAction(action);
  	},
    // This method nevigate from add component to view lightning component
    viewPlannedVisits: function(component, event, helper) {
        /*
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:ViewPlannedVisits"
            
        });
        evt.fire();
        */
        var navService = component.find("navService");
        var pageReference = {
            "type": "standard__component",
            "attributes": {
                "componentName": "c__ViewPlannedVisits"
            }, 
            "state": {
                'message':'Navigating to visit plan view.'
            }
        };
        navService.navigate(pageReference);
    },
    clearData : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },
    // method set previous date based on selected input date
    onClickPreviousDateButton :function (component, event,helper) {
        var currentDate = new Date(component.get('v.selectedDate'));
        var previousDay = new Date(currentDate);
        previousDay.setDate(currentDate.getDate() - 1);
        var setpreviousDate = $A.localizationService.formatDate(previousDay, "YYYY-MM-DD");
        component.set('v.selectedDate',setpreviousDate);
        
        
    },
    // method set Next date based on selected input date
    onClickNextDateButton :function (component, event,helper) {
        var currentDate = new Date(component.get('v.selectedDate'));
        var nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);
        var setNextDate = $A.localizationService.formatDate(nextDay, "YYYY-MM-DD");
        component.set('v.selectedDate',setNextDate);
      
    }
})