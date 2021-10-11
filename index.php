<html lang="en_us">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
        <link href="css/bootstrap-5.1.1/bootstrap.min.css" rel="stylesheet">
        <title>TypeForm</title>
        <link rel="stylesheet" href="css/style.css">
        <script src="js/jquery-3.5.1/jquery-3.5.1.min.js"></script>
        <link rel="stylesheet" href="css/fontawesome-6.0.0/css/all.min.css">
        <link rel="stylesheet" href="css/intlTelInput.css">
	    <link rel="stylesheet" href="css/intlTelInput.min.css"/>

    </head>
    <body>
        <div class="container-fluid">
            <div class="bar">
                <div class='bar-filled'></div>
            </div>
        </div>
        <!-- <div class="loader">
            <img src="public/imgs/—Pngtree—web ui design 2 5d_4592593.png" width="100%" frameborder="0" scrolling="no" >
        </div> -->
        <div class="container">
            <form class="form" autocomplete="on" data-countrycode='ca'>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q5">Enter you age: </label>
                        <div class="form-input-phone">
                            <input type="text" name="q5" class='form-element form-data mb-2 inptfielsd main phone' placeholder="041 2345678" required>
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q00">Enter you age: </label>
                        <div class='form-input-matrix'>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Choice 1</th>
                                        <th>Choice 2</th>
                                        <th>Choice 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Hey</td>
                                        <td><input type="radio" name="q00" class="matrix form-data" value="choice1" required></td>
                                        <td><input type="radio" name="q00" class="matrix form-data" value="choice2" required></td>
                                        <td><input type="radio" name="q00" class="matrix form-data" value="choice3"required></td>
                                    </tr>
                                    <tr>
                                        <td>Hi</td>
                                        <td><input type="radio" name="q01" class="matrix form-data" required></td>
                                        <td><input type="radio" name="q01" class="matrix form-data" required></td>
                                        <td><input type="radio" name="q01" class="matrix form-data" required></td>
                                    </tr>
                                    <tr>
                                        <td>hello</td>
                                        <td><input type="radio" name="q02" class="matrix form-data" required></td>
                                        <td><input type="radio" name="q02" class="matrix form-data" required></td>
                                        <td><input type="radio" name="q02" class="matrix form-data" required></td>
                                    </tr>
                                </tbody>
                            </table> 
                            <span class='matrix-clear'>Clear all</span>                     
                            <input type="hidden" class="hidden-matrix main" required>
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q00">Enter you age: </label>
                        <div class='form-input-date'>
                            <div class='date-year'></div>
                            <div class='date-month'></div>
                            <div class='date-day'></div>
                            <input type="hidden" name="q00" class="hidden-date main form-data" required>                        
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q00">Enter you age: </label>
                        <div class='form-input-scale'>
                            <input type="hidden" name="q00" class="hidden-scale main form-data" required>                        
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q0">Enter you age: </label>
                        <div class='form-input-rating'>
                            <input type="hidden" name="q0" class="hidden-rating main form-data" required>                        
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q5">Enter you age: </label>
                        <div class="form-input-dropdown">
                            <div class="form-dropdown-flex">
                                <input type="text" name="q5" class="form-element main form-data" placeholder="Type or select an option..." autocomplete="off" required>
                            </div>
                            <div class="form-dropdown-content">
                                <div class="form-dropdown-element">
                                    <span>hello</span>
                                </div>
                                <div class="form-dropdown-element">
                                    <span>hi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q1">What is your name? </label>
                        <div class="form-input-text">
                            <textarea class="form-element main form-data" name="q1" required></textarea>
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q2">What is your name? </label>
                        <div class="form-input-text">
                            <input type="text" class="form-element main form-data" name="q2" required>
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q4">Enter you age: </label>
                        <div class="form-input-yes-no">
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Yes</span>
                            </div>
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">No</span>
                            </div>
                            <input type="hidden" name="q4" class="hidden-radio form-data main" required>                        
                        </div>
                    </div>
                </div>
               
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q6">Enter you age: </label>
                        <div class="form-input-radio">
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Hello</span>
                            </div>
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Hi</span>
                            </div>
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Hola</span>
                            </div>
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Bonjour</span>
                            </div>
                            <input type="hidden" name="q6" class="hidden-radio main form-data">
                        </div>
                    </div>
                </div>
                <div class='form-item'>
                    <div class="form-content">
                        <label class='form-title' for="q7">Enter you age: </label>
                        <div class="form-input-radio">
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Hello</span>
                            </div>
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Hi</span>
                            </div>
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Hola</span>
                            </div>
                            <div class='form-element'>
                                <span class="form-element-key">Key</span>
                                <span class="form-element-text">Bonjour</span>
                            </div>
                            <input type="hidden" name="q7" class="hidden-radio main form-data" required>
                        </div>
                    </div>
                </div>  
            </form>
            <footer class='footer'>
                <i class="footer-arrow footer-arrow-up fa fa-thin fa-angle-up"></i> 
                <i class="footer-arrow footer-arrow-down fa fa-thin fa-angle-down"></i>
            </footer>
        </div>
        <script src="js/intlTelInput.min.js"></script>
        <script src="js/intlTelInput-jquery.min.js"></script>
        <script src="js/utils.js"></script>
        <script src="js/main.js"></script>
        <script src="js/bootstrap-5.1.1/bootstrap.bundle.min.js"></script>
    </body>
</html>