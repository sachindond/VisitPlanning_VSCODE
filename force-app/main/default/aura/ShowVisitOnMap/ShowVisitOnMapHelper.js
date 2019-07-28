({
    // Method to get list of visits with checkout lat long
    getVisitPlans : function(component, event, helper) {
        var action = component.get('c.getListOfVisitPlanRecords');
        var dateFieldValue = component.get("v.selectedDate");
        var selectedSubordinate = component.find("idSubordinate").get("v.value");
        
        action.setParams({'dateVar': dateFieldValue,
                          'selectedUser':selectedSubordinate});
        action.setCallback(this,function(res){
            console.log('**',res.getReturnValue());
            var listOfVisitPlanning = res.getReturnValue();
            
            component.set("v.VisitPlanningRecords",listOfVisitPlanning);
             var marker = [];
            if(listOfVisitPlanning.length>0){
               
               
                for(var i=0;i<listOfVisitPlanning.length;i++){
                    marker.push({location:{Latitude:listOfVisitPlanning[i].latitude,Longitude:listOfVisitPlanning[i].longitude},icon:'standard:location',title:listOfVisitPlanning[i].lookupRecordName});
                   
                    
                    component.set('v.mapMarkers',marker);
                }
            }else{
				component.set('v.mapMarkers',marker);
            }
            
        });
        $A.enqueueAction(action);
    },
    getSubordinateList: function(component, event, helper){
        var action = component.get('c.getSubordinate');
        var opts=[];
  		opts.push({ class: "optionClass", label:"None", value:"None"});
        action.setCallback(this,function(res){
   			var userList = res.getReturnValue();
          
            for(var i=0;i<userList.length;i++){
                 opts.push({ class: "optionClass", label:userList[i].userName, value:userList[i].userId});
            }
            
            component.set("v.subordinateList",opts);
        });
        $A.enqueueAction(action);
    }
})