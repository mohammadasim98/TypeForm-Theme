
function Form(){
    var self = this;
    this.maxCount = $('.form-item').length;
    this.counter = 0,
    this.speed = 400,
    this.xDown = null;                                                        
    this.yDown = null;
    this.xUp = null;                                    
    this.yUp = null;
    this.xDiff = null;
    this.yDiff = null;
    this.delta = null;
    this.blinkSpeed = 115;
    this.autoNextDelay = 700;
    this.blinkAmount = 2;
    this.minBlinkOpacity = 0.2;
    this.maxBlinkOpacity = 1;
    this.progCount = 0;
    this.trackPadScrollSensitivity = 50;
    this.errorPos = null;
    this.errorShow = false;
    this.desiredPos = null;
    this.desiredPosFlag = false;
    this.errorMessage= '';
    this.dontHideDropDown = false;
    this.dontToggleDropDownArrow = false;
    this.scaleLength = 10;
    this.ratingLength = 5;
    this.wiggleSpeed = 70;
    this.wiggleCount = 4;
    this.wiggleAmount = '7px';
    this.wiggleAutoRemoveDelay = 3000;
    this.wiggleFlag = false;
    this.wiggleNumber = 0;
    this.wiggleResetDelay = 1000;
    this.flag = false;
    this.init = function(){
        self.initIntlPhone();
        self.addElements();
        self.bindEvents();
        self.showUp();
        self.checkFooterArrowDisabled();
        self.updateProgbar();
    };
    this.show = function(){
        if(self.counter - self.desiredPos > 0){
            while(self.counter != self.desiredPos){
                self.moveBackward();
            }
        }else if(self.counter - self.desiredPos < 0){
            while(self.counter != self.desiredPos){
                self.moveBackward();
            }
        }
        self.checkFooterArrowDisabled();
    };
    this.showUp = function(){
        $('.form-item').eq(self.counter).show().animate({
            top: '0px',
            opacity: '100%',
        }, self.speed);
    };
    this.hideUp = function(){
        $('.form-item').eq(self.counter).animate({
            top: '-200px',
            opacity: '0%',
        }, self.speed-150, 'swing').hide(self.speed);
    };
    this.showDown = function(){
        $('.form-item').eq(self.counter).show(self.speed).animate({
            top: '0px',
            opacity: '100%',
        }, self.speed-100, 'swing');
    };
    this.hideDown = function(){
        $('.form-item').eq(self.counter).animate({
            top: '+200px',
            opacity: '0%',
        }, self.speed, 'swing').hide(self.speed);
    };
    this.moveForward = function(){
        if(self.counter < self.maxCount-1){
            self.hideUp(self.counter);
            self.counter += 1;
            self.showUp(self.counter);
        }
        self.checkFooterArrowDisabled();
    }
    this.moveBackward = function(){
        if(self.counter != 0){
            self.hideDown(self.counter);
            self.counter -= 1;
            self.showDown(self.counter);
        }
        self.checkFooterArrowDisabled();
    }
    this.wiggle = function(){
        if(!self.wiggleFlag){
            self.wiggleFlag = true;
            for(i = 0; i<self.wiggleCount; i++){
                self.wiggleNumber = i;
                $('.form-item').eq(self.counter).animate({'left': self.wiggleAmount}, self.wiggleSpeed);
                $('.form-item').eq(self.counter).animate({'left': '0px'}, self.wiggleSpeed, function(){
                    if(self.wiggleNumber == self.wiggleCount-1){
                        setTimeout(function(){
                            self.wiggleFlag = false;
                        }, self.wiggleResetDelay);
                        self.wiggleNumber = 0;
                    }                
                });
                
            }
        }
    };
    this.initIntlPhone = function(){
        var input = document.getElementsByClassName("phone");
        var code = $('.form').attr('data-countrycode');
        var pref;
        if(code =='ca'){
            pref = [code, 'nz', 'au', 'us'];
        }else if(code =='nz'){
            pref = [code, 'ca', 'au', 'us'];
        }else if(code =='au'){
            pref = [code, 'nz', 'ca', 'us'];
        }
        for(i=0; i<input.length;i++){
            window.intlTelInput(input[i], {
                separateDialCode: true,
                preferredCountries: pref,
                customPlaceholder: function (
                    selectedCountryPlaceholder,
                    selectedCountryData
                ) {
                    return "e.g. " + selectedCountryPlaceholder;
                },
                
            });
        }
    };
    this.updateProgbar = function(){
        for(i=0; i<$('.form-item').find('.main').length; i++){
            if($('.form-item').find('.main').eq(i).val()){
                self.progCount += 1;
            }
        }
        var prog = (100/self.maxCount)*self.progCount;
        $('.bar-filled').css('width', prog.toString()+'%');
        self.progCount = 0;  
    };
    this.checkFooterArrowDisabled = function(){
        if(self.counter == 0){
            $('.footer-arrow-up').css('color', self.getColor('--form-button-arrow-disabled-color'));
            $('.footer-arrow-up').css('cursor', 'auto');
            $('.footer-arrow-down').css('color', self.getColor('--form-button-text-color'));
            $('.footer-arrow-down').css('cursor', 'pointer');
        }else if(self.counter == self.maxCount-1){
            $('.footer-arrow-down').css('color', self.getColor('--form-button-arrow-disabled-color'));
            $('.footer-arrow-down').css('cursor', 'auto');
            $('.footer-arrow-up').css('color', self.getColor('--form-button-text-color'));
            $('.footer-arrow-up').css('cursor', 'pointer');
        }else{
            $('.footer-arrow-down').css('color', self.getColor('--form-button-text-color'));
            $('.footer-arrow-up').css('color', self.getColor('--form-button-text-color'));
            $('.footer-arrow-up').css('cursor', 'pointer');
            $('.footer-arrow-down').css('cursor', 'pointer');
        }
        if(self.maxCount == 1){
            $('.footer-arrow-down').css('color', self.getColor('--form-button-arrow-disabled-color'));
            $('.footer-arrow-down').css('cursor', 'auto');
            $('.footer-arrow-up').css('color', self.getColor('--form-button-arrow-disabled-color'));
            $('.footer-arrow-up').css('cursor', 'auto');
        }
    }

    this.handleTouchStart = function(e){
        const firstTouch = (e.touches || e.originalEvent.touches)[0];                                      
        self.xDown = firstTouch.clientX;                                      
        self.yDown = firstTouch.clientY;                                      
    }; 
    this.handleTouchMove = function(e){
        if(!self.xDown||!self.yDown){
            return;
        }
        self.xUp = e.touches[0].clientX;                                    
        self.yUp = e.touches[0].clientY;
        self.xDiff = self.xDown - self.xUp;
        self.yDiff = self.yDown - self.yUp;                                                                  
        if(Math.abs(self.xDiff) <= Math.abs(self.yDiff)){
            if ( self.yDiff <= 0 ) {
                self.moveBackward();
            } else { 
                self.moveForward();
            } 
            self.updateProgbar();                                                               
        }
        self.xDown = null;
        self.yDown = null;                                             
    };
    this.addElements = function(){
        $('.form-item').css('opacity', '0%');
        $('.form-item').eq(0).css('top', '400px');
        for(i=1; i<=self.maxCount; i++){
            $('<div class="form-numbering">'+i+'</div>').insertBefore($('.form-content').eq(i-1));
            $('<div class="form-numbering-arrow"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>').insertBefore($('.form-content').eq(i-1));
        }
        for(i=0; i<self.maxCount; i++){
            for(j=0; j<$('.form-item').eq(i).find('.form-input-radio .form-element, .form-dropdown-element').length
            ; j++){
                $('.form-item').eq(i).find('.form-input-radio .form-element, .form-dropdown-element').eq(j).append('<span class="form-element-tick"><i class="fa fa-check" aria-hidden="true"></i></span>');
                $('<div class="form-element-label">'+String.fromCharCode('a'.charCodeAt(0)+j).toUpperCase()+'</div>').insertBefore($('.form-item').eq(i).find('.form-element-text', '.form-dropdown-element').eq(j));
            }
            for(j=0; j<$('.form-item').eq(i).find('.form-input-yes-no .form-element').length
            ; j++){
                $('.form-item').eq(i).find('.form-input-yes-no .form-element').eq(j).append('<span class="form-element-tick"><i class="fa fa-check" aria-hidden="true"></i></span>');
                $('<div class="form-element-label">'+$('.form-item').eq(i).find('.form-input-yes-no .form-element').eq(j).find('.form-element-text').text()[0]+'</div>').insertBefore($('.form-item').eq(i).find('.form-element-text').eq(j));
            }
            for(j=0; j<$('.form-item').eq(i).find('.rating-star').length; j++){
                $('.form-item').eq(i).find('.rating-star').eq(j).append("<span class='rating-star-numbering'>"+(j+1)+"</span>");
            }
            if(i<self.maxCount-1){
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button">OK <i class="fa fa-light fa-check"></i></span>');
                $('.form-item').eq(i).find('.form-content').css('width', '100%');
                if($('.form-item').eq(i).find('.form-input-text, .form-input-dropdown, .form-input-date').length){
                    if(!$('.form-item').eq(i).find('.form-input-dropdown').length){
                        $('.form-item').eq(i).find('.form-content').append('<span class="form-button-enter">press <strong>Enter ↵</strong></span>');
                    }else{
                        $('.form-item').eq(i).find('.form-dropdown-flex').append('<div class="form-dropdown-arrow"><i class="dropdown-arrow-element fa fa-thin fa-angle-down"></i></div>');
                    }
                }
                if($('.form-item').eq(i).find('.form-input-scale').length){
                    for(j=0; j<=self.scaleLength; j++){
                        $('.form-item').eq(i).find('.form-input-scale').append('<div class="form-element">'+j+'</div>');
                    }
                }
                if($('.form-item').eq(i).find('.form-input-date').length){
                    $('.form-item').eq(i).find('.date-month').append("<span>Month</span><input type='text' class='form-element'>");
                    $("<span class='date-slash'>/</span>").insertAfter($('.form-item').eq(i).find('.form-input-date>div').eq(0));
                    $("<span class='date-slash'>/</span>").insertAfter($('.form-item').eq(i).find('.form-input-date>div').eq(1));


                    $('.form-item').eq(i).find('.date-day').append("<span>Day</span><input type='text' class='form-element'>");
                    $('.form-item').eq(i).find('.date-year').append("<span>Year</span><input type='text' class='form-element'>");
                }
                if($('.form-item').eq(i).find('.form-input-rating').length){
                    $('.form-item').eq(i).find('.form-input-rating').append("<div class='form-element'></div>");
                    for(j=0; j< self.ratingLength; j++){
                        $('.form-item').eq(i).find('.form-element').append("<div class='rating-star'><i class='fa-regular fa-star'></i></div>");
                    }
                }
                if($('.form-item').eq(i).find('.form-input-phone').length){
                    $('.form-item').eq(i).find('.form-content').append('<span class="form-button-enter">press <strong>Enter ↵</strong></span>');
                }
            }else{
                $('.form-item').eq(i).find('.form-content').css('width', '100%');
                if($('.form-item').eq(i).find('.form-input-text, .form-input-dropdown').length){
                }
                if($('.form-item').eq(i).find('.form-input-dropdown').length){
                    $('.form-item').eq(i).find('.form-dropdown-flex').append('<div class="form-dropdown-arrow"><i class="dropdown-arrow-element fa fa-thin fa-angle-down"></i></div>');
                }
                if($('.form-item').eq(i).find('.form-input-scale').length){
                    for(j=0; j<=self.scaleLength; j++){
                        $('.form-item').eq(i).find('.form-input-scale').append('<div class="form-element">'+j+'</div>');
                    }
                }
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button form-submit">Submit</i> </span>');
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button-enter">press <strong>Ctrl + Enter ↵</strong></span>');

            }
            $('.form-item').eq(i).find('.form-content').append('<div class="error"></div>');
            $('.error').eq(i).hide();   
        }
        $('.form-element-tick').css('visibility', 'hidden');
        $('.iti__arrow').removeClass('iti__arrow iti__arrow--up').addClass('fa fa-angle-down');
        $('.iti__selected-dial-code').remove();
    };
    this.dropDownAngleUp = function(ele){
        if(!self.dontToggleDropDownArrow){
            ele.removeClass('fa-angle-down').removeClass('fa-close').addClass('fa-angle-up');
        }
        ele.parent().parent().parent().find('.form-dropdown-content').show();
        ele.parent().parent().css('border-bottom', '2px solid '+self.getColor('--text-element-border-focus-color'));
        ele.parent().parent().parent().parent().find('.form-button').hide();
        ele.parent().parent().parent().parent().find('.form-button-enter').hide();
    };
    this.dropDownAngleDown = function(ele, flag = true){
        if(!self.dontToggleDropDownArrow){
            ele.removeClass('fa-angle-up').removeClass('fa-close').addClass('fa-angle-down');
        }
        ele.parent().parent().parent().find('.form-dropdown-content').hide();
        ele.parent().parent().css('border-bottom', '');
        if(flag){
            ele.parent().parent().parent().parent().find('.form-button').show();
            ele.parent().parent().parent().parent().find('.form-button-enter').show();
        }
    };
    this.dropDownAngleClose = function(ele){
        ele.removeClass('fa-angle-down').removeClass('fa-angle-up').addClass('fa-close');
        ele.parent().parent().parent().find('.form-dropdown-content').show();
        ele.parent().parent().css('border-bottom', '2px solid '+self.getColor('--text-element-border-focus-color'));
        ele.parent().parent().parent().parent().find('.form-button').hide();
        ele.parent().parent().parent().parent().find('.form-button-enter').hide();
    };
    this.resetDropDown = function(dropDownElements){
        var dropDownEle = "";
        var dropDownText = "";
        var startBold = '<strong class="form-dropdown-strong">';
        var endBold = '</strong>';
        for(i=0; i<dropDownElements.length; i++){
            dropDownEle = $(dropDownElements).eq(i);
            dropDownText = dropDownEle.text().trim();
            $(dropDownElements).eq(i).find('span').eq(0).html(dropDownEle.find('span').eq(0).html().replace(startBold, '').replace(endBold, ''));
            $(dropDownElements).eq(i).show();
            $(dropDownElements).eq(i).find('.form-element-tick').css('visibility', 'hidden');
            $(dropDownElements).eq(i).css('border', '0.5px solid' + self.getColor('--radio-element-border-active-color'));
        }
    }
    this.getColor = function(text){
        return  getComputedStyle(document.documentElement).getPropertyValue(text);
    }
    this.showError = function(){
        if(self.errorShow){
            $('.form-item').eq(self.errorPos).find('.form-button').hide();
            $('.form-item').eq(self.errorPos).find('.form-button-enter').hide();
            $('.form-item').eq(self.errorPos).find('.error').show();
            $('.form-item').eq(self.errorPos).find('.error').html('<i class="fa-solid fa-triangle-exclamation"></i> '+self.errorMessage);
        }
    };
    this.hideError = function(flag=true, allowButtonShow=true){
        if(!self.errorShow){
            if(flag){
                self.desiredPos = self.counter + 1;
            }
            $('.form-item').eq(self.counter).find('.error').hide();
            if(allowButtonShow){
                $('.form-item').eq(self.counter).find('.form-button').show();
                $('.form-item').eq(self.counter).find('.form-button-enter').show();
            }
        }
    };
    this.bindEvents = function(){
        document.addEventListener('touchstart', self.handleTouchStart, false);        
        document.addEventListener('touchmove', self.handleTouchMove, false);
        $('.form-button').click(function(e){
            if($(this).parent().find('.form-input-date').length){
                if(!(!$(this).parent().find('.date-month .form-element').val()&&!$(this).parent().find('.date-day .form-element').val()
                &&!$(this).parent().find('.date-year .form-element').val())&&!($(this).parent().find('.date-month .form-element').val()&&$(this).parent().find('.date-day .form-element').val()
                &&$(this).parent().find('.date-year .form-element').val())){
                    self.errorShow = true;
                    self.errorPos = self.counter;
                    self.errorMessage = "That date doesn't look valid—it's incomplete or doesn't exist";
                    self.showError();
                    return;
                }
            }
            self.moveForward();
        });
        $('.footer-arrow-up').click(function(e){
            self.moveBackward();
            e.preventDefault();
        });
        $('.footer-arrow-down').click(function(e){
            self.moveForward();
            e.preventDefault();
        });
        $(window).on('wheel', function(e) {
            self.delta = e.originalEvent.deltaY;
            if (self.delta>self.trackPadScrollSensitivity){
                if($('.form-item').eq(self.counter).find('.form-input-phone').length || $('.form-item').eq(self.counter).find('.form-input-dropdown').length){
                    if($('.form-item').eq(self.counter).find('.iti__country-list').hasClass('iti__hide') || $('.form-item').eq(self.counter).find('.form-dropdown-content').css('display') == 'none'){
                        self.moveForward();
                    }
                }else{
                    self.moveForward();
                }
            }
            else if(self.delta<-self.trackPadScrollSensitivity){
                if($('.form-item').eq(self.counter).find('.form-input-phone').length || $('.form-item').eq(self.counter).find('.form-input-dropdown').length){
                    if($('.form-item').eq(self.counter).find('.iti__country-list').hasClass('iti__hide') || 
                    $('.form-item').eq(self.counter).find('.form-dropdown-content').css('display') == 'none'){
                        self.moveBackward();
                    }
                }else{
                    self.moveBackward();
                }
            }
            self.updateProgbar();
        });
        $(document).click(function(e){
            self.updateProgbar();
            if(!($(e.target).hasClass('form-element') || $(e.target).hasClass('dropdown-arrow-element') || $(e.target).hasClass('footer-arrow'))){
                if(!self.dontHideDropDown){
                    $('.form-dropdown-content').hide();
                    if($(e.target).hasClass('form-submit')||self.errorShow==true || !$('.form-item').eq(self.counter).find('.form-input-dropdown').length){
                        self.dropDownAngleDown($('.form-dropdown-arrow i'), false);
                    }else{
                        self.dropDownAngleDown($('.form-dropdown-arrow i'));
                    }
                }
                self.dontHideDropDown = false;
            }
            $(this).parent().parent().parent().find('.form-button').show();
            if($(e.target).hasClass('container') || $(e.target).is('body') || $(e.target).hasClass('form-item') || $(e.target).hasClass('form-content')
            || $(e.target).hasClass('form-input-phone') || $(e.target).hasClass('form') || $(e.target).hasClass('form-numbering-arrow') 
            || $(e.target).hasClass('form-numbering') || $(e.target).hasClass('iti__country-list')
            || $(e.target).hasClass('form-title')){
                $('.form-item').eq(self.counter).find('.iti__country-list').css('border-color', self.getColor('--radio-element-border-color'));
                $('.form-item').eq(self.counter).find('.iti__country-list').animate({
                    'top': '15px',
                    'opacity':'0%',
                    'border-width': '0.5px'
                },300, 'swing');
                if(!self.errorShow){
                    $('.form-item').eq(self.counter).find('.form-button').show();
                }
                $('.form-item').eq(self.counter).find('.iti__country-list').hide();
                $('.form-item').eq(self.counter).find('.iti__selected-flag').show();
                $('.form-item').eq(self.counter).find('.iti__selected-flag').css('border-bottom', self.getColor('--radio-element-border-color') + " 0.5px solid");
                $('.form-item').eq(self.counter).find('.form-element').show();
            }
        });
        $('.form-input-radio .form-element, .form-input-yes-no .form-element').click(function(){
            if($(this).find('.form-element-tick').css('visibility')=='visible'){
                $(this).parent().find('.hidden-radio').val('');
                $(this).find('.form-element-label, .form-element-key').css('background-color', '');
                $(this).find('.form-element-label, .form-element-key').css('color', '');
                $(this).find('.form-element-label, .form-element-key').css('border', '');
                $(this).find('.form-element').css('border', '');
                $(this).find('.form-element-tick').css('visibility', 'hidden');   
                $(this).css('border', '');    
            }else{
                $(this).parent().find('.hidden-radio').val($(this).find('.form-element-text').text());
                $(this).parent().find('.form-element-label, .form-element-key').css('background-color', '');
                $(this).parent().find('.form-element-label, .form-element-key').css('color', '');
                $(this).parent().find('.form-element-label, .form-element-key').css('border', '');
                $(this).parent().find('.form-element').css('border', '');
                $(this).parent().find('.form-element-tick').css('visibility', 'hidden');
                $(this).find('.form-element-tick').css('visibility', 'visible');
                $(this).find('.form-element-label, .form-element-key').css('background-color', self.getColor('--radio-element-key-label-bg-active-color'));
                $(this).find('.form-element-label, .form-element-key').css('color', self.getColor('--bg-color'));
                $(this).find('.form-element-label, .form-element-key').css('border-color', self.getColor('--radio-element-key-label-border-active-color'));
                for(i=0;i<self.blinkAmount;i++) {
                    $(this).fadeTo(self.blinkSpeed, self.minBlinkOpacity).fadeTo(self.blinkSpeed, self.maxBlinkOpacity);
                }
                $(this).css('border', self.getColor('--radio-element-border-active-color') + ' 2px solid');    
                setTimeout(function(){
                    self.moveForward();
                },self.autoNextDelay);   
            }
            if($(this).parent().parent().find('error')){
                self.errorShow = false;
                self.hideError();
            }
            self.updateProgbar();
        });
        $('.form-input-text .form-element').keyup(function(e){
            self.updateProgbar();
            if($(this).parent().find('error')){
                self.errorShow = false;
                self.hideError();
            }
            if(e.keyCode == 13){
                e.preventDefault();
                self.moveForward();
            }
        });
        $(document).keydown(function(e){
            self.updateProgbar();
            if(e.keyCode == 13 && e.ctrlKey && self.counter == self.maxCount - 1){
                $(".form-submit").click();
            }
        });
        $('.form').submit(function(e){
            if(self.counter < self.maxCount-1){
                e.preventDefault();
            }
        });
        $('.form-submit').click(function(){
            for(i=0; i<$('.form-item').length; i++){
                if($('.form-item').eq(i).find('input').filter(function(){
                    return $(this).prop('required'); 
                }).length > 0){
                    if($('.form-item').eq(i).find('input').filter(function(){
                        return $.trim($(this).val()).length == 0
                    }).length == 0){
                        continue;
                    }
                    else{
                        self.errorPos = i;
                        if(!self.desiredPosFlag){
                            self.desiredPos = i;
                            self.desiredPosFlag = true;
                        }
                        self.errorShow = true;
                        self.errorMessage = 'Please fill this in';
                        self.showError();
                    }
                }
            }
            if(!self.errorShow){
                $('.form').submit();
            }else{
                self.show();
                self.desiredPosFlag = false;
            }
        });
        $('.form-input-rating .form-element i').click(function(){
            if((!$(this).parent().next().find('i').hasClass('fa-regular') || $(this).hasClass('fa-regular'))&&!$(this).hasClass('fa-solid')){
                $(this).removeClass('fa-regular');
                $(this).addClass('fa-solid');
                $(this).parent().prevAll().find('i').removeClass('fa-regular');
                $(this).parent().prevAll().find('i').addClass('fa-solid');
                $(this).parent().nextAll().find('i').removeClass('fa-solid');
                $(this).parent().nextAll().find('i').addClass('fa-regular');
                for(i=0;i<self.blinkAmount;i++) {
                    $(this).fadeTo(self.blinkSpeed, self.minBlinkOpacity).fadeTo(self.blinkSpeed, self.maxBlinkOpacity);
                }
                setTimeout(function(){
                    self.moveForward();
                },self.autoNextDelay); 
                $(this).parent().parent().siblings().attr('value', $(this).parent().prevAll().find('i').length+1)  
            }else{
                $(this).parent().prevAll().find('i').removeClass('fa-solid');
                $(this).parent().prevAll().find('i').addClass('fa-regular');
                $(this).removeClass('fa-solid');
                $(this).addClass('fa-regular');
                $(this).parent().parent().siblings().attr('value', '')  
            }
            if($(this).parent().parent().find('error')){
                self.errorShow = false;
                self.hideError();
            }
            self.updateProgbar();
        });
        $('.form-input-dropdown .form-element').click(function(){
            if($(this).val()){
                self.dontToggleDropDownArrow = true;
                $(this).parent().parent().find('.form-dropdown-content').toggle();
                $(this).parent().parent().parent().find('.form-button').toggle();
            }else{
                self.dontToggleDropDownArrow = false;
                if($(this).siblings().find('.dropdown-arrow-element').hasClass('fa-angle-down')){
                    self.dropDownAngleUp($(this).siblings().find('.dropdown-arrow-element'));
                }else{
                    self.dropDownAngleDown($(this).siblings().find('.dropdown-arrow-element'));
                }
            }
        });
        $('.dropdown-arrow-element').click(function(){
            self.dontToggleDropDownArrow = false;
            self.dontHideDropDown = false;
            if($(this).hasClass('fa-angle-down')){
                self.dropDownAngleUp($(this));
            }else{
                if($(this).hasClass('fa-close')){
                    $(this).parent().parent().find('.form-element').val('');
                    $(this).parent().parent().parent().find('.form-dropdown-element').css('border', '0.5px solid '+self.getColor('--radio-element-border-color'));
                    $(this).parent().parent().parent().find('.form-element-tick').css('visibility', 'hidden');
                    self.resetDropDown($(this).parent().parent().parent().find('.form-dropdown-element'));
                    self.errorShow = false;
                    self.errorPos = $(this).parent().parent().parent().parent().parent().prevAll('.form-item').length;
                    self.hideError();
                }
                self.dropDownAngleDown($(this));
            }
        });
        $('.form-dropdown-element').click(function(){
            self.dontHideDropDown = true;
            self.dontToggleDropDownArrow = true;
            $(this).parent().parent().find('.form-element').val($(this).text().trim());
            self.errorPos = $(this).parent().parent().parent().prevAll('.form-item').length;
            self.errorShow = false;
            self.hideError(false);
            
            $(this).siblings().css('border', '');
            $(this).parent().find('.form-element-tick').css('visibility', 'hidden');
            $(this).find('.form-element-tick').css('visibility', 'visible');
            for(i=0;i<self.blinkAmount;i++) {
                $(this).fadeTo(self.blinkSpeed, self.minBlinkOpacity).fadeTo(self.blinkSpeed, self.maxBlinkOpacity);
            }
            $(this).css('border', self.getColor('--radio-element-border-active-color') + ' 2px solid');    
            setTimeout(function(){
                self.moveForward();
            },self.autoNextDelay); 
            self.dropDownAngleClose($(this).parent().parent().find('.form-dropdown-arrow i'));
            $(this).parent().fadeOut('slow').hide('slow');
            $(this).parent().parent().parent().find('.form-button').show().css('opacity', '0').fadeTo(2000, '100%');
            $(this).parent().parent().parent().find('.form-button-enter').show().css('opacity', '0').fadeTo(2000, '100%');
            self.updateProgbar();
        });
        $('.form-input-dropdown .form-element').on('keyup keypress', function(){
            self.errorPos = self.counter;
            self.errorShow = false;
            self.hideError(false);

            var dropDownElements = $(this).parent().parent().find('.form-dropdown-element');
            var dropDownEle = "";
            var dropDownText = "";
            var startBold = '<strong class="form-dropdown-strong">';
            var endBold = '</strong>';
            var matches = 0;
            for(i=0; i<dropDownElements.length; i++){
                dropDownEle = $(dropDownElements).eq(i);
                dropDownText = dropDownEle.text().trim();
                
                for(j=0; j<$(this).val().length; j++){
                    $(dropDownElements).eq(i).find('span').eq(0).html(dropDownEle.find('span').eq(0).html().replace(startBold, '').replace(endBold, ''));
                    if($(this).val().toUpperCase()==dropDownText.slice(0, j+1).toUpperCase()){
                        matches += 1;
                        $(dropDownElements).eq(i).find('span').eq(0).html(dropDownText.replace(dropDownText.slice(0, j+1), startBold + dropDownText.slice(0, j+1) + endBold));
                        $(dropDownElements).eq(i).parent().show();
                        $(dropDownElements).eq(i).show();
                    }else{
                        $(dropDownElements).eq(i).find('span').eq(0).html(dropDownEle.find('span').eq(0).html().replace(startBold, '').replace(endBold, ''));
                        $(dropDownElements).eq(i).hide();
                    }
                    self.dropDownAngleClose($(dropDownElements).parent().parent().find('.form-dropdown-arrow i'));
                    self.errorPos = self.counter;
                    self.errorShow = false;
                    self.hideError(false, false);
                }
                if(!$(this).val()){
                    self.errorPos = self.counter;
                    self.errorShow = false;
                    self.dontToggleDropDownArrow = false;
                    self.dontHideDropDown = false;
                    self.resetDropDown($(this).parent().parent().find('.form-dropdown-element'));
                    self.dropDownAngleUp($(this).parent().find('.form-dropdown-arrow i'));
                    self.hideError(false, false);
                }else{
                    self.dontToggleDropDownArrow = true;
                    if(!matches){
                        $(this).parent().parent().find('.form-dropdown-content').hide();
                        self.errorShow = true;
                        self.errorMessage = 'No suggestions found';
                        self.errorPos = self.counter;
                        self.showError();
                    }
                }
            }
            self.updateProgbar();
        });
        $('.form-input-scale .form-element').click(function(){
            $(this).siblings().removeClass('current');
            $(this).parent().find('.form-element').css('border', '');
            $(this).parent().find('.form-element').css('background-color', ''); 
            if(!$(this).hasClass('current')){
                $(this).css('background-color', self.getColor('--radio-element-bg-hover-color'));
                $(this).addClass('current');
                for(i=0;i<self.blinkAmount;i++) {
                    $(this).fadeTo(self.blinkSpeed, self.minBlinkOpacity).fadeTo(self.blinkSpeed, self.maxBlinkOpacity);
                }
                $(this).css('border', self.getColor('--radio-element-border-active-color') + ' 2px solid');    
                setTimeout(function(){
                    self.moveForward();
                },self.autoNextDelay);     
                $(this).parent().find('.hidden-scale').val($(this).text());
                self.errorShow = false;
                self.errorPos = $(this).parent().parent().parent().prevAll('.form-item').length;
                self.hideError();
            }else{
                $(this).removeClass('current');
                $(this).parent().find('.hidden-scale').val('');
            }
            self.updateProgbar();
        })
        $('.form-input-date .form-element').keyup(function(e){
            if($(this).val()>12 && $(this).parent().hasClass('date-month')){
                $(this).val($(this).val().substring(0, $(this).val().length-1));
                self.errorShow = true;
                self.errorPos = self.counter;
                self.errorMessage = "That date isn't valid. Check the month and day aren't reversed.";
                self.showError();
                self.wiggle();
                setTimeout(function(){
                    self.errorShow = false;
                    self.errorPos = self.counter;
                    self.hideError();
                }, self.wiggleAutoRemoveDelay);
            }else if($(this).val()>31 && $(this).parent().hasClass('date-day')){
                $(this).val($(this).val().substring(0, $(this).val().length-1));
                self.errorShow = true;
                self.errorPos = self.counter;
                self.errorMessage = "That date isn't valid. Check the month and day aren't reversed.";
                self.showError();
                self.wiggle();
                setTimeout(function(){
                    self.errorShow = false;
                    self.errorPos = self.counter;
                    self.hideError();
                }, self.wiggleAutoRemoveDelay);
            }else if($(this).val().length>4 && $(this).parent().hasClass('date-year')){
                $(this).val($(this).val().substring(0, $(this).val().length-1));
                self.errorShow = true;
                self.errorPos = self.counter;
                self.errorMessage = "That date isn't valid. Check the month and day aren't reversed.";
                self.showError();
                self.wiggle();
                setTimeout(function(){
                    self.errorShow = false;
                    self.errorPos = self.counter;
                    self.hideError();
                }, self.wiggleAutoRemoveDelay);
            }else if(!$.isNumeric($(this).val()) && e.keyCode !=13 &&  e.keyCode !=8 &&  e.keyCode !=9
            && (e.keyCode <16 || e.keyCode >40) && e.keyCode !=45 && e.keyCode !=46 && e.keyCode!=144 
            && e.keyCode!=145  && (e.keyCode<112 || e.keyCode>123) && $(this).val()){
                $(this).val($(this).val().substring(0, $(this).val().length-1));
                self.errorShow = true;
                self.errorPos = self.counter;
                self.errorMessage = "Numbers only please";
                self.showError();
                self.wiggle();
                setTimeout(function(){
                    self.errorShow = false;
                    self.errorPos = self.counter;
                    self.hideError();
                }, self.wiggleAutoRemoveDelay);
            }else{
                if($(this).parent().parent().find('.form-element').eq(0).val() || $(this).parent().parent().find('.form-element').eq(1).val()
                || $(this).parent().parent().find('.form-element').eq(2).val()){
                    $(this).parent().parent().find('.hidden-date').val(
                        $(this).parent().parent().find('.form-element').eq(0).val() + '-' + 
                        $(this).parent().parent().find('.form-element').eq(1).val() + '-' + 
                        $(this).parent().parent().find('.form-element').eq(2).val()
                        );
                }else{
                    $(this).parent().parent().find('.hidden-date').val('');
                }
                if((($(this).parent().hasClass('date-month') || $(this).parent().hasClass('date-day')) && $(this).val().length>=2) || $(this).val().length==4){
                    $(this).parent().next().next().find('.form-element').focus();
                }
                if($(this).val().length==0 && e.keyCode == 8){
                    $(this).parent().prev().prev().find('.form-element').focus();
                }
                if($(this).val()[0]==0 && $(this).val().length >= 3){
                    $(this).val($(this).val().slice(1, $(this).val().length));
                }
                self.errorShow = false;
                self.errorPos = self.counter;
                self.hideError();
                if(e.keyCode == 13){
                    $(this).parent().parent().parent().find('.form-button').click();
                }
            }
            self.updateProgbar();
        });
        $('.matrix').click(function(){
            var flag = true
            for(i=0; i<$(this).parent().parent().parent().find('tr').length; i++){
                if($(this).parent().parent().parent().find('tr').eq(i).find('.matrix').filter(function(){
                    return $(this).prop('checked');
                }).length > 0){
                    continue;
                }else{
                    flag = false;
                    break;
                }
            }
            if(flag){
                $(this).parent().parent().parent().parent().parent().find('.hidden-matrix').val('checked');
                self.errorShow = false;
                self.errorPos = $(this).parent().parent().parent().parent().parent().parent().parent().prevAll('.form-item').prevAll().length;
                self.hideError();
            }
            self.updateProgbar();
        });
        $('.matrix-clear').click(function(){
            $(this).parent().parent().parent().parent().find('.hidden-matrix').val('');
            $(this).parent().parent().parent().parent().find('.matrix').prop('checked', false);
            self.updateProgbar();
        });

        $('.form-input-phone .form-element').keyup(function(e){
            self.errorShow = false;
            self.errorPos = self.counter;
            self.hideError();
            $(this).css('padding-left', '94px')
            if(!$.isNumeric($(this).val().replace(/\s/g, '')) && $(this).val()[0] != '+' && e.keyCode !=13 &&  e.keyCode !=8 &&  e.keyCode !=9
            && (e.keyCode <16 || e.keyCode >40) && e.keyCode !=45 && e.keyCode !=46 && e.keyCode!=144 
            && e.keyCode!=145  && (e.keyCode<112 || e.keyCode>123)){
                $(this).val($(this).val().replace(/\D/g,''));
                self.wiggle();
                self.errorShow = true;
                self.errorPos = self.counter;
                self.errorMessage = 'Numbers only please';
                self.showError();
                setTimeout(function(){
                    self.errorShow = false;
                    self.errorPos = self.counter;
                    self.hideError();
                }, self.wiggleAutoRemoveDelay);
            }else{
                if(e.keyCode !=13 &&  e.keyCode !=8 &&  e.keyCode !=9
                && (e.keyCode <16 || e.keyCode >40) && e.keyCode !=45 && e.keyCode !=46 && e.keyCode!=144 
                && e.keyCode!=145  && (e.keyCode<112 || e.keyCode>123)){
                    if($(this).val().length == 3){
                        $(this).val($(this).val() + ' ');
                    }else if($(this).val().length == 7 && $(this).val()[0] == '+'){
                        $(this).val($(this).val() + ' ');
                    }else if(($(this).val().length > 15  && $(this).val()[0] == '+') || ($(this).val().length > 11 && $(this).val()[0] != '+')){
                        $(this).val($(this).val().slice(0, $(this).val().length-1));
                        self.wiggle();
                        self.errorShow = true;
                        self.errorPos = self.counter;
                        self.errorMessage = "Max characters reached";
                        self.showError(); 
                        setTimeout(function(){
                            self.errorShow = false;
                            self.errorPos = self.counter;
                            self.hideError();
                        }, self.wiggleAutoRemoveDelay);
                    }else if($(this).val()[0] == '+' && !$.isNumeric($(this).val().slice(1, $(this).val().length))){
                        $(this).val($(this).val().slice(0, $(this).val().length-1));
                        self.wiggle();
                        self.errorShow = true;
                        self.errorPos = self.counter;
                        self.errorMessage = "Numbers only please";
                        self.showError(); 
                        setTimeout(function(){
                            self.errorShow = false;
                            self.errorPos = self.counter;
                            self.hideError();
                        }, self.wiggleAutoRemoveDelay);
                    }
                }
                if(e.keyCode == 13){
                    if($(this).val().length == 15 || $(this).val().length == 11 || $(this).val().length == 0){
                        self.moveForward();
                    }else{
                        self.wiggle();
                        self.errorShow = true;
                        self.errorPos = self.counter;
                        self.errorMessage = "Hmm... that phone number isn't valid";
                        self.showError();                    
                    }
                }
            }
            if(!(/\s/g.test($(this).val())) && $(this).val().length == 13){
                $(this).val($(this).val().slice(0, 3) + " " + $(this).val().slice(3, 6) + ' ' + $(this).val().slice(6, $(this).val().length));
            }
            if(!(/\s/g.test($(this).val())) && $(this).val().length == 10){
                $(this).val($(this).val().slice(0, 3) + " " + $(this).val().slice(3, $(this).val().length));
            }
            self.updateProgbar();
        });
        $('.iti__flag-container').click(function(){
            $.fx.off = true;
            $('.iti__arrow--up').removeClass('fa fa-angle-down iti__arrow--up').addClass('fa fa-angle-down');
            $('.form-item').eq(self.counter).find('.form-button').hide();
            $('.form-item').eq(self.counter).find('.form-button-enter').hide();
            $(this).find('.iti__selected-flag').hide();
            $(this).siblings().hide();
            $('.form-item').eq(self.counter).find('.iti__country-list').show().css('opacity', '0%');
            $.fx.off = false;
            $('.form-item').eq(self.counter).find('.iti__country-list').animate({
                'top': '0px',
                'opacity':'100%',
                'border-width': '2px'
            },300, 'swing').css('border-color', self.getColor('--radio-element-border-active-color'));
            self.flag = true;
            self.errorShow = false;
            self.hideError();
            $('.form-item').eq(self.counter).find('.iti__selected-flag').css('border-bottom', self.getColor('--radio-element-border-active-color') + " 2px solid");

        });
        $('.iti__country').click(function(){
            for(i=0;i<self.blinkAmount;i++) {
                $(this).fadeTo(self.blinkSpeed, self.minBlinkOpacity).fadeTo(self.blinkSpeed, self.maxBlinkOpacity);
            }
            $(this).css('border', self.getColor('--radio-element-border-active-color') + ' 2px solid'); 
            setTimeout(function(){
                $('.form-item').eq(self.counter).find('.iti__country-list').animate({
                    'top': '15px',
                    'opacity':'0%',
                    'border-width': '0.5px'
                },300, 'swing');
                $('.form-item').eq(self.counter).find('.form-button').show();
                $('.form-item').eq(self.counter).find('.form-button-enter').show();
                $('.form-item').eq(self.counter).find('.iti__country-list').hide();
                $('.form-item').eq(self.counter).find('.iti__selected-flag').show();
                $('.form-item').eq(self.counter).find('.form-element').show();
                $('.form-item').eq(self.counter).find('.iti__country-list').addClass('iti__hide')
                self.errorShow = false;
                self.hideError();
            }, 1000);
        });
    };
}
$(document).ready(function(){
    typeForm = new Form();
    typeForm.init();
});

