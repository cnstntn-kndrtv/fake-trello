module.exports = {

  friendlyName: 'Get task index (order) in list',


  description: 'Returns a last index of tasks array in list',


  inputs: {

    listId: {
      type: 'number',
      required: true
    }

  },
  
  exits: {

    success: {
      outputFriendlyName: 'Current index',
      outputDescription: 'order in list',
    },

    noListFound: {
      description: 'List not found'
    }

  },


  fn: function (inputs, exits) {
     List.find({
         id: inputs.listId
     })
     .populate('tasks')
     .exec((error, lists) => {
         if (error) return exits.noListFound();
         if (lists.length === 0) return exits.noListFound();
         let list = lists[0];
         let index = list.tasks.length || 1;
         console.log('---list', list);
         console.log('---index', index);
         
         
         return exits.success(index);
     })
  }

};