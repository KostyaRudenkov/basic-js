const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform( arr ) {
  
  if ( !Array.isArray( arr ) ) {

    throw new Error( "'arr' parameter must be an instance of the Array!" );
  }

  if ( arr.length == 0 ) return [];

  function commonFoo( arr, currentIndex, supIndex ) {

    const res = arr.slice();

    if ( supIndex === res.length || currentIndex === 0 )  {

      res.splice( currentIndex, 1, );

    } else {

      res.splice( currentIndex, 1, res[ supIndex ] );
    }

    return res.filter( item => item !== '--double-prev' && item !== '--discard-next' && item !== '--discard-prev' && item !== '--double-next' );
  }

  const actions = {

    '--double-next'( index ) {

      return commonFoo( this, index, index + 1 );
    },

    '--discard-prev'( index ) {

      const res = this.slice();

      if ( index === 0 ) {

        res.shift();

      } else {
        
        res.splice( index - 1, 2 );
      }

      return res.filter( item => item !== '--double-prev' && item !== '--discard-next' && item !== '--discard-prev' && item !== '--double-next' );
    },

    '--discard-next'( index ) {

      const res = this.slice();
      res.splice( index, 2 );

      return res.filter( item => item !== '--double-prev' && item !== '--discard-next' && item !== '--discard-prev' && item !== '--double-next' );
    },

    '--double-prev'( index ) {

      return commonFoo( this, index, index - 1 );
    },
  }

  for ( let prop in actions ) {

    if ( arr.includes( prop ) ) {

      return actions[ prop ].call( arr, arr.indexOf( prop ) );
    } 
  }
}

module.exports = {
  transform
};
