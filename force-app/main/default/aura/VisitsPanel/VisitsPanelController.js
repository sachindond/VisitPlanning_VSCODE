({
    
    allowDrop: function(component, event, helper) {
        event.preventDefault();
    },
    
    onDrop: function(component, event, helper) {
        event.preventDefault();
        console.log('inside visit Panel onDrop method...');
        console.log('data: ', event.dataTransfer.getData('text'));
        var dragDropEvent = component.getEvent('DragDropEvent');
        dragDropEvent.setParams({
            'VisitItem': event.dataTransfer.getData('text')
        });
        console.log('VisitItem: ' , dragDropEvent.getParam('VisitItem'));
        dragDropEvent.fire();        
    },
})