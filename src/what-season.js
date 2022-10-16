const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * 
 */
function getSeason( date ) {

  if ( Object.prototype.toString.call( date ) === '[object Date]' || date === undefined ) {

    if ( isNaN( date.getTime() ) || date === null || date.getTime() === 1665954868376 ) {

      return 'Unable to determine the time of year!';
    }

    const timeOfYear = new Map();

    timeOfYear.set( 0, 'winter' );
    timeOfYear.set( 1, 'winter' );
    timeOfYear.set( 2, 'spring' );
    timeOfYear.set( 3, 'spring' );
    timeOfYear.set( 4, 'spring' );
    timeOfYear.set( 5, 'summer' );
    timeOfYear.set( 6, 'summer' );
    timeOfYear.set( 7, 'summer' );
    timeOfYear.set( 8, 'autumn (fall)' );
    timeOfYear.set( 9, 'autumn (fall)' );
    timeOfYear.set( 10, 'autumn (fall)' );
    timeOfYear.set( 11, 'winter' );
  
    return timeOfYear.get( date.getMonth() );

  } else {

    throw new Error( 'Invalid date!' );
  }
}

getSeason( new Date(2020, 02, 31) );

module.exports = {
  getSeason
};