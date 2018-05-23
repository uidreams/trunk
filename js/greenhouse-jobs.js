$(window).on('load', function () { // makes sure the whole site is loaded
    $.ajax({
        type: "GET",
        url: "/greenhouse/jobs.php",
        success: function (response) {
            //debugger;
            var data = JSON.parse(response);
            var allJobs = JSON.parse(data.jobs);
            var type = [];
            $.each(allJobs.jobs, function (i, field) {
                var hidden = 'show';
                if (i > 19)
                    hidden = 'hidden';

                $("#jobs-json").append("<div class='row " + hidden + "' data-filter-item data-division='" + field.departments[0].name + "' data-type='" + field.metadata[0]['value'] + "' data-location='" + field.offices[0].name.trim() + "'>\n" +
                    "               <a href=\"job-description.html?id=" + field.id + "\">\n" +
                    "                    <div class=\"container\">\n" +
                    "                        <span class=\"col-md-6 col-sm-6 col-xs-12\">" + field.title + "</span>\n" +
                    "                        <span class=\"col-md-2 col-sm-2 light-font division\">" + field.departments[0].name + "</span>\n" +
                    "                        <span class=\"col-md-2 col-sm-2 light-font\">" + field.metadata[0]['value'] + "</span>\n" +
                    "                        <span class=\"col-md-2 col-sm-2 col-xs-12 text-uppercase\">" + field.offices[0].name.trim() + "</span>\n" +
                    "                    </div>\n" +
                    "                </a>\n" +
                    "            </div>");
                $(".js-open-jobs").text(allJobs.meta.total);
                var total = allJobs.meta.total;
                if(total < 19){
                    // nothing happens here
                    $('.more-jobs').css({
                        'visibility': 'hidden'
                    });
                } else {
                    $('.more-jobs').css({
                        'visibility': 'visible'
                    });
                }
                if(field.metadata[0]['value']){
                    type.push(field.metadata[0]['value'])
                }
            });

            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            var allTypes = type.filter(onlyUnique);
            var allDivison = JSON.parse(data.division);
            var $division = $('#division');
            $division.html('');
            $division.append('<option name="all">All Divisions</option>');
            $.each(allDivison.departments, function (index, value) {
                if (value.id !== 0) {
                    $division.append('<option name="' + value.name + '">' + value.name + '</option>');
                }else{

                }
            });

            var alllocation = JSON.parse(data.offices);
            var $location = $('#location');
            $location.html('');
            $location.append('<option name="all">All Locations</option>');
            $.each(alllocation.offices, function (index, value) {
                if (value.id !== 0) {
                    // jobs are filtered by city name
                    $location.append('<option name="' + value.name.trim() + '">' + value.name.trim() + '</option>');
                }
            });

            var $type = $('#type');
            $type.html('');
            $type.append('<option name="all">All Types</option>');
            $.each(allTypes, function (index, value) {
                $type.append('<option name="' + value + '">' + value + '</option>');
            });
            $('.selectpicker').selectpicker('refresh');
            updateJobDisplayItems();
        },
        error: function (error) {
            debugger;
        }
    });

    $('.more-jobs').on('click', function (event) {
        event.preventDefault();
        $("#jobs-json .row").removeClass('hidden');
        $('.more-jobs').css({
            'visibility': 'hidden'
        });
    });
    var filters = {
        division : 'all',
        location  : 'all',
        type : 'all'
    };

    $("#division").change(function () {
        var selectValue = this.value !== "All Divisions" ? this.value : 'all';
        filters.division = selectValue;
        if (typeof(ga) != "undefined")
            ga('send', 'event', 'dropdown-job', selectValue);
        updateJobDisplayItems();
        toggleJobForm();
    });


    $("#location").change(function () {
        var value = $('#location').val();
        var selectValue = this.value !== "All Locations" ? this.value : 'all';
        filters.location = selectValue;
        if (typeof(ga) != "undefined")
            ga('send', 'event', 'dropdown-location', selectValue);
        updateJobDisplayItems();
        toggleJobForm();
    });

    $("#type").change(function () {
        var selectValue = this.value !== "All Types" ? this.value : 'all';
        filters.type = selectValue;
        if (typeof(ga) != "undefined")
            ga('send', 'event', 'dropdown-type', selectValue);
        updateJobDisplayItems();
        toggleJobForm();
    });

    function updateJobDisplayItems(){
        var filterItems = $('[data-filter-item]');
        filterItems.addClass('hidden');
        var filterItemlist = filterItems;
        for(var filter in filters){
            filterItemlist = filterItemlist.filter(function(index){
                return filters[filter] == 'all' ? true : $(this).data(filter) == filters[filter];
            })
        }
        filterItemlist.removeClass('hidden');
    }

    function toggleJobForm() {
        var jobs = $("#jobs-json > div:not(.hidden)").length;
        $(".js-open-jobs").text(jobs);

        if ($("#jobs-json > div:not(.hidden)").length === 0) {
            $(".jobs").hide();
            $(".no-jobs").show();
        }
        else {
            $(".jobs").show();
            $(".no-jobs").hide();
        }
    }
});