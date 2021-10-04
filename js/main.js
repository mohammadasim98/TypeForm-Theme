
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
    }
    this.moveBackward = function(){
        if(self.counter != 0){
            self.hideDown(self.counter);
            self.counter -= 1;
            self.showDown(self.counter);
        }
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
            $('.footer-arrow-up').css('color', getComputedStyle(document.documentElement).getPropertyValue('--form-button-arrow-disabled-color'));
            $('.footer-arrow-up').css('cursor', 'auto');
            $('.footer-arrow-down').css('color', getComputedStyle(document.documentElement).getPropertyValue('--form-button-text-color'));
            $('.footer-arrow-down').css('cursor', 'pointer');
        }else if(self.counter == self.maxCount-1){
            $('.footer-arrow-down').css('color', getComputedStyle(document.documentElement).getPropertyValue('--form-button-arrow-disabled-color'));
            $('.footer-arrow-down').css('cursor', 'auto');
            $('.footer-arrow-up').css('color', getComputedStyle(document.documentElement).getPropertyValue('--form-button-text-color'));
            $('.footer-arrow-up').css('cursor', 'pointer');
        }else{
            $('.footer-arrow-down').css('color', getComputedStyle(document.documentElement).getPropertyValue('--form-button-text-color'));
            $('.footer-arrow-up').css('color', getComputedStyle(document.documentElement).getPropertyValue('--form-button-text-color'));
            $('.footer-arrow-up').css('cursor', 'pointer');
            $('.footer-arrow-down').css('cursor', 'pointer');
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
            for(j=0; j<$('.form-item').eq(i).find('.form-input-radio .form-element').length
            ; j++){
                $('.form-item').eq(i).find('.form-input-radio .form-element').eq(j).append('<span class="form-element-tick"><i class="fa fa-check" aria-hidden="true"></i></span>');
                $('<div class="form-element-label">'+String.fromCharCode('a'.charCodeAt(0)+j).toUpperCase()+'</div>').insertBefore($('.form-item').eq(i).find('.form-element-text').eq(j));
            }
            if(i<self.maxCount-1){
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button">OK <i class="fa fa-light fa-check"></i></span>');
                if($('.form-item').eq(i).find('.form-input-text').length){
                    $('.form-item').eq(i).find('.form-content').append('<span class="form-button-enter">press <strong>Enter ↵</strong></span>');
                    $('.form-item').eq(i).find('.form-content').css('width', '100%');
                }
            }else{
                $('.form-item').eq(i).find('.form-content').css('width', '100%');
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button form-submit">Submit</i> </span>');
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button-enter">press <strong>Ctrl + Enter ↵</strong></span>');

            }
            $('.form-item').eq(i).find('.form-content').append('<div class="error"><i class="fa-solid fa-triangle-exclamation"></i> Please fill this in</div>');
            $('.error').eq(i).hide();   
        }
        $('.form-element-tick').css('visibility', 'hidden');
    };
    this.showError = function(){
        if(self.errorShow){
            $('.form-item').eq(self.errorPos).find('.form-button').hide();
            $('.form-item').eq(self.errorPos).find('.form-button-enter').hide();
            $('.form-item').eq(self.errorPos).find('.error').show();
        }
    };
    this.hideError = function(){
        self.desiredPos = self.counter + 1;
        $('.form-item').eq(self.counter).find('.error').hide();
        $('.form-item').eq(self.counter).find('.form-button').show();
        $('.form-item').eq(self.counter).find('.form-button-enter').show();
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
            self.checkFooterArrowDisabled();
        });
        $('.footer-arrow-down').click(function(e){
            self.moveForward();
            e.preventDefault();
            self.checkFooterArrowDisabled();
        });
        $(window).on('wheel', function(e) {
            self.delta = e.originalEvent.deltaY;
            console.log(self.delta);
            if (self.delta>self.trackPadScrollSensitivity){
                self.moveForward();
            }
            else if(self.delta<-self.trackPadScrollSensitivity){
                self.moveBackward();
            }
            self.updateProgbar();
        });
        $(document).click(function(){
            self.updateProgbar();
        });
        $('.form-input-radio .form-element').click(function(){
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
                $(this).find('.form-element-label, .form-element-key').css('background-color', getComputedStyle(document.documentElement).getPropertyValue('--radio-element-key-label-bg-active-color'));
                $(this).find('.form-element-label, .form-element-key').css('color', getComputedStyle(document.documentElement).getPropertyValue('--bg-color'));
                $(this).find('.form-element-label, .form-element-key').css('border-color', getComputedStyle(document.documentElement).getPropertyValue('--radio-element-key-label-border-active-color'));
                for(i=0;i<self.blinkAmount;i++) {
                    $(this).fadeTo(self.blinkSpeed, self.minBlinkOpacity).fadeTo(self.blinkSpeed, self.maxBlinkOpacity);
                }
                $(this).css('border', getComputedStyle(document.documentElement).getPropertyValue('--radio-element-border-active-color') + ' 2px solid');    
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
                        self.showError();
                    }
                }
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
            if(!$(this).parent().next().find('i').hasClass('fa-regular') || $(this).hasClass('fa-regular')){
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
                    self.checkFooterArrowDisabled();
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
                self.hideError();
                self.errorShow = false;
            }
            self.updateProgbar();
        });
    };
}
$(document).ready(function(){
    typeForm = new Form();
    typeForm.init();
});

