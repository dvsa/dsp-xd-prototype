  module.exports = function (router) {

    var sprint = 'v1'
     router.post('/' + sprint + '/signin_validation', function (req, res) {
            var gi = req.session.data.gid;
            var pw = req.session.data.pword;
            var gid = "12345678"; 
            var password1 = "password";  
            if ((gi == gid) && (pw == password1)) {
                req.session.data.login_error = false;
                res.redirect('options');
            }
            else {
                req.session.data.login_error = true;
                res.redirect('signin');
            }
      } 

      )

}