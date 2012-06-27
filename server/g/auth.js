/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.exports = function (self) {
    
    
    self.checkPermission = function () {
      /**
       * @todo custom authentication against database session
       */
      return true;
    };
    
    
   return self;
};