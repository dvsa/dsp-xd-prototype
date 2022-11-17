  module.exports = function (router) {

    var sprint = 'v1'
     router.post('/' + sprint + '/code_validation', function (req, res) {
            var pw = req.session.data.mrnref;
            var password1 = "1234"; 
            if (pw == password1) {
                req.session.data.code_error = false;
                res.redirect('dashboard');
            }
            else {
                req.session.data.code_error = true;
                res.redirect('code');
            }
      } 

      )

}