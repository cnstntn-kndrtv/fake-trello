module.exports = {

  friendlyName: 'Get list index (order) on board',


  description: 'Returns a last index of lists array in board',


  inputs: {

    boardId: {
      type: 'number',
      required: true
    }

  },
  
  exits: {

    success: {
      outputFriendlyName: 'Current index',
      outputDescription: 'order on board',
    },

    noBoardsFound: {
      description: 'Board not found'
    }

  },


  fn: async function (inputs, exits) {
     Board.find({
         id: inputs.boardId
     })
     .populate('lists')
     .exec((error, boards) => {
         if (error) return exits.noBoardsFound();
         if (boards.length === 0) return exits.noBoardsFound();
         let board = boards[0];
         let index = board.lists.length;
         return exits.success(index);
     })
  }

};