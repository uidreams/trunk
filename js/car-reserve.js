$(function () {
    var CarReserve = {
        init: function () {
            this.countries_loader = $.getScript("/js/countries.js", function() {
                
             });
            this.initChosenSelectAndDatePicker();
            this.loginContainerSelector = $("#step_0");
            this.createAccountContainerSelector = $("#step_1");
            this.reserveContainerSelector = $("#step_2");
            this.confirmContainerSelector = $("#step_3");
            this.loginFormSelector = $("#js-login-form");
            this.createAccountFormSelector = $("#js-reserve-step-1-form");
            this.reserveFormSelector = $("#js-reserve-step-2-form");
            this.loginLinkSelector = $("#js-login-link");
            this.signUpLinkSelector = $("#js-signup-link");
            this.loginButtonSelector = $("#js-login-btn");
            this.createAccountButtonSelector = $("#js-create-account-btn");
            this.reserveButtonSelector = $("#js-reserve-btn");
            
            this.reserveButtonSelector.prop("disabled",false);

            this.loginContainerSelector.addClass('hidden');
            this.createAccountContainerSelector.addClass('hidden');
            this.reserveContainerSelector.addClass("hidden");
            this.confirmContainerSelector.addClass("hidden");
            this.user = null;
            var _this = this;
            var token = window.localStorage.getItem('access_token');
            
            $('#state_options').hide();
            $('#state_input').hide();

            $('#password').keyup(function(){
                if($(this).val().match(/^(?=.*\d)[a-zA-Z\d]{6,}$/)){
                    $('.absolute-tip').addClass('hidden')
                }else{
                    $('.absolute-tip').removeClass('hidden')
                }
            })    

            var url = this.getEndpoint()+'/user?confirmation-token='+token;
            if(token){
                $.ajax({
                    url: url,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token-byton': token,
                    },
                    type: 'GET',
                    success: function (response) {
                        _this.user = response.user;
                        if(_this.user && _this.user.is_reserved){
                            _this.createAccountContainerSelector.removeClass("hidden");
                            window.localStorage.removeItem('access_token');
                            if (typeof(ga) != "undefined")
                                ga('send','event','reserve','init_and_is_reserved');
                        }
                        else {
                            _this.reserveContainerSelector.removeClass("hidden");
                            if (typeof(ga) != "undefined")
                                ga('send','event', 'reserve', 'init_and_not_reserved');
                        }
                    },
                    error: function (error) {
                        _this.reserveContainerSelector.addClass("hidden"); 
                        _this.loginContainerSelector.removeClass("hidden");
                    }
                });
            }
            else{
                this.createAccountContainerSelector.removeClass('hidden');
            }
            this.bindEvens();
        },

        bindEvens: function () {
            this.loginLinkSelector.on("click", $.proxy(this.onLoginLinkClick, this));
            this.signUpLinkSelector.on("click", $.proxy(this.onSignUpLinkClick, this));
            this.loginButtonSelector.on("click", $.proxy(this.onLoginButtonClick, this));
            this.createAccountButtonSelector.on("click", $.proxy(this.onCreateAccountButtonClick, this));
            this.reserveButtonSelector.on("click", $.proxy(this.onReserveButtonClick, this));
        },

        initChosenSelectAndDatePicker: function () {
            $('.checkbox').iCheck({
                checkboxClass: 'icheckbox_square-grey'
            });

            $('#birthdate').datepicker({
                format: 'mm/dd/yyyy',
                endDate: "-18y",
                startView: 2,
                autoclose: true
            });

            $("#select_country").chosen({
                width: "100%"
            });

            $("#select_country").on("change", $.proxy(this.onCountryChange, this));
        },

        onCountryChange: function (event) {
            $("#country_error").addClass("hidden");
            this.reserveButtonSelector.prop("disabled",false);
            selectedCountry = $(event.currentTarget).children("option").filter(":selected").text();
            $select = $("#select_state");
            $select.html('');
            $('#state_options').hide();
            $('#state_input').hide();
            var found = false;
            // for each selectedCountry 
            $.each(countries, function(key, val){
                if ( val.country == selectedCountry ){    
                    states = val.states;
                    if (states.length > 0){
                        found = true; 
                        $.each(states, function(key, val){
                        $select.append('<option id="' + val + '">' + val + '</option>');
                        });
                    }else{
                        $('#state_selection').hide();
                    }
                }
            });

            if (found === false){
                $('#state_options').hide();
                $('.js-state-input')[0].value = "";
                $('#state_input').show();
            }else{
                $('#state_options').show();
                $('#state_input').hide();
            }
        },

        onLoginLinkClick: function (event) {
            event.preventDefault();
            this.loginContainerSelector.removeClass('hidden');
            this.createAccountContainerSelector.addClass("hidden");
            this.reserveContainerSelector.addClass("hidden");
        },

        onSignUpLinkClick: function (event) {
            event.preventDefault();
            this.loginContainerSelector.addClass('hidden');
            this.createAccountContainerSelector.removeClass("hidden");
        },

        onLoginButtonClick: function (event) {
            event.preventDefault();
            this.loginButtonSelector.prop('disabled', true);
            this.loginFormSelector.validate({
                rules: {
                    email: "required",
                    password: "required"
                }
            });

            if(this.loginFormSelector.valid()){
                var _this = this;
                var form = this.loginFormSelector[0];
                var body = {
                    'email': form.email.value,
                    'password': form.password.value                    
                };

                

                $.ajax({
                    url: this.getEndpoint()+'/user/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: 'POST',
                    data: JSON.stringify(body),
                    success: function (response) {
                        //debugger;
                        _this.user = response.user;
                        window.localStorage.setItem('access_token', response.token);
                        _this.loginContainerSelector.addClass('hidden');
                        _this.reserveContainerSelector.removeClass("hidden");
                        if (typeof(ga) != "undefined")
                            ga('send','event', 'reserve', 'login');
                        if(_this.user.is_reserved){
                            _this.reserveContainerSelector.find(".form").addClass("hidden");
                            _this.reserveContainerSelector.find(".validate").removeClass("hidden");
                            if (typeof(ga) != "undefined")
                                ga('send','event', 'reserve', 'login_and_reserved');
                        }

                        form.reset();
                    },
                    error: function (error) {
                        var errors = error.responseJSON.errors;
                        if(errors[0] === "Error: Authorization data is not correct"){
                            _this.loginContainerSelector.find(".validate").removeClass("hidden");
                        }
                        else{
                            _this.loginContainerSelector.find(".validate").text(errors[0]);
                            _this.loginContainerSelector.find(".validate").removeClass("hidden");
                        }
                        _this.loginButtonSelector.prop('disabled', false);
                    }
                });
            }
            else{
                this.loginButtonSelector.prop('disabled', false);
            }
        },
        onCreateAccountButtonClick: function (event) {
            event.preventDefault();
            this.createAccountButtonSelector.prop('disabled', true);
            this.createAccountFormSelector.validate({
                rules: {
                    firstname: "required",
                    lastname: "required",
                    email: "required",
                    password: {
                        required: true,
                        minlength: 6
                    },
                    confirm_password: {
                        required: true,
                        equalTo: "#password",
                        minlength: 6
                    },
                    terms: "required"
                }
            });

            if(this.createAccountFormSelector.valid()){
                var _this = this;
                var form = this.createAccountFormSelector[0];
                $(this.createAccountFormSelector).find('.absolute-tip').removeClass("error");
                if(!this.checkStrength(form.password.value)){
                    $(this.createAccountFormSelector).find('.absolute-tip').removeClass("hidden");
                    $(this.createAccountFormSelector).find('.absolute-tip').addClass("error");
                    this.createAccountButtonSelector.prop('disabled', false);
                    return false;
                }

                var body = {
                    'email': form.email.value,
                    'password': form.password.value,
                    'city': '',
                    'country': '',
                    'state': '',
                    'date_of_birth': '',
                    'first_name': form.firstname.value,
                    'last_name': form.lastname.value,
                    'phone': '',
                    'source': 'web',
                    'lang': this.getLang()
                };

                var token = window.localStorage.getItem('access_token');
                var url = this.getEndpoint()+'/user?token='+token;
                $.ajax({
                    url: url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    type: 'POST',
                    data: JSON.stringify(body),
                    success: function (response) {
                        _this.user = response.user;
                        window.localStorage.setItem('access_token', response.token);

                        _this.createAccountContainerSelector.addClass("hidden");
                        _this.reserveContainerSelector.removeClass("hidden");
                        form.reset();
                        if (typeof(ga) != "undefined")
                            ga('send','event', 'reserve', 'account_created');
                    },
                    error: function (error) {
                        var errors = error.responseJSON.errors;
                        if(errors[0] === "Error: Provided email address is already taken."){
                            _this.createAccountContainerSelector.find(".validate").removeClass("hidden");
                        }
                        else{
                            _this.createAccountContainerSelector.find(".validate").text(errors[0]);
                            _this.createAccountContainerSelector.find(".validate").removeClass("hidden");
                        }
                        _this.createAccountButtonSelector.prop('disabled', false);
                        if (typeof(ga) != "undefined")
                            ga('send','event', 'reserve', 'account_creation_failed');
                    }
                });
            }
            else{
                this.createAccountButtonSelector.prop('disabled', false);
            }
        },

        onReserveButtonClick: function (event) {
            event.preventDefault();
            this.reserveButtonSelector.prop('disabled', true);
            if (typeof(ga) != "undefined")
                ga('send','event', 'reserve', 'reserve_button_clicked');
            
            if(this.user && this.user.is_reserved){
                window.localStorage.removeItem('access_token');
                this.createAccountContainerSelector.find(".validate").removeClass("hidden");
                if (typeof(ga) != "undefined")
                    ga('send','event', 'reserve', 'reserve_button_clicked_but_already_reserved');
                return;
            }

            var _this = this;
            var form = this.reserveFormSelector[0];
            if(form.country.value.length>0){
                
                var body = {
                    'city': form.city.value,
                    'country': form.country.value,
                    'state': form.state_options.value ? form.state_options.value : form.state.value,
                    'first_name': this.user.first_name,
                    'last_name': this.user.last_name,
                    'phone': form.phone.value,
                    'reserve': true,
                    'file': '',
                    'source':'web',
                    'lang': this.getLang()
                };

                if ( form.birthdate.value !== "" ){
                    body.date_of_birth = form.birthdate.value; 
                }

                var token = window.localStorage.getItem('access_token');
                var url = this.getEndpoint()+'/user?token='+token;
                $.ajax({
                    url: url,                    
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token-byton': window.localStorage.getItem('access_token'),
                    },
                    type: 'PUT',
                    data: JSON.stringify(body),
                    success: function (response) {
                        _this.confirmContainerSelector.find(".reservation-id").text(response.user.reservation_id);
                        _this.confirmContainerSelector.find(".span-reservation-id").text(response.user.reservation_id);
                        _this.confirmContainerSelector.find(".first-name").text(response.user.first_name);
                        _this.confirmContainerSelector.find(".last-name").text(response.user.last_name);
                        _this.reserveContainerSelector.addClass("hidden");
                        _this.confirmContainerSelector.removeClass("hidden");
                        window.localStorage.removeItem('access_token');
                        if (typeof(ga) != "undefined")
                            ga('send','event', 'reserve', 'reserve_success');
                    },
                    error: function (error) {
                        _this.reserveContainerSelector.find(".form").addClass("hidden");
                        _this.reserveContainerSelector.find(".validate").removeClass("hidden");
                        _this.reserveButtonSelector.prop('disabled', false);
                        if (typeof(ga) != "undefined")
                            ga('send','event', 'reserve', 'reserve_failure');
                    }
                });
            }
            else{
                $("#country_error").removeClass("hidden");
                this.reserveButtonSelector.prop('disabled', false);
            }
        },

        checkStrength: function(password){
            var strength = 0;
            /* if password contains a number */
            if (password.match(/([0-9])/)) {
                strength += 1;
            }

            if (strength >= 1) {
                return true;
            }
            return false;
        },

        getLang: function(){
            // default to en for the email
            var lang = "en";
            // check if we are on the cn server.. default is then zh
            if ( location.hostname.indexOf(".cn") !== -1  ){
                // unless the are in the /en/ lang
                if (location.pathname.indexOf("/en/") !== -1 ){
                    lang = "en";
                }else{
                    lang = "zh";
                }
            // check if they are on the US server.. default is then en
            }else if ( location.hostname.indexOf(".com") !== -1  ){
                // unless they are on the cn lang
                if (location.pathname.indexOf("/cn/") !== -1 ){
                    lang = "zh";
                }else{
                    lang = "en";
                }
            }
            return lang;
        },

        getEndpoint: function(){
            // returns current api endpoint depending on server and staging p
            var subdomain = location.hostname.indexOf("staging.") !== -1 ? "http://api.staging" : "https://api";  
            var domain = location.hostname.indexOf(".cn") !== -1 ? ".byton.cn" : ".byton.com";            
            var endpoint = subdomain + domain;
            return endpoint;
        }
    };

    CarReserve.init();
});
