
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
    this.init = function(){
        self.addElements();
        self.bindEvents();
        self.showUp();
        self.checkFooterArrowDisabled();
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
    this.updateProgbar = function(){
        for(i=0; i<$('.form-item').find('input').length; i++){
            if($('.form-item').find('input').eq(i).val()){
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
                if($('.form-item').eq(i).find('.form-input-text, .form-input-dropdown').length){
                    if(!$('.form-item').eq(i).find('.form-input-dropdown').length){
                        $('.form-item').eq(i).find('.form-content').append('<span class="form-button-enter">press <strong>Enter ↵</strong></span>');
                    }else{
                        $('.form-item').eq(i).find('.form-dropdown-flex').append('<div class="form-dropdown-arrow"><i class="dropdown-arrow-element fa fa-thin fa-angle-down"></i></div>');
                    }
                    $('.form-item').eq(i).find('.form-content').css('width', '100%');
                }
                if($('.form-item').eq(i).find('.form-input-scale').length){
                    $('.form-item').eq(i).find('.form-content').css('width', '100%');
                    for(j=0; j<=self.scaleLength; j++){
                        $('.form-item').eq(i).find('.form-input-scale').append('<div class="form-element">'+j+'</div>');
                    }
                }
            }else{
                if($('.form-item').eq(i).find('.form-input-text, .form-input-dropdown').length){
                    $('.form-item').eq(i).find('.form-content').css('width', '100%');
                }
                if($('.form-item').eq(i).find('.form-input-dropdown').length){
                    $('.form-item').eq(i).find('.form-dropdown-flex').append('<div class="form-dropdown-arrow"><i class="dropdown-arrow-element fa fa-thin fa-angle-down"></i></div>');
                }
                if($('.form-item').eq(i).find('.form-input-scale').length){
                    $('.form-item').eq(i).find('.form-content').css('width', '100%');
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
                self.moveForward();
            }
            else if(self.delta<-self.trackPadScrollSensitivity){
                self.moveBackward();
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
            if($(this).parent().find('error')){
                self.hideError();
                self.errorShow = false;
            }
            self.updateProgbar();
        });
        $('.form-input-text .form-element').keyup(function(e){
            self.updateProgbar();
            if($(this).parent().find('error')){
                self.hideError();
                self.errorShow = false;
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
                if($('.form-item').eq(i).find('input').attr('required')){
                    if($('.form-item').eq(i).find('input').val()){
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
                }
                self.dropDownAngleDown($(this));
            }
        });
        $('.form-dropdown-element').click(function(){
            self.dontHideDropDown = true;
            self.dontToggleDropDownArrow = true;
            $(this).parent().parent().find('.form-element').val($(this).text().trim());
            self.errorPos = $(this).parent().parent().parent().prevAll().length;
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
            self.errorPos = $(this).parent().parent().parent().prevAll().length;
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
                        self.dropDownAngleClose($(dropDownElements).parent().parent().find('.form-dropdown-arrow i'));
                    }else{
                        $(dropDownElements).eq(i).find('span').eq(0).html(dropDownEle.find('span').eq(0).html().replace(startBold, '').replace(endBold, ''));
                        $(dropDownElements).eq(i).hide();
                    }
                    self.errorPos = $(this).parent().parent().parent().prevAll().length;
                    self.errorShow = false;
                    self.hideError(false, false);
                }
                if(!$(this).val()){
                    self.errorPos = $(this).parent().parent().parent().prevAll().length;
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
                        self.errorPos = $(this).parent().parent().parent().parent().prevAll('.form-item').length;
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
    };
}
$(document).ready(function(){
    typeForm = new Form();
    typeForm.init();
});

